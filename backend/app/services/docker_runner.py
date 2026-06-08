#VVIP - all container logic goes here
import docker
import time
from docker.errors import ContainerError, ImageNotFound
from requests.exceptions import ReadTimeout
from app.db.models import ExecutionStatus

class DockerRunner:
    def __init__(self):
        self.client = docker.from_env()

    def execute_python_sync(self, code_snippet: str, timeout_sec: int = 3) -> dict:
        """
        Synchronous function that handles the Docker container.
        We will wrap this in an async thread later.
        """
        start_time = time.time()
        container = None

        try:
            # 1. Start container in detached mode
            container = self.client.containers.run(
                image="python:3.10-alpine",
                command=['python', '-c', code_snippet], # Array format prevents shell injection
                mem_limit="128m",      # Strict memory limit
                network_disabled=True, # No internet access for untrusted code
                detach=True            # Run in background so we can enforce timeout
            )

            # 2. Enforce Timeout
            result = container.wait(timeout=timeout_sec)
            
            execution_time = int((time.time() - start_time) * 1000)
            exit_code = result.get("StatusCode", -1)

            # 3. Fetch Logs
            logs = container.logs().decode("utf-8")

            if exit_code == 0:
                return {
                    "status": ExecutionStatus.SUCCESS,
                    "stdout": logs,
                    "stderr": None,
                    "execution_time_ms": execution_time
                }
            else:
                return {
                    "status": ExecutionStatus.RUNTIME_ERROR,
                    "stdout": None,
                    "stderr": logs,
                    "execution_time_ms": execution_time
                }

        except ReadTimeout:
            # This triggers if container.wait() exceeds our timeout_sec
            if container:
                container.kill() # Forcefully murder the infinite loop
            return {
                "status": ExecutionStatus.TIMEOUT,
                "stdout": None,
                "stderr": f"Execution timed out after {timeout_sec} seconds.",
                "execution_time_ms": timeout_sec * 1000
            }
        except Exception as e:
            return {
                "status": ExecutionStatus.RUNTIME_ERROR,
                "stdout": None,
                "stderr": str(e),
                "execution_time_ms": None
            }
        finally:
            # 4. Clean up: Always remove the container
            if container:
                try:
                    container.remove(force=True)
                except:
                    pass