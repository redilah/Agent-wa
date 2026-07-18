import os
import sys
from dotenv import load_dotenv
from huggingface_hub import HfApi, create_repo

# Load env
load_dotenv()
token = os.environ.get("HF_TOKEN")
if not token:
    print("HF_TOKEN not found in .env")
    sys.exit(1)

api = HfApi(token=token)
user_info = api.whoami()
username = user_info['name']
repo_id = f"{username}/regalia-wa-backend"

print(f"Logged in as: {username}")
print(f"Target Repo: {repo_id}")

try:
    print("Creating Space on Hugging Face...")
    api.create_repo(
        repo_id=repo_id,
        repo_type="space",
        space_sdk="gradio",
        private=False,
        exist_ok=True
    )
    print("Space created or already exists.")
except Exception as e:
    print(f"Error creating space: {e}")

print("Setting Secrets...")
secrets = {
    "GEMINI_API_KEY": os.environ.get("GEMINI_API_KEY", ""),
    "WA_VERIFY_TOKEN": os.environ.get("WA_VERIFY_TOKEN", ""),
    "SUPABASE_URL": os.environ.get("SUPABASE_URL", ""),
    "SUPABASE_KEY": os.environ.get("SUPABASE_KEY", "")
}
for key, value in secrets.items():
    if value:
        try:
            api.add_space_secret(repo_id=repo_id, key=key, value=value)
        except Exception as e:
            print(f"Could not set {key}: {e}")

print("Uploading files to Space...")
try:
    api.upload_folder(
        folder_path=".",
        repo_id=repo_id,
        repo_type="space",
        ignore_patterns=[".env", "__pycache__", "*.pyc", "deploy_to_hf.py", ".git", ".dockerignore", "Dockerfile"]
    )
    print("=========================================")
    print("DEPLOYMENT SUCCESSFUL!")
    print(f"Your backend is live at: https://huggingface.co/spaces/{repo_id}")
    print("=========================================")
except Exception as e:
    print(f"Error uploading files: {e}")
