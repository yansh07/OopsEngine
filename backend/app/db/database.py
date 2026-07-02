#Postgres connection pooling setup

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@db:5432/oopsengine"

engine = create_async_engine(
    DATABASE_URL, 
    echo=False,
    pool_size=20, #20 concurrent user handle karne ke liye
    max_overflow=20, #peak load par extra 20 connection allow karne ke liye
    pool_timeout=10, #agar line lagna pade toh max 10s wait karega, 30s nahi
    pool_recycle=1800 #30min mein stable connection reset karega
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False
)

class Base(DeclarativeBase):
    pass

SYNC_DATABASE_URL = "postgresql://postgres:postgres@db:5432/oopsengine"
sync_engine = create_engine(SYNC_DATABASE_URL, pool_pre_ping=True)

#only for celery
SyncSessionLocal = sessionmaker(
    bind=sync_engine,
    autoflush=False,
    autocommit=False,
)