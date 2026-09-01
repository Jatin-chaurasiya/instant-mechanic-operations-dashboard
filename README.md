# 🚗 Instant Mechanic — Operations Dashboard

> A production-ready full-stack vehicle service operations dashboard for monitoring bookings, mechanics, customers, services, revenue, and operational activity from a single workspace.

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployment-AWS%20EC2-FF9900?logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white" />
</p>

---

## 🌐 Live Project

| Resource | Link |
|---|---|
| 🚀 **Live Frontend** | https://instant-mechanic.jatindev.xyz |
| ⚙️ **Live Backend API** | http://instant-mechanic-api.jatindev.xyz/api/v1.0 |
| 📚 **Swagger UI** | http://instant-mechanic-api.jatindev.xyz/api/v1.0/swagger-ui/index.html |
| 📄 **OpenAPI JSON** | http://instant-mechanic-api.jatindev.xyz/api/v1.0/v3/api-docs |
| 💻 **GitHub Repository** | https://github.com/Jatin-chaurasiya/instant-mechanic-operations-dashboard |

> **Note:** The current demo API is deployed over HTTP. HTTPS can be added later using Nginx + Certbot.

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
##  Dark Mode

The dashboard includes a modern dark-mode interface designed for long operational usage and improved visual hierarchy.
---
##📚 Swagger / OpenAPI

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
##🧱 Tech Stack
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
## 📊 Database

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
##🔌 API Endpoints
```text
Base API URL:

http://instant-mechanic-api.jatindev.xyz/api/v1.0

Authentication
POST /auth/register
POST /auth/login
Dashboard
GET /dashboard
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
##💻 Local Setup
Prerequisites

Install:

Java
Maven
Node.js
npm
Docker
Git
1. Clone Repository
git clone https://github.com/Jatin-chaurasiya/instant-mechanic-operations-dashboard.git

cd instant-mechanic-operations-dashboard
2. Run Backend + MySQL
cd backend
docker compose up -d

Check containers:

docker compose ps
3. Run Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173
⚙️ Environment Variables
Frontend

Production:

VITE_API_BASE_URL=http://instant-mechanic-api.jatindev.xyz/api/v1.0

Local development:

VITE_API_BASE_URL=http://localhost:8081/api/v1.0
Backend

Environment-specific configuration should be provided using application configuration/environment variables.

Typical values include:

Database URL
Database Username
Database Password
JWT Secret
Mail Configuration
External API Credentials

Never commit secrets, passwords, API keys, or .pem private keys to GitHub.

🐳 Docker

The application backend is containerized using Docker.

Main services:

backend → Spring Boot
mysql   → MySQL 8

Docker Compose is used to manage the application services.

The database uses persistent Docker storage so restarting/redeploying the backend container does not intentionally remove the stored database data.

☁️ Deployment
Frontend — Vercel
React + Vite
      ↓
GitHub
      ↓
Vercel
      ↓
https://instant-mechanic.jatindev.xyz
Backend — AWS EC2

The backend is deployed using:

AWS EC2
Ubuntu
Docker
Docker Compose
Nginx
Elastic IP
MySQL

Backend URL:

http://instant-mechanic-api.jatindev.xyz/api/v1.0
🔄 CI/CD

The backend deployment is automated using GitHub Actions.

Every push to the main branch triggers:

git push
   ↓
GitHub Actions
   ↓
Checkout repository
   ↓
Build Docker image
   ↓
Push image to Docker Hub
   ↓
SSH into EC2
   ↓
Pull latest backend image
   ↓
Restart backend container
Current pipeline
docker ✅
   ↓
deploy ✅

This eliminates the need to manually rebuild and restart the backend after every code change.

🛡️ Security

Current security implementation includes:

Spring Security
JWT authentication
Protected APIs
CORS configuration
Security Group configuration
Environment-based secrets
SSH-based automated EC2 deployment

Production hardening opportunities include HTTPS and stricter network access rules.

📱 Responsive UI

The dashboard was designed as a modern operations/SaaS interface with:

Responsive layout
Sidebar navigation
KPI cards
Tables
Filters
Charts/analytics
Live status indicators
Dark mode
Loading/error states
Clean typography
Consistent spacing
🖼️ Screenshots

Screenshots can be added later under:

docs/screenshots/

Recommended structure:

docs/
└── screenshots/
    ├── login.png
    ├── dashboard.png
    ├── bookings.png
    ├── mechanics.png
    ├── customers.png
    └── analytics.png

Then add them using:

## Login

![Login](docs/screenshots/login.png)

## Dashboard

![Dashboard](docs/screenshots/dashboard.png)

## Bookings

![Bookings](docs/screenshots/bookings.png)

## Mechanics

![Mechanics](docs/screenshots/mechanics.png)

## Analytics

![Analytics](docs/screenshots/analytics.png)
⭐ Implemented Bonus Features

The following bonus-oriented features are currently implemented:

✅ Authentication
✅ Dark Mode
✅ Swagger / OpenAPI
✅ Docker
✅ CI/CD
✅ GitHub Actions
✅ AWS EC2 deployment
✅ Vercel deployment
✅ Responsive dashboard
✅ REST API architecture
✅ Realistic database seed data
✅ Automatic dashboard refresh
✅ Nginx reverse proxy
✅ Elastic IP
✅ Docker Hub integration
🚧 Not Currently Implemented
Role-Based Access Control

Authentication is implemented, but separate fine-grained permissions for different application roles are not currently implemented.

For example:

Admin
Operations Manager
Support Agent

are not currently separated into different authorization policies.

🚀 Future Enhancements
🔍 Global Search

A single search bar can be extended to search across:

Bookings
Customers
Mechanics
Vehicles
Services

Possible searchable values:

Booking ID
Customer Name
Customer Email
Vehicle Number
Mechanic Name
Service Name
🔔 Real-Time Notifications

The notification system can be enhanced using WebSockets to provide instant events such as:

New booking received
Mechanic assigned
Booking status changed
Booking completed
New customer registered
🌐 WebSockets

WebSockets can be introduced for true real-time communication between the backend and dashboard.

Possible flow:

Booking status changed
       ↓
Spring Boot
       ↓
WebSocket Event
       ↓
React Dashboard
       ↓
UI updates instantly
🛡️ API Rate Limiting

Rate limiting can be added to protect APIs from excessive requests.

Possible implementation:

Client
  ↓
Nginx / API Layer
  ↓
Rate Limiter
  ↓
Spring Boot
🔒 HTTPS

Future production hardening:

HTTP
 ↓
Nginx
 ↓
Certbot / SSL
 ↓
HTTPS
📍 Additional Future Features
Role-Based Access Control
WebSockets
Mechanic map/location visualization
CSV export
Advanced filtering
Error monitoring
Caching
Automated tests
Query optimization
More detailed analytics
🧠 Engineering Decisions
Why React + Vite?

Used for a fast, component-based frontend with efficient development and straightforward deployment.

Why Spring Boot?

Spring Boot provides a clean Java backend architecture with REST APIs, dependency injection, security, and JPA/Hibernate support.

Why MySQL?

The domain is highly relational. Bookings naturally connect customers, vehicles, services, and mechanics, making MySQL a good fit.

Why Docker?

Docker provides a reproducible runtime environment and simplifies deployment.

Why Nginx?

Nginx acts as a reverse proxy between the public domain and the internal Spring Boot service.

Why GitHub Actions?

GitHub Actions automates the deployment pipeline and reduces manual deployment effort.

🧪 Testing & Verification

The project was verified through:

Local frontend testing
Local backend testing
Postman API testing
MySQL verification
Swagger/OpenAPI testing
Docker container verification
AWS EC2 deployment testing
Public API testing
GitHub Actions CI/CD verification
📂 Repository Structure
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
🤖 AI Usage

AI tools were used as engineering assistants during development.

AI was used for
Architecture brainstorming
Code generation and refinement
Debugging
API design discussions
Database design
SQL seed-data generation
UI/UX improvements
Deployment troubleshooting
Docker and CI/CD configuration support
Documentation
Human contribution

The generated suggestions were reviewed, adapted, integrated, tested, and debugged manually.

The final system was assembled and validated through actual:

Frontend development
Backend development
Database setup
API integration
Docker deployment
AWS EC2 deployment
Nginx configuration
Vercel deployment
CI/CD setup
Production testing
📈 Project Highlights

This project demonstrates the complete full-stack development lifecycle:

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

The application is not limited to a local prototype; it is publicly deployed and connected end-to-end.

🎯 What I'm Most Proud Of

The strongest part of the project is taking the application from development all the way to production deployment.

The complete workflow covers:

Frontend → Backend → Database → Docker → AWS EC2 → Nginx → Domain → Vercel → Swagger/OpenAPI → GitHub Actions CI/CD

This demonstrates practical full-stack engineering rather than only UI development.

📬 Final Submission
👨‍💻 Name

Jatin Chaurasiya

💻 GitHub

https://github.com/Jatin-chaurasiya/instant-mechanic-operations-dashboard

🚀 Frontend

https://instant-mechanic.jatindev.xyz

⚙️ Backend

http://instant-mechanic-api.jatindev.xyz/api/v1.0

📚 API Documentation

http://instant-mechanic-api.jatindev.xyz/api/v1.0/swagger-ui/index.html

📄 OpenAPI

http://instant-mechanic-api.jatindev.xyz/api/v1.0/v3/api-docs

❤️ Final Note

Instant Mechanic was built with a focus on:

Think → Build → Debug → Deploy → Automate

The project demonstrates a complete full-stack workflow with a modern frontend, structured backend, relational database, API documentation, Dockerized deployment, AWS hosting, and automated CI/CD.

<p align="center"> Built with ❤️ using React, Spring Boot, MySQL, Docker, AWS and GitHub Actions. </p> ```
