#VVIP - all container logic goes here
import docker
import time
from docker.errors import ContainerError, ImageNotFound, APIError
from app.db.models import ExecutionStatus

class DockerRunner:
    def __inti__(self):
        self.client = docker.from_env()

    async def run_python_code(self, code_snippet: str, timeout_sec: int = 3, mem_limit: str = "256m"):
        #setup temp file or command script
        #execute container with rescue boundaries
        start_time = time.time()
        try:
            container = self.client.containers.run(
                image="python:3.10-alpine",
                command=f'python -c "{code_snippet}',
                mem_limit=mem_limit,
                network_disabled=True, #no access for untrusted code
                detach=False,
                stdout=True,
                stderr=True,
                remove=True #automatically clean up container after exit
            )

            execution_time = int((time.time() - start_time) * 1000)
            return {
                "status": ExecutionStatus.SUCCESS,
                "stdout": container.decode("utf-8"),
                "stderr": None,
                "execution_time_ms": execution_time
            }

        except ContainerError as e:
            #code compiled but crashed during runtime(syntaxerror, valuerror)
            return {
                "status": ExecutionStatus.RUNTIME_ERROR,
                "stdout": None,
                "stderr": str(e),
                "execution_time_ms": int((time.time() - start_time) * 1000)
            }
        
        except Exception as e:
            #to catch custom timeouts or docker daemon failures
            #if the exit code is 137, it means Out of memory (OOM) killed by kernel
            return {
                "status": ExecutionStatus.TIMEOUT,
                "stdout": None,
                "stderr": "Execution terminated: Resource or time limit exceeded.",
                "execution_time_ms": None
            }