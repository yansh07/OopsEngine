#request/response shapes (CodeSubmitRequest)

from pydantic import BaseModel, ConfigDict, EmailStr
from uuid import UUID
from datetime import datetime

#jo data frontend se aaega
class UserSyncRequest(BaseModel):
    email: EmailStr
    auth_provider_id: str

#jo data backend wapas frontend ko bhejega
class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(from_attributes=True) #sqlalchemy ORM objects ko directly JSON mein convert karne ke liye