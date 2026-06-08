# endpoints to handle/verify clerk/github tokens
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.database import AsyncSessionLocal
from app.db.models import Users
from app.schemas.user import UserSyncRequest, UserResponse

router = APIRouter()

#dependency = har api request ke liye naya db session banana and close karna
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.post("/sync", response_model=UserResponse)
async def sync_user(user_in: UserSyncRequest, db: AsyncSession = Depends(get_db)):
    #check if user already exist based on clerk id
    query = select(Users).where(Users.auth_provider_id == user_in.auth_provider_id)
    result = await db.execute(query)
    existing_user = result.scalars().first()

    #If exist, return their data
    if existing_user:
        return existing_user
    
    #if new user, insert into postgres
    new_user = Users(
        email=user_in.email,
        auth_provider_id=user_in.auth_provider_id
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user