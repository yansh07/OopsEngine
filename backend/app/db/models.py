#db schemas  definitions  (users, executions)

import uuid
import enum

from sqlalchemy import String, Text, Integer, ForeignKey, Enum, DateTime, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from app.db.database import Base


class Users(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(
        String(225),
        unique=True,
        nullable=False
    )
    auth_provider_id: Mapped[str] = mapped_column(
        String(225),
        unique=True,
        nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class ExecutionStatus(str, enum.Enum):
    QUEUED = "QUEUED"
    RUNNING = "RUNNING"
    SUCCESS = "SUCCESS"
    RUNTIME_ERROR = "RUNTIME_ERROR"
    TIMEOUT = "TIMEOUT"

class Execution(Base):
    __tablename__ = "executions"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE")
    )
    language: Mapped[str] = mapped_column(String(50))

    code_snippet: Mapped[str] = mapped_column(Text)

    status: Mapped[ExecutionStatus] = mapped_column(
        Enum(ExecutionStatus),
        default=ExecutionStatus.QUEUED
    )
    stdout: Mapped[str | None] = mapped_column(Text)
    stderr: Mapped[str | None] = mapped_column(Text)
    execution_time_ms: Mapped[int | None] = mapped_column(
        Integer
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user = relationship("Users")

    __table_args__ = (
        Index('idx_user_created_at', 'user_id', 'created_at'),
    )