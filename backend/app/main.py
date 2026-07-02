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


#dummy api for p95----------------------------------------------------------

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
# Apne folders ke naam ke hisab se niche wale imports sahi kar lena:
from .db.database import AsyncSessionLocal  # Aapki db file se sessionmaker
from .db import Users  # Aapka User table model jiski file se bhi aata ho

# Ek async database session generator dependency
async def get_async_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/test-load-db")
async def test_load_db(db: AsyncSession = Depends(get_async_db)):
    try:
        from sqlalchemy import select
        # Async way me Postgres se top 10 users fetch karna
        result = await db.execute(select(Users).limit(10))
        users = result.scalars().all()
        return {"status": "success", "count": len(users)}
    except Exception as e:
        return {"status": "error", "message": str(e)}
