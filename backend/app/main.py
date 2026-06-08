#the entry point - initializes fastapi and includes routers
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth

app = FastAPI(title="OopsEngine API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#attach auth router
app.include_router(auth.router, prefix="/api/auth", tags=["Authenticated"])

@app.get("/")
async def root():
    return {"status": "OopsEngine Backend is Running!!"}