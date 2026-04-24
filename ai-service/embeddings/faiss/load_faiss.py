import os
import faiss
import pickle

index = None
metadata_list = None

def load_faiss_if_exists():
    global index, metadata_list

    if os.path.exists("faiss_index.bin") and os.path.exists("metadata.pkl"):
        index = faiss.read_index("faiss_index.bin")

        with open("metadata.pkl", "rb") as f:
            metadata_list = pickle.load(f)

        print("FAISS index loaded")
    else:
        print("No FAISS index found. Please call /api/read-repo first.")