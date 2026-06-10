#the entry point - initializes fastapi and includes routers
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, execute

app = FastAPI(title="OopsEngine API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://oopsengine.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#attach auth router
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(execute.router, prefix="/api/execute", tags=["Execution Engine"])

@app.get("/")
async def root():
    return {"status": "OopsEngine Backend is Running!!"}