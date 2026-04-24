from langchain_google_genai import GoogleGenerativeAIEmbeddings
from embeddings.pinecone.pinecone_setup import get_pinecone_index

def upsert_chunks(chunks):
    embedder = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001"
    )

    index = get_pinecone_index()

    for i, chunk in enumerate(chunks):
        try:
            text = chunk["content"]
            vector = embedder.embed_documents([text])[0]

            index.upsert([
                {
                    "id": f"{chunk['file_path']}_{i}",
                    "values": vector,
                    "metadata": {
                        "file_path": chunk["file_path"],
                        "content": text
                    }
                }
            ])

            print(f"!!!! Stored chunk {i} in Pinecone !!!")

        except Exception as e:
            print(f"Failed at chunk {i}: {e}")
            break


def search_pinecone(question, top_k=5):
    embedder = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001"
    )
    index = get_pinecone_index()

    query_vector = embedder.embed_query(question)

    results = index.query(
        vector=query_vector,
        top_k=top_k,
        include_metadata=True
    )

    chunks = [match["metadata"] for match in results["matches"]]
    return chunks