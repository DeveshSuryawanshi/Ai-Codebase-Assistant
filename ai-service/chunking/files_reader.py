import os

def load_code_files(repo_path: str):
    code_files = []
    files_to_read = ['.py', '.js', '.java', '.cpp', '.c', '.cs', '.rb', '.go', '.ts']

    for root, _, files in os.walk(repo_path):
        for file in files:
            if file.endswith(tuple(files_to_read)):
                code_files.append(os.path.join(root, file))

    return code_files