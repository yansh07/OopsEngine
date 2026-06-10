# OopsEngine 🚀

> A distributed, scalable, and secure Remote Code Execution (RCE) environment built for executing untrusted user code in isolated Docker sandboxes.

OopsEngine decoupled API ingestion from compute-heavy execution using an asynchronous message broker architecture. It is designed to handle multiple concurrent code submissions without blocking the main event loop, ensuring high availability and fault tolerance.

## 🏗️ System Architecture

The system follows a distributed microservices architecture:

1. **Client (Next.js):** Submits code securely via JWT-authenticated endpoints and long-polls for real-time execution state (QUEUED ➔ RUNNING ➔ SUCCESS/ERROR).
2. **Reverse Proxy (Caddy):** Manages automatic Let's Encrypt SSL/TLS certificates and handles cross-origin (CORS) routing securely to the backend.
3. **API Gateway (FastAPI):** Ingests requests, validates JWKS identity, logs metadata to PostgreSQL, and drops the execution payload into a Redis queue.
4. **Message Broker (Redis):** Acts as the high-speed transit layer between the API and the worker nodes.
5. **Execution Worker (Celery):** Picks up tasks from Redis and spins up isolated, ephemeral Docker containers (Docker-in-Docker) to execute the untrusted code securely.

## ✨ Core Features

* **Docker-in-Docker Sandboxing:** Every code submission runs inside a completely isolated, ephemeral container spun up via the Docker SDK.
* **Resource Constraint Enforcement:** Strict CPU, memory, and timeout limits are enforced at the container level to prevent host system compromise or infinite loops.
* **Asynchronous Processing:** Zero event-loop blocking. The API handles thousands of requests by immediately offloading compute tasks to Celery workers.
* **Stateless Authentication:** Secure API access via JWTs, verified against a public JWKS endpoint before any code reaches the broker.
* **Cloud-Native Deployment:** Fully containerized via `docker-compose`, deployed on a Microsoft Azure Ubuntu VM with custom Swap Memory management for high-density container orchestration.

## 💻 Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS
* **Backend:** FastAPI, Python 3.10
* **Distributed Task Queue:** Celery, Redis
* **Database:** PostgreSQL (with AsyncPG)
* **Infrastructure:** Microsoft Azure, Docker Compose, Caddy (Reverse Proxy), Linux
* **Authentication:** Clerk (JWT/JWKS)

## 🚀 Running Locally

### Prerequisites
* Docker & Docker Compose installed.
* A PostgreSQL client (optional, for viewing data).

### 1. Clone the repository
```bash
git clone https://github.com/yansh07/OopsEngine.git
cd OopsEngine/backend

2. Set up Environment Variables
Create a .env file in the backend directory:

Code snippet
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=oopsengine

# Auth
CLERK_JWKS_URL=your_jwks_url_here
3. Ignite the Engine
Build and start the entire microservice ecosystem:

Bash
docker compose up --build -d
4. Initialize Database Tables
Once the containers are running, execute the initialization script inside the API container:

Bash
docker exec -it oopsengine_api python init_db.py
The API will now be available at http://localhost:8000.
