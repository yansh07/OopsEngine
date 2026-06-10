from celery import Celery
from uuid import UUID

from app.db.database import SyncSessionLocal
from app.db.models import Execution
from app.services.docker_runner import DockerRunner

celery_app = Celery(
    "execution_worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

runner = DockerRunner()

#pure, blocking, sync db update
def update_execution_in_db_sync(execution_id: str, result: str):
    with SyncSessionLocal() as db:
        #standard sqlalchemy sync query
        exec_record = db.query(Execution).filter(Execution.id == UUID(execution_id)).first()

        if exec_record:
            exec_record.status = result["status"]
            exec_record.stdout = result["stdout"]
            exec_record.stderr = result["stderr"]
            exec_record.execution_time_ms = result["execution_time_ms"]
            db.commit()

@celery_app.task(name="execute_code_task")
def run_code_task(execution_id: str, code: str):
    #run docker 
    result = runner.execute_python_sync(code)

    #update db in sync
    update_execution_in_db_sync(execution_id, result)

    return result["status"]