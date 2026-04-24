import faiss
import numpy as np

def store_in_faiss(embeddings):
    dim = len(embeddings[0]["embedding"])
    index = faiss.IndexFlatL2(dim)

    vectors = np.array([e["embedding"] for e in embeddings]).astype("float32")
    index.add(vectors)

    return index