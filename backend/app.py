import gradio as gr
from server import app as fastapi_app

# Membuat UI Gradio kosong (hanya sebagai "cangkang" untuk mengelabui Hugging Face)
demo = gr.Interface(
    fn=lambda: "Regalia WA Agent Backend is Running 24/7!",
    inputs=None,
    outputs="text",
    title="Regalia API Server"
)

# Menggabungkan FastAPI kita ke dalam Gradio
app = gr.mount_gradio_app(fastapi_app, demo, path="/")
