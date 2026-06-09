#POST/execute, GET /executions/{id}

import asyncio
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, List
from sqlalchemy import select
from uuid import UUID

from app.db.database import AsyncSessionLocal
from app.db.models import Execution, ExecutionStatus
from app.schemas.engine import CodeSubmitRequest, ExecutionResponse
from app.services.docker_runner import DockerRunner
from app.core.security import verify_user_token

router = APIRouter()
runner = DockerRunner()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@router.post("/", response_model=ExecutionResponse)
async def submit_code(request: CodeSubmitRequest, db: AsyncSession = Depends(get_db), clerk_id: str = Depends(verify_user_token)):
    if request.language.lower() != "python":
        raise HTTPException(status_code=400, detail="Only Python is Supported Right Now!!")
    
    #create db record(status: queued)
    new_execution = Execution(
        user_id=request.user_id,
        language=request.language,
        code_snippet=request.code,
        status=ExecutionStatus.QUEUED
    )
    db.add(new_execution)
    await db.commit()
    await db.refresh(new_execution)

    #run docker code in separate thread to prevent fastapi
    result = await asyncio.to_thread(runner.execute_python_sync, request.code)

    #update db with results
    new_execution.status=result["status"]
    new_execution.stdout=result["stdout"]
    new_execution.stderr=result["stderr"]
    new_execution.execution_time_ms=result["execution_time_ms"]

    await db.commit()
    await db.refresh(new_execution)

    return new_execution

@router.get("/history/{user_id}", response_model=List[ExecutionResponse])
async def get_execution_history(user_id: UUID, db: AsyncSession = Depends(get_db)):
    query = (
        select(Execution)
        .where(Execution.user_id == user_id)
        .order_by(Execution.created_at.desc())
        .limit(20)
    )
    result = await db.execute(query)
    exectuions = result.scalars().all()

    return exectuions