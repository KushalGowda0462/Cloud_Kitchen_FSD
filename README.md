# Thindi Potha — Cloud Kitchen Ordering Platform

A production-ready, full-stack web platform for cloud kitchens and virtual restaurants to showcase menus, accept orders, and manage customers through a seamless, single-page digital experience.

Designed with a strong focus on **UX, scalability, and system architecture**, this project demonstrates real-world SaaS patterns including authentication, API design, data modeling, and deployment-ready infrastructure.

---

## 🌐 Product Overview

Thindi Potha enables cloud kitchens to operate a modern digital storefront without relying on third-party delivery platforms.

**Core capabilities include:**
- Interactive, high-conversion marketing site
- Real-time menu discovery and filtering
- Secure customer authentication
- End-to-end ordering and order tracking
- Scalable backend with persistent data storage

This platform can be extended into a **multi-tenant SaaS** for onboarding multiple kitchen brands under a single system.

---

## ✨ Key Features

### Customer Experience
- Single-page scrolling layout for fast, frictionless navigation
- Cinematic hero section with seamless video backgrounds
- Mobile-first, responsive UI with modern design patterns
- Cuisine, category, and dietary (veg/non-veg) filtering
- Persistent shopping cart with real-time updates
- Guided multi-step checkout flow
- Order history for authenticated users

### Platform & Backend
- Secure authentication and session handling
- Centralized API architecture
- Strong input validation and error handling
- Persistent storage for users, dishes, orders, and messages
- Database seeding for demo and staging environments
- Role-ready access control for future admin dashboards

---

## 🏗️ Architecture

Client (Next.js UI)
↓
API Layer (Next.js Route Handlers)
↓
Data Layer (MongoDB)

**Design Principles:**
- Stateless backend using token-based authentication
- Clean separation of UI, API, and data layers
- Schema-driven validation for data integrity
- Deployment-ready for cloud platforms

---

## 🛠️ Technology Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Modern UI utilities & icon system

### Backend
- Node.js (via Next.js)
- MongoDB + Mongoose
- JWT-based authentication
- Schema validation & centralized error handling

### Infrastructure
- Docker & Docker Compose
- Environment-based configuration
- Cloud-ready deployment model

---

## ⚙️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker & Docker Compose

---

### Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd FSD/frontend

2.	Install dependencies
  npm install

3.	Configure environment
cp .env.example .env.local

Required variables:
	•	MONGODB_URI
	•	JWT_SECRET

4.	Start database
  docker compose up -d

5.	Seed sample data
    npx ts-node scripts/seed.ts 

6.	Run platform
  npm run dev

🔌 API Overview

Authentication
	•	POST /api/auth/signup — Create account
	•	POST /api/auth/login — Authenticate user

Menu
	•	GET /api/menu — Fetch dishes with cuisine, category, and dietary filters

Orders
	•	POST /api/orders — Place new order
	•	GET /api/orders/my — Retrieve customer order history

Contact
	•	POST /api/contact — Submit customer inquiries

⸻

🗄️ Data Model Summary

User
	•	Unique email
	•	Hashed password
	•	Role-based access
	•	Timestamps

Dish
	•	Name, image, cuisine, category
	•	Dietary flag
	•	Price and description
	•	Unique cache key for deduplication

Order
	•	Customer reference
	•	Items and pricing breakdown
	•	Delivery details
	•	Status lifecycle
	•	Timestamps

Contact
	•	Customer identity
	•	Message
	•	Timestamp

⸻

🔐 Security & Best Practices
	•	Environment-based secret management
	•	Secure password hashing
	•	Token-based authentication
	•	Centralized validation layer
	•	Sensitive files excluded from version control
	•	Cloud deployment ready

⸻

🚀 Roadmap
	•	Multi-tenant onboarding for multiple kitchens
	•	Admin dashboard for order and menu management
	•	Payment gateway integration
	•	Analytics and reporting
	•	Role-based access control (RBAC)
	•	Cloud deployment pipelines (CI/CD)

📁 Project Structure

frontend/
 ├─ src/
 │  ├─ app/          # Pages & API routes
 │  ├─ lib/          # Models, database, utilities
 │  └─ components/  # Reusable UI components
 ├─ scripts/         # Database seeding
 └─ public/          # Static assets