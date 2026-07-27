# Project Name: Green-Shift (Eco-Routing Cloud Balancer)

## 1. Main Features & Implementation Idea

* **Feature 1: Lightweight Eco-Routing Engine**
* *Original Context*: A Python backend that routes simulated web traffic based on the environmental impact of where data centers are powered.
* *Simplified Implementation*: Build a lightweight API using **FastAPI** or **Flask**. Instead of fetching complex real-time grid data, it reads from a local JSON file that holds mock "carbon intensity scores" for two dummy regions (e.g., EU-West vs. US-East).


* **Feature 2: Basic Status Dashboard**
* *Original Context*: A frontend dashboard displaying a global map for visualizing traffic shifting dynamically between regions.
* *Simplified Implementation*: Interactive map. Use **REACT** to create a simple dashboard with two large status cards representing the regions. The active "green" region lights up when traffic is routed to it.


* **Feature 3: Static Carbon Metrics**
* *Original Context*: Real-time calculation of energy consumption and carbon emission rates to demonstrate how organizations gain insights into cloud-related emissions.
* *Simplified Implementation*: Instead of live dynamic algorithms, the backend returns a hardcoded "savings multiplier" every time a request is successfully routed to the lower-carbon region, displayed as a simple tally counter on the frontend.


* **Feature 4: Simplified Containerized Infrastructure**
* *Original Context*: Mock regional servers provisioned via Terraform and managed with Kubernetes to handle autoscaling.
* *Simplified Implementation*: Bypass Terraform and Kubernetes. Use **Docker** to containerize the frontend, backend, and two dummy "server" endpoints. Orchestrate them locally or on a single **AWS** / **Google Cloud** VM using **Docker Compose**.

---

## 2. Departments & Task Breakdown

### A. Backend & Logic Department (IT Focus)

* **Task 1:** Develop the foundational Python API using FastAPI or Flask.
* **Task 2:** Create the mock endpoints that act as the dummy regional servers.
* **Task 3:** Develop a basic load balancing algorithm (simple `if/else` logic) that checks the mock carbon JSON and forwards the request to the region with the lower score.

### B. Frontend & UI Department (Shared IT / Non-IT)

* **Task 1:** Setup the Agile board and finalize basic wireframes (e.g., using a whiteboard tool).
* **Task 2:** Build the UI skeleton (using Streamlit for pure Python, or basic HTML/Bootstrap) to display the active server.
* **Task 3:** Connect the frontend to the API so the UI dynamically updates when the backend shifts routing.

### C. QA & Data Simulation Department (Non-IT Focus)

* **Task 1:** Create and manage the mock "weather/carbon" JSON files that the backend will read to make decisions.
* **Task 2:** Build a Postman collection to flood the gateway with mock API requests.
* **Task 3:** Validate system stability by sending extensive JSON weather payloads via Postman to ensure the API correctly flips between regions without failing.

### D. Infrastructure & DevOps Department (IT Focus)

* **Task 1:** Write `Dockerfile` scripts for the frontend and backend applications.
* **Task 2:** Write a `docker-compose.yml` file to spin up all services simultaneously.
* **Task 3:** Deploy the Docker Compose stack to a single, basic **AWS EC2** or **Google Cloud Compute Engine** instance for the final demo.

---

## 3. Simplified User Stories

* **As a Network Administrator**: I want to manually update the local mock JSON file so that I can instantly verify the system is rerouting traffic to the most eco-friendly server.
* **As a Sustainability Officer**: I want to see a tally counter of "Carbon Emissions Saved" compared to traditional routing, so that I can prove the value of the routing logic.
* **As a Backend Developer**: I want the API to automatically parse regional energy data from a local file and make routing decisions, so that traffic balancing requires zero manual intervention.
* **As a QA Tester**: I want to send mock API requests via Postman so that I can ensure the load balancer distributes the workload to the correct dummy server.

### Agile Sprints & Roadmap (4-Week Timeline)

**Sprint 1: Architecture, Mock Data & Foundation**

* **Backend (IT Focus):** Develop the foundational Python API and create the dummy regional endpoints.
* **Frontend (Shared):** Setup the Agile board, finalize wireframes, and build the UI skeleton.
* **QA (Non-IT Focus):** Create and structure the mock "weather/carbon" JSON files for the backend.
* **DevOps (IT Focus):** Write the initial Dockerfile scripts for the frontend and backend applications.

**Sprint 2: Core Logic & Initial Integration**

* **Backend (IT Focus):** Develop the lightweight load balancing algorithm to forward requests based on the mock JSON scores.
* **Frontend (Shared):** Connect the frontend to the API so the UI dynamically updates when routing shifts.
* **QA (Non-IT Focus):** Build a Postman collection to begin flooding the gateway with mock API requests.
* **DevOps (IT Focus):** Write the Docker Compose file to spin up all services simultaneously locally.

<!-- No new features (not even small UI tweaks) can be proposed. Sprints 3 and 4 must be dedicated entirely to testing, fixing bugs, and deploying. -->

**Sprint 3: Stress Testing & Local Orchestration**

* **Backend (IT Focus):** Implement the static metrics to return a carbon savings multiplier tally.
* **Frontend (Shared):** Polish the UI to ensure the status cards visually represent the active "green" region accurately.
* **QA (Non-IT Focus):** Validate system stability by sending extensive JSON weather payloads via Postman to verify the API flips between regions.
* **DevOps (IT Focus):** Test the Docker Compose stack locally to ensure seamless communication between the frontend, API, and dummy servers.

**Sprint 4: Deployment & Final Polish**

* **Backend & Frontend:** Resolve any remaining cross-department bugs and refine the UI/UX based on QA feedback.
* **QA (Non-IT Focus):** Finalize Postman test suites and prepare the presentation deck to prove the value of the routing logic.
* **DevOps (IT Focus):** Deploy the Docker Compose stack to a single AWS or Google Cloud instance for the live demo.

---

### Risks and Possible Blockers

| Risk / Blocker | Description | Mitigation Strategy |
| --- | --- | --- |
| **Integration Bottlenecks (Blocker)** | The Python backend logic must be ready on schedule, or the non-IT team will be blocked from conducting their Postman QA tests and validating the UI metrics.

 | Prioritize the API load balancing algorithm in Sprint 1 and 2 to unblock QA and Frontend early. |
| **Docker Compose Networking (Risk)** | Misconfigured internal Docker networks could prevent the frontend, API, and dummy endpoints from communicating when spun up simultaneously. | Define explicit network aliases in the configuration and test connectivity locally before Sprint 4. |
| **Scope Creep in the UI (Risk)** | The team might attempt to re-introduce the complex interactive global map from the original project design.

 | Strictly enforce the "Green-Shift Lite" scope, limiting the UI to simple status cards and a tally counter. |
| **Cloud Deployment Access (Blocker)** | Deploying to a virtual machine requires proper network security group configurations; closed ports will block the final demo. | The DevOps department must test exposing HTTP ports on a basic cloud VM during Sprint 3, not Sprint 4. |
| **Static File Reloading (Risk)** | If the backend caches the local mock JSON file upon startup, the traffic routing will not shift during the live demo when the file is manually updated. | Ensure the backend Python script reads the JSON file dynamically on every incoming request rather than loading it once at startup. |

## 4. Brand details?!?!?
**Details about DESIGN, brand identity, logos etc**