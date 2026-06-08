import asyncio
from app.db.database import engine, Base
from app.db import models

async def init_models():
    async with engine.begin() as conn:
        #jab dev and testing ke time table reset karni ho sirf tabhi uncomment karni
        # await conn.run_sync(Base.metadata.drop_all)
        print("Creating tables in db...")
        await conn.run_sync(Base.metadata.create_all)
        print("Table created successfully!!")

if __name__ == "__main__":
     asyncio.run(init_models())