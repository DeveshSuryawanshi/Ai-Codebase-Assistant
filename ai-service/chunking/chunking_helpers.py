import ast
from langchain_text_splitters import RecursiveCharacterTextSplitter

# This function only chunks Python files by extracting functions and classes using the AST module.
def chunk_python_file(file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        source = f.read()

    tree = ast.parse(source)
    chunks = []

    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            start_line = node.lineno
            end_line = node.end_lineno

            chunk = "\n".join(source.splitlines()[start_line-1:end_line])

            chunks.append({
                "content": chunk,
                "file_path": file_path,
                "type": type(node).__name__,
                "name": node.name
            })

    return chunks

# This function chunks other types of files (like .txt, .md, etc.) using a simple character-based splitter.
def chunk_other_file(file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )

    docs = splitter.split_text(text)

    return [
        {
            "content": d,
            "file_path": file_path,
            "type": "text"
        }
        for d in docs
    ]