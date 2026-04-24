import os
import numpy as np
import faiss
import pickle
from langchain_google_genai import GoogleGenerativeAIEmbeddings


def incremental_embed(chunks):
    embedder = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001"
    )
    index, metadata_list = load_or_create_faiss()
    start = get_last_processed()

    for i in range(start, len(chunks)):
        chunk = chunks[i]
        text = chunk["content"]
        print("Chars:", len(text))
        # print("Preview:", text[:200])
        try:
            vector = embedder.embed_documents(chunk["content"])
            vector_np = np.array([vector]).astype("float32")

            index.add(vector_np)
            metadata_list.append(chunk)

            save_progress(index, metadata_list)
            save_last_processed(i + 1)

            print(f"Saved chunk {i}")

        except Exception as e:
            print(f"Stopped at {i} due to: {e}")
            break


def load_or_create_faiss(dim=768):
    if os.path.exists("faiss_index.bin"):
        index = faiss.read_index("faiss_index.bin")
        with open("metadata.pkl", "rb") as f:
            metadata_list = pickle.load(f)
    else:
        index = faiss.IndexFlatL2(dim)
        metadata_list = []

    return index, metadata_list


def save_progress(index, metadata_list):
    faiss.write_index(index, "faiss_index.bin")
    with open("metadata.pkl", "wb") as f:
        pickle.dump(metadata_list, f)

def get_last_processed():
    if os.path.exists("progress.txt"):
        with open("progress.txt", "r") as f:
            return int(f.read())
    return 0

def save_last_processed(i):
    with open("progress.txt", "w") as f:
        f.write(str(i))