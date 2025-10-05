import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles


import os

app = FastAPI()
REACT_BUILD_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__),"..",  "dist"))
app.mount("/assets", StaticFiles(directory=os.path.join(REACT_BUILD_DIR, "assets")), name="assets")

@app.get("/")
async def serve_home():
    return FileResponse(os.path.join(REACT_BUILD_DIR, "index.html"))

@app.get("/{full_path:path}")
async def get_react_page(full_path: str):
    return FileResponse(os.path.join(REACT_BUILD_DIR, "index.html"))



