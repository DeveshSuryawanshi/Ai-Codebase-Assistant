import faiss
import pickle

def save_faiss(index, metadata_list):
    faiss.write_index(index, "faiss_index.bin")

    with open("metadata.pkl", "wb") as f:
        pickle.dump(metadata_list, f)