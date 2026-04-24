import os
from git import Repo, InvalidGitRepositoryError

local_path = "./local_clone"

def read_repo(repo_url):
    # If folder exists and is a valid git repo → reuse
    if os.path.exists(local_path):
        try:
            repo = Repo(local_path)
            print("Repo already exists. Pulling latest changes...")
            repo.remotes.origin.pull()
            return repo
        except InvalidGitRepositoryError:
            # Folder exists but not a git repo → delete and re-clone
            print("Folder exists but not a git repo. Re-cloning...")
            import shutil
            shutil.rmtree(local_path)

    # Clone if not exists
    print("Cloning fresh repo...")
    repo = Repo.clone_from(repo_url, local_path)
    return repo