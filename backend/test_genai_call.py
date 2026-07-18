import os
from dotenv import load_dotenv
load_dotenv()

from google import genai
from google.genai import types

_api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY", "")
client = genai.Client(api_key=_api_key)

MODEL_ID = "gemini-2.5-flash"

contents = [
    types.Content(
        role="user",
        parts=[types.Part.from_text(text="Halo")]
    )
]

config_args = {
    "system_instruction": "Kamu adalah AI.",
    "temperature": 0.7,
    "max_output_tokens": 500,
}

try:
    response = client.models.generate_content(
        model=MODEL_ID,
        contents=contents,
        config=types.GenerateContentConfig(**config_args),
    )
    print("SUCCESS")
    print(response.text)
except Exception as e:
    import traceback
    print("ERROR:")
    traceback.print_exc()
