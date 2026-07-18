from fastapi.testclient import TestClient
from server import app
import os

client = TestClient(app)
response = client.get("/webhook?hub.mode=subscribe&hub.challenge=1158201444&hub.verify_token=regalia_verify_2026")
print(response.status_code)
print(response.text)
