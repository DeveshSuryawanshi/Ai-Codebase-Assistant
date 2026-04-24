from multiprocessing.connection import Client

from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.responses import FileResponse
from repo_reader import read_repo
from fastapi import Request
from chunking.repo_chunker import chunk_repo
from embeddings.faiss.embed_chunks import incremental_embed
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from embeddings.faiss.load_faiss import load_faiss_if_exists, index, metadata_list
from embeddings.pinecone.vector_store import upsert_chunks, search_pinecone
import numpy as np

load_dotenv()
app = FastAPI()

@app.get("/")
def read_root():
    return FileResponse("index.html", media_type="text/html")

@app.post("/api/read-repo")
async def read_repository(request: Request):
    try:
        body = await request.json()
        repo_url = body.get("repo_url")
        if not repo_url:
            raise ValueError("Missing repo_url in request body")
        
        # Clone repo
        load_repo = read_repo(repo_url)
        
        # Chunk repo
        chunks = chunk_repo("./local_clone")

        # # Embed chunks and store in FAISS
        # embeddings = embed_chunks(chunks)

        # # Store FAISS
        # index = store_in_faiss(embeddings)

        #  SAVE TO DISK 
        # save_faiss(index, embeddings)

        incremental_embed(chunks)

        return {
            "message": "Repository read successfully",
            "repo_path": load_repo.working_tree_dir
        }
    except Exception as e:
        print(f"Error reading repository: {e}")
        return {"message": "Error reading repository"}


@app.get("/api/ask-question")
async def ask_question(request: Request):
    try:
        body = await request.json()
        question = body.get("question")
        if not question:
            raise ValueError("Missing question in request body")
        
        # Load FAISS index and metadata
        if index is None or metadata_list is None:
            load_faiss_if_exists()
            if index is None or metadata_list is None:
                return {"error": "Index not built yet. Call /api/read-repo first."}

        # Embed the query
        gemini_embeddings = GoogleGenerativeAIEmbeddings(
            model="models/gemini-embedding-001"
        )
        query_vector = gemini_embeddings.embed_query(question)
        query_np = np.array([query_vector]).astype("float32")

        # Search in FAISS
        distances, indices = index.search(query_np, k=5)

        top_chunks = []
        for idx in indices[0]:
            top_chunks.append(metadata_list[idx])

        # Build context from chunks
        context = "\n\n".join(
            [
                f"File: {chunk['metadata']['file_path']}\n"
                f"{chunk['metadata']['content']}"
                for chunk in top_chunks
            ]
        )

        # Ask Gemini LLM using context
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-pro"
        )

        prompt = f"""
        You are an AI codebase assistant.
        
        Answer the user's question ONLY using the provided code context.
        
        If the answer is not in the context, say "Not found in codebase".
        
        Code Context: {context}
        
        Question: {question}
        """

        response = llm.invoke(prompt)

        # Return final answer
        return {
            "question": question,
            "answer": response.content,
            "sources": [
                chunk["metadata"]["file_path"]
                for chunk in top_chunks
            ]
        }

    except Exception as e:
        print(f"Error processing question: {e}")
        return {"message": "Error processing question"}

    
@app.post('/api/index-repo')
async def read_and_embed(request: Request):
    try:
        body = await request.json()
        repo_url = body.get("repo_url")
        if not repo_url:
            raise ValueError("Missing repo_url in request body")

        # Clone repo
        load_repo = read_repo(repo_url)

        # Chunk repo
        chunks = chunk_repo("./local_clone")

        # Embed chunks and store in Pinecone
        upsert_chunks(chunks)

        return {
            "message": "Repository read and embedded successfully",
            "repo_path": load_repo.working_tree_dir
        }
    except Exception as e:
        print(f"Error reading and embedding repository: {e}")
        return {"message": "Error reading and embedding repository"}


@app.post("/api/v2/ask-question")
async def ask_question(request: Request):
    try:
        body = await request.json()
        question = body.get("question")
        if not question:
            raise ValueError("Missing question in request body")

        # 1) Search relevant chunks from Pinecone
        top_chunks = search_pinecone(question, top_k=5)

        if not top_chunks:
            return {"answer": "No relevant context found in index."}

        # 2) Build context from returned metadata
        context = "\n\n".join(
            [
                f"File: {chunk['file_path']}\n{chunk['content']}"
                for chunk in top_chunks
            ]
        )

        print(f"Context for question:\n{context}")

        # 3) Ask Gemini with context
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash-lite"
        )

        prompt = f"""
        You are an AI codebase assistant.
        
        Answer the user's question ONLY using the provided code context.
        If the answer is not in the context, say "Not found in codebase".
        
        Code Context:
        {context}
        
        Question: {question}
        """

        response = llm.invoke(prompt)

        # 4) Return response
        return {
            "question": question,
            "answer": response.content,
            "sources": list({chunk["file_path"] for chunk in top_chunks})
        }

    except Exception as e:
        print(f"Error processing question: {e}")
        return {"message": "Error processing question"}


@app.get("/api/get-gemini-models")
def get_gemini_models():
    try:
        llm = ChatGoogleGenerativeAI()
        models = llm.list_models()
        return {"models": models}
    except Exception as e:
        print(f"Error fetching Gemini models: {e}")
        return {"message": "Error fetching Gemini models"}

@app.get("/api/test")
def chunking_test():
    try:
        data = chunk_repo('./local_clone')
        with open("chunking_test_output.txt", "x") as file:
            file.write(str(data))
        return {"message": "Chunking test completed", "chunks_count": len(data)}
    except Exception as e:
        print(f"Error during chunking test: {e}")
        return {"message": "Error during chunking test"}