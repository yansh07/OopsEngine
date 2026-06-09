from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class CodeSubmitRequest(BaseModel):
    user_id: UUID
    language: str #right now, we only support python
    code: str

class ExecutionResponse(BaseModel):
    id: UUID
    status: str
    stdout: Optional[str] = None
    stderr: Optional[str] = None
    execution_time_ms: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True