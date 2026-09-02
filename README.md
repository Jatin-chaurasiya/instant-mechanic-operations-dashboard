# 🚗 Instant Mechanic — Operations Dashboard

> A production-ready full-stack vehicle service operations dashboard for monitoring bookings, mechanics, customers, services, revenue, and operational activity from a single workspace.
> **Note**
## 🔐 Authentication & Access Scope

The application is designed as an internal operations dashboard for company administrators rather than a public customer portal.

JWT-based authentication is implemented for secure login and authenticated API access. The current version uses a single admin user role, with registration and login available to initialize/administer the portal during development and demonstration.

Role-Based Access Control (RBAC) is intentionally kept outside the current scope because the present dashboard is focused on a single administrative workflow. The authentication architecture can be extended to support multiple roles such as Admin, Manager, Mechanic, or Support Staff when required.

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployment-AWS%20EC2-FF9900?logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" />
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/Jatin-chaurasiya/instant-mechanic-operations-dashboard/main/daskboard.png" alt="Instant Mechanic Dashboard" width="100%" />
</p>


## 🌐 Live Project

| Resource | Link |
|---|---|
| 🚀 **Live Application** | https://instant-mechanic.jatindev.xyz |
| 🚀 **Live Frontend** | https://instant-mechanic.jatindev.xyz |
| ⚙️ **Live Backend API** | https://instant-mechanic-api.jatindev.xyz/api/v1.0 |
| 📚 **Swagger UI** | https://instant-mechanic-api.jatindev.xyz/api/v1.0/swagger-ui/index.html |
| 📄 **OpenAPI JSON** | https://instant-mechanic-api.jatindev.xyz/api/v1.0/v3/api-docs |
| 💻 **GitHub Repository** | https://github.com/Jatin-chaurasiya/instant-mechanic-operations-dashboard |

---

# 📌 Project Overview

**Instant Mechanic Operations Dashboard** is a full-stack web application designed for vehicle service operations teams.

The platform provides a centralized view of:

- Vehicle service bookings
- Booking statuses
- Customers
- Mechanics
- Services
- Revenue
- Operational analytics
- Live dashboard activity
- Authentication and protected APIs

The goal was to build a realistic operations dashboard rather than a static frontend prototype.

The application uses a real Spring Boot backend connected to MySQL, realistic seed data, Dockerized deployment, AWS EC2 hosting, Nginx reverse proxy, Vercel frontend deployment, Swagger/OpenAPI documentation, and GitHub Actions CI/CD.

---

# ✨ Features

## 📊 Operations Dashboard

The dashboard provides high-level operational KPIs:

- Total Bookings
- Today's Bookings
- Completed Bookings
- Pending Bookings
- Cancelled Bookings
- Total Revenue
- Active Mechanics
- New Customers
- Automatic dashboard refresh
- Live system status indicator

---

## 📅 Booking Management

- View all bookings
- Booking details
- Customer information
- Vehicle information
- Assigned mechanic
- Service information
- Booking date and time
- Booking amount
- Booking status
- Filtering and pagination support
--
## Supported booking statuses:
PENDING
ASSIGNED
ON_THE_WAY
IN_PROGRESS
COMPLETED
CANCELLED
## 🔧 Mechanic Management
View mechanics
Mechanic availability/status
Monitor active service operations
Track assigned work
## 👥 Customer Management
Customer listing
Customer details
Contact information
Booking-related customer visibility
## 🛠️ Service Management
Service listing
Service details
Service categories
Service pricing
Service duration
Active/inactive services
## 🔐 Authentication
Login
Registration
JWT authentication
Protected backend resources
Authenticated dashboard access
## 🌙 Dark Mode

The dashboard includes a modern dark-mode interface designed for long operational usage
and improved visual hierarchy.

## 🌙 Global Search

Search Globally with name,Vehicals number,mechnics name,service name,Booking name etc.

---

# 📚 Swagger / OpenAPI

The backend includes interactive API documentation using Swagger/OpenAPI.

Swagger UI

http://instant-mechanic-api.jatindev.xyz/api/v1.0/swagger-ui/index.html

OpenAPI JSON

http://instant-mechanic-api.jatindev.xyz/api/v1.0/v3/api-docs
---
# 🏗️ Architecture
                    ┌───────────────────────────────┐
                    │        React + Vite           │
                    │       Frontend on Vercel      │
                    └───────────────┬───────────────┘
                                    │
                                    │ REST API
                                    ▼
                    ┌───────────────────────────────┐
                    │            Nginx              │
                    │         Reverse Proxy         │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │         Spring Boot            │
                    │ REST APIs + Spring Security    │
                    │       JWT Authentication       │
                    └───────────────┬───────────────┘
                                    │
                                    │ JPA / Hibernate
                                    ▼
                    ┌───────────────────────────────┐
                    │            MySQL 8             │
                    │                               │
                    │ bookings / customers /        │
                    │ mechanics / services / users  │
                    └───────────────────────────────┘
## 🔄 Production Deployment Architecture

```text
Developer
   │
   │ git push
   ▼
GitHub Repository
   │
   ▼
GitHub Actions
   │
   ├── Build Docker Image
   ├── Push Image to Docker Hub
   │
   ▼
AWS EC2
   │
   ├── Pull Latest Backend Image
   └── Restart Backend Container
   │
   ▼
Nginx Reverse Proxy
   │
   ▼
Spring Boot Application
   │
   ▼
MySQL Docker Container
```
---
#🧱 Tech Stack
```text
🎨 Frontend
React
Vite
JavaScript
Tailwind CSS
Axios
React Hooks
React Router

⚙️ Backend
Java
Spring Boot
Spring Security
JWT Authentication
Spring Data JPA
Hibernate
REST APIs
Maven

🗄️ Database
MySQL 8
Relational Database Design
Foreign-Key Relationships
Realistic Seed / Sample Data

☁️ DevOps & Deployment
Docker
Docker Compose
AWS EC2
Ubuntu Linux
Nginx
Elastic IP
Vercel
Docker Hub
GitHub Actions

📚 API Documentation
Swagger UI
OpenAPI
```
---
# 📊 Database

The application uses a real relational MySQL database instead of relying entirely on hardcoded frontend data.

### Current Seeded Dataset

| # | Entity | Records |
|---:|---|---:|
| 1 | Customers | 50 |
| 2 | Vehicles | 50 |
| 3 | Mechanics | 20 |
| 4 | Services | 10 |
| 5 | Bookings | 510 |

The seeded booking data contains realistic relationships and variations across:

- Booking statuses
- Service categories
- Booking dates
- Booking amounts
- Customers
- Vehicles
- Mechanics
---
#🔌 API Endpoints
```text
Base API URL:

http://instant-mechanic-api.jatindev.xyz/api/v1.0

Authentication
POST /auth/register
POST /auth/login

Dashboard
GET /dashboard

Global Search
GET /search?query=Rahul

Bookings
GET /bookings
GET /bookings/{id}

Mechanics
GET /mechanics

Customers
GET /customers

Services
GET /services
GET /services/{id}
GET /services/categories

These are representative endpoints. The complete API contract is available through Swagger/OpenAPI.
```
---
## 💻 Local Setup

### Prerequisites

Before running the project locally, make sure the following are installed:

- Java
- Maven
- Node.js
- npm
- Docker
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Jatin-chaurasiya/instant-mechanic-operations-dashboard.git
cd instant-mechanic-operations-dashboard
```

### 2. Run Backend + MySQL

Navigate to the backend directory:

```bash
cd backend
```

Start the backend and MySQL containers using Docker Compose:

```bash
docker compose up -d
```

Check the running containers:

```bash
docker compose ps
```

The main services are:

- `backend` — Spring Boot application
- `mysql` — MySQL 8 database

### 3. Run the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## ⚙️ Environment Variables

### Frontend

For local development:

```env
VITE_API_BASE_URL=http://localhost:8081/api/v1.0
```

For the deployed production environment:

```env
VITE_API_BASE_URL=https://instant-mechanic-api.jatindev.xyz/api/v1.0
```

### Backend

The backend uses environment/application configuration for deployment-sensitive values.

Typical configuration includes:

```text
Database URL
Database Username
Database Password
JWT Secret
Mail Configuration
External API Credentials
```

> ⚠️ Never commit passwords, API keys, JWT secrets, private keys, or `.pem` files to the repository.

---

## 🐳 Docker

The backend and database are containerized using Docker and Docker Compose.

### Services

| Service | Technology |
|---|---|
| Backend | Spring Boot |
| Database | MySQL 8 |

Docker Compose manages the containers, networking, and service startup.

The MySQL database uses persistent Docker storage so that restarting or redeploying the backend container does not intentionally remove the existing database data.

---

## ☁️ Deployment

### Frontend — Vercel

The React + Vite frontend is deployed using Vercel.

```text
React + Vite
      │
      ▼
GitHub Repository
      │
      ▼
Vercel
      │
      ▼
https://instant-mechanic.jatindev.xyz
```

### Backend — AWS EC2

The Spring Boot backend is deployed on AWS EC2 using:

- Ubuntu Linux
- Docker
- Docker Compose
- Nginx
- Elastic IP
- MySQL

Production Backend URL:

```text
https://instant-mechanic-api.jatindev.xyz/api/v1.0
```

### Production Request Flow

```text
Client
  │
  ▼
https://instant-mechanic-api.jatindev.xyz
  │
  ▼
Nginx Reverse Proxy
  │
  ▼
Spring Boot Application
  │
  ▼
MySQL Docker Container
```

---

## 🔄 CI/CD

The backend deployment is automated using GitHub Actions.

Every push to the `main` branch triggers the CI/CD pipeline:

```text
Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Checkout Repository
    ├── Build Docker Image
    ├── Push Image to Docker Hub
    │
    ▼
AWS EC2
    │
    ├── Pull Latest Backend Image
    └── Restart Backend Container
    │
    ▼
Nginx
    │
    ▼
Spring Boot Application
```

### CI/CD Pipeline

```text
Docker Build & Push ✅
          │
          ▼
      EC2 Deploy ✅
```

This automation allows backend changes to be deployed to AWS EC2 automatically after pushing code to the `main` branch, without manually rebuilding and restarting the backend for every deployment.

---
## 🛡️ Security

The application includes the following security measures:

- Spring Security
- JWT Authentication
- Protected REST APIs
- CORS Configuration
- AWS Security Group Configuration
- Environment-based Secrets
- SSH-based Automated EC2 Deployment
- HTTPS / SSL

Production security can be further strengthened with stricter network access rules, role-based authorization, API rate limiting, and advanced monitoring.

---

## 📱 Responsive UI

The dashboard is designed as a modern operations/SaaS interface with:

- Responsive Layout
- Sidebar Navigation
- KPI Cards
- Data Tables
- Filters
- Analytics and Charts
- Live Status Indicators
- Dark Mode
- Loading and Error States
- Clean Typography
- Consistent Spacing

---

## ⭐ Implemented Bonus Features

The following bonus-oriented features are currently implemented:

- ✅ Authentication
- ✅ Dark Mode
- ✅ Global Search
- ✅ Swagger / OpenAPI
- ✅ Docker
- ✅ CI/CD
- ✅ GitHub Actions
- ✅ AWS EC2 Deployment
- ✅ Vercel Deployment
- ✅ Responsive Dashboard
- ✅ REST API Architecture
- ✅ Realistic Database Seed Data
- ✅ Automatic Dashboard Refresh
- ✅ Nginx Reverse Proxy
- ✅ Elastic IP
- ✅ Docker Hub Integration
- ✅ HTTPS / SSL
---

## 🧠 Engineering Decisions

### Why React + Vite?

Used for a fast, component-based frontend with efficient development and straightforward deployment.

### Why Spring Boot?

Spring Boot provides a clean Java backend architecture with REST APIs, dependency injection, security, and JPA/Hibernate support.

### Why MySQL?

The domain is highly relational. Bookings naturally connect customers, vehicles, services, and mechanics, making MySQL a good fit.

### Why Docker?

Docker provides a reproducible runtime environment and simplifies deployment.

### Why Nginx?

Nginx acts as a reverse proxy between the public domain and the internal Spring Boot service.

### Why GitHub Actions?

GitHub Actions automates the deployment pipeline and reduces manual deployment effort.

---

## 🧪 Testing & Verification

The project was verified through:

- Local frontend testing
- Local backend testing
- Postman API testing
- MySQL verification
- Swagger/OpenAPI testing
- Docker container verification
- AWS EC2 deployment testing
- Public API testing
- GitHub Actions CI/CD verification
---
#📂 Repository Structure
```text
instant-mechanic-operations-dashboard/
│
├── .github/
│   └── workflows/
│       └── main.yml
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── docs/
│   └── screenshots/
│
└── README.md
```
---
## 🤖 AI Usage

AI tools were used as engineering assistants during development.

### AI was used for

- Architecture brainstorming
- Code generation and refinement
- Debugging
- API design discussions
- Database design
- SQL seed-data generation
- UI/UX improvements
- Deployment troubleshooting
- Docker and CI/CD configuration support
- Documentation

---

## 📈 Project Highlights

This project demonstrates the complete full-stack development lifecycle:

```text
UI Design
   ↓
React Frontend
   ↓
REST APIs
   ↓
Spring Boot
   ↓
Spring Security + JWT
   ↓
JPA / Hibernate
   ↓
MySQL
   ↓
Docker
   ↓
Nginx
   ↓
AWS EC2
   ↓
GitHub Actions CI/CD
```
---
# 📬 Final Submission

## 💻 GitHub

https://github.com/Jatin-chaurasiya/instant-mechanic-operations-dashboard

## 🚀 Frontend

https://instant-mechanic.jatindev.xyz

## ⚙️ Backend

https://instant-mechanic-api.jatindev.xyz/api/v1.0

## 📚 API Documentation

http://instant-mechanic-api.jatindev.xyz/api/v1.0/swagger-ui/index.html

## 📄 OpenAPI

http://instant-mechanic-api.jatindev.xyz/api/v1.0/v3/api-docs

---

❤️ Final Note

Instant Mechanic was built with a focus on:

Think → Build → Debug → Deploy → Automate

The project demonstrates a complete full-stack workflow with a modern frontend, structured backend, relational database, API documentation, Dockerized deployment, AWS hosting, and automated CI/CD.

<p align="center"> Built with ❤️ using React, Spring Boot, MySQL, Docker, AWS and GitHub Actions. </p> ```
