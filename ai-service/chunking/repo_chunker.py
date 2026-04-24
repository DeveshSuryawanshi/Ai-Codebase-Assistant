from chunking.files_reader import load_code_files
from chunking.chunking_helpers import chunk_python_file, chunk_other_file

def chunk_repo(repo_path: str):
    files = load_code_files(repo_path)
    all_chunks = []

    for file in files:
        if file.endswith('.py'):
            all_chunks.extend(chunk_python_file(file))
        else:
            all_chunks.extend(chunk_other_file(file))

    return all_chunks