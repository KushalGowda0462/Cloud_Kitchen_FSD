# Thindi Potha - Cloud Kitchen Ordering Platform

A modern, customer-facing web application for a cloud kitchen ordering platform. Built with Next.js 14+ (App Router), featuring a beautiful single-page scrolling design with seamless video backgrounds, decorative food imagery, and a complete ordering system with authentication, menu management, and order processing.

## 🚀 Features

### Marketing Pages
- **Single-Page Scrolling Layout**: Smooth navigation between Home, About Us, How it Works, and Contact sections
- **Hero Section**: Dynamic video background with seamless transitions between multiple videos
- **About Us**: Company story, mission, values, and "Why Choose Us" sections with decorative food imagery
- **How it Works**: 3-step process explanation with background imagery and glassmorphism effects
- **Contact Form**: Functional contact form with validation and MongoDB storage

### Ordering System
- **Category Filtering**: Nested dropdown with cuisines (Indian, Chinese, Italian, Mexican, Arabian, Desserts) and categories (Starters, Main Course)
- **Veg/Non-Veg Toggle**: Real-time filtering with visual indicators (green for veg, red for non-veg)
- **Dish Grid**: Responsive grid displaying dishes with images, prices, descriptions, and dietary badges
- **Shopping Cart**: Persistent cart using localStorage with real-time updates and item count badge
- **Checkout Flow**: 3-step checkout process (Delivery Address → Payment → Review & Place Order)
- **Order Management**: Complete order placement with MongoDB storage and order tracking

### Authentication
- **User Signup/Login**: Secure authentication with bcrypt password hashing and JWT tokens
- **Session Management**: Persistent sessions using sessionStorage
- **Role-Based Access**: Customer and Admin roles (admin features can be extended)

### Menu Management
- **Seeded Database**: High-quality dishes with Unsplash images pre-loaded in MongoDB
- **Category Isolation**: Unique indexing prevents dish duplication across categories
- **Real-time Updates**: Menu updates automatically when filters are applied
- **Reliable Data**: No external API dependencies, consistent menu availability

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16.1.0 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: TailwindCSS 4
- **UI Components**: 
  - lucide-react (Icons)
  - sonner (Toast notifications)
  - react-hook-form + zod (Form validation)
- **State Management**: React Context + useReducer

### Backend (Next.js API Routes)
- **Runtime**: Node.js (via Next.js)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: Zod schemas
- **Image Hosting**: Unsplash (static URLs)

### Infrastructure
- **Database**: MongoDB 7 (Docker)
- **Database UI**: Mongo Express (Port 8083)
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
FSD/
├── frontend/                      # Next.js application
│   ├── src/
│   │   ├── app/                  # App Router pages and API routes
│   │   │   ├── page.tsx          # Home page (single-page scrolling)
│   │   │   ├── about/            # About Us page
│   │   │   ├── how-it-works/     # How it Works page
│   │   │   ├── contact/          # Contact page
│   │   │   ├── login/            # Login/Signup page
│   │   │   ├── order/            # Order page (menu browsing)
│   │   │   ├── cart/             # Cart page
│   │   │   ├── checkout/         # Checkout page
│   │   │   ├── order-success/    # Order success page
│   │   │   ├── my-orders/        # User orders page
│   │   │   ├── admin/            # Admin pages
│   │   │   │   ├── login/        # Admin login
│   │   │   │   └── orders/       # Admin orders view
│   │   │   └── api/              # API routes
│   │   │       ├── auth/         # Authentication routes
│   │   │       │   ├── signup/   # POST - User registration
│   │   │       │   ├── login/    # POST - User login
│   │   │       │   └── register/ # POST - Alternative registration
│   │   │       ├── menu/         # Menu API
│   │   │       │   └── route.ts  # GET - Fetch dishes with filters
│   │   │       ├── dishes/       # Legacy dishes API
│   │   │       ├── orders/       # Order management
│   │   │       │   ├── route.ts  # POST - Create order
│   │   │       │   └── my/       # GET - User's orders
│   │   │       ├── contact/      # POST - Contact form
│   │   │       ├── health/       # GET - Health check
│   │   │       └── admin/        # Admin endpoints
│   │   │           ├── seed/     # POST - Seed dishes (dev only)
│   │   │           ├── summary/   # GET - Admin dashboard stats
│   │   │           └── reset/     # POST - Reset database (dev only)
│   │   ├── components/           # React components
│   │   │   ├── layout/           # Navbar, Footer
│   │   │   ├── order/            # CategoryDropdown, VegToggle, DishCard
│   │   │   ├── cart/             # CartItemRow, CartSummary
│   │   │   ├── checkout/         # CheckoutStepper, AddressForm
│   │   │   └── decor/            # FloatingFood (decorative images)
│   │   ├── context/              # React Context providers
│   │   │   └── CartContext.tsx   # Cart state management
│   │   ├── lib/                  # Utilities and database
│   │   │   ├── db.ts             # MongoDB connection
│   │   │   ├── models/           # Mongoose models
│   │   │   │   ├── User.ts       # User model
│   │   │   │   ├── Dish.ts       # Dish model
│   │   │   │   ├── Order.ts      # Order model
│   │   │   │   └── Contact.ts    # Contact model
│   │   │   └── utils/            # Utility functions
│   │   │       └── jwt.ts        # JWT token generation/verification
│   │   └── utils/                # Helper functions
│   ├── public/                   # Static assets
│   │   ├── images/               # Images and GIFs
│   │   └── videos/               # Video backgrounds
│   ├── scripts/                  # Utility scripts
│   │   └── seed.ts               # Database seeding script
│   └── package.json
├── docker-compose.yml            # Docker services configuration
├── .env.example                 # Environment variables template
├── README.md                    # This file
├── PORTS.md                     # Port configuration documentation
└── docker-compose.yml           # Docker services configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18+ (recommended: 20+)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FSD
   ```

2. **Set up environment variables**
   ```bash
   cd frontend
   cp .env.example .env.local
   ```
   
   Edit `frontend/.env.local` and add:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/cloudkitchen
   
   # JWT Secret (change in production)
   JWT_SECRET=your-secret-key-change-in-production
   ```

3. **Start MongoDB with Docker**
   ```bash
   # From project root
   docker compose up -d
   ```
   
   This starts:
   - **MongoDB** on port `27017`
   - **Mongo Express UI** on port `8083` (http://localhost:8083)
   - No authentication required (simplified for development)

4. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

5. **Seed the database** (required - populates dishes)
   ```bash
   # From frontend directory
   npx ts-node scripts/seed.ts
   ```
   
   This will:
   - Clear existing dishes and users
   - Insert 11 pre-configured dishes with Unsplash images
   - Cover Indian, Chinese, Italian cuisines and Desserts

6. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The server will start on **http://localhost:8081** (port 8081 is locked)

7. **Open your browser**
   Navigate to [http://localhost:8081](http://localhost:8081)

## 🐳 Docker Commands

### Start Services
```bash
docker compose up -d
```

### View Logs
```bash
# MongoDB logs
docker compose logs -f cloudkitchen_mongo

# Mongo Express logs
docker compose logs -f cloudkitchen_mongo_express
```

### Stop Services
```bash
docker compose down
```

### Reset Database (Delete Volume)
```bash
docker compose down -v
```

### Access Mongo Express
- **URL**: http://localhost:8083
- **Database**: `cloudkitchen`
- **No authentication** (development mode)

## 📡 API Endpoints

### Authentication

#### `POST /api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "ok": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "customer"
  }
}
```

**Response (Error):**
```json
{
  "ok": false,
  "error": "Email already registered",
  "code": "EMAIL_EXISTS"
}
```

**Status Codes:**
- `200` - Success
- `400` - Validation error
- `409` - Email already exists
- `500` - Server error

---

#### `POST /api/auth/login`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "ok": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "customer"
  }
}
```

**Response (Error):**
```json
{
  "ok": false,
  "error": "Invalid credentials",
  "code": "INVALID_CREDENTIALS"
}
```

**Status Codes:**
- `200` - Success
- `400` - Missing credentials
- `401` - Invalid credentials
- `500` - Server error

---

### Menu & Dishes

#### `GET /api/menu`
Fetch dishes with optional filters from MongoDB.

**Query Parameters:**
- `cuisineKey` (optional): `indian` | `chinese` | `italian` | `mexican` | `arabian` | `desserts` | `all`
- `categoryKey` (optional): `starters` | `main-course` | `desserts` | `all`
- `vegMode` (optional): `all` | `veg` | `nonveg` (default: `all`)

**Examples:**
```
GET /api/menu                                    # All dishes
GET /api/menu?vegMode=veg                        # All vegetarian dishes
GET /api/menu?cuisineKey=indian&categoryKey=starters  # Indian starters
GET /api/menu?categoryKey=desserts               # All desserts
```

**Response (Success):**
```json
{
  "ok": true,
  "count": 15,
  "dishes": [
    {
      "id": "dish-id",
      "name": "Butter Chicken",
      "imageUrl": "https://...",
      "cuisineKey": "indian",
      "categoryKey": "main-course",
      "isVeg": false,
      "price": 320,
      "description": "Butter Chicken (main_course)"
    }
  ]
}
```

**Response (Error):**
```json
{
  "ok": false,
  "error": "Invalid cuisineKey"
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid parameters
- `500` - Server error or missing env vars

**Data Source:**
- All dishes are pre-seeded in MongoDB using `scripts/seed.ts`
- No external API calls - reliable and fast
- Images served from Unsplash CDN

---


---

### Orders

#### `POST /api/orders`
Create a new order.

**Request Body:**
```json
{
  "items": [
    {
      "dishId": "dish-id-1",
      "qty": 2
    },
    {
      "dishId": "dish-id-2",
      "qty": 1
    }
  ],
  "address": {
    "fullName": "John Doe",
    "phone": "+91 1234567890",
    "line1": "123 Main Street",
    "line2": "Apt 4B",
    "city": "Bangalore",
    "pincode": "560001"
  },
  "paymentMethod": "UPI",
  "userId": "user-id" (optional),
  "userName": "John Doe" (optional),
  "userEmail": "john@example.com" (optional)
}
```

**Response (Success):**
```json
{
  "orderId": "order-id"
}
```

**Response (Error):**
```json
{
  "error": "Some dishes not found"
}
```

**Status Codes:**
- `200` - Success
- `400` - Validation error or dishes not found
- `500` - Server error

**Order Calculation:**
- Subtotal: Sum of (price × quantity) for all items
- Tax: 5% of subtotal
- Delivery Fee: ₹50 (free if subtotal > ₹500)
- Grand Total: Subtotal + Tax + Delivery Fee

---

#### `GET /api/orders/my`
Get orders for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
[
  {
    "_id": "order-id",
    "items": [...],
    "totals": {...},
    "address": {...},
    "paymentMethod": "UPI",
    "status": "PLACED",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Contact

#### `POST /api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890" (optional),
  "message": "Your message here"
}
```

**Response:**
```json
{
  "ok": true
}
```

---

### Health & Admin

#### `GET /api/health`
Check system health and environment configuration.

**Response:**
```json
{
  "mongoConnected": true,
  "mongoUriPresent": true,
  "rapidKeyPresent": true,
  "rapidHostPresent": true,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

**Note:** Database seeding is done via the `scripts/seed.ts` script, not through an API endpoint.

---

#### `GET /api/admin/summary` (Admin Only)
Get admin dashboard statistics.

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

**Response:**
```json
{
  "totalOrders": 150,
  "totalCustomers": 45,
  "ordersPerCustomer": 3.33,
  "topDishes": [...],
  "topCuisines": [...]
}
```

---

## 🗄️ Database Models

### User
```typescript
{
  email: string (unique, lowercase, required)
  passwordHash: string (required, bcrypt hashed)
  role: 'customer' | 'admin' (default: 'customer')
  createdAt: Date
  updatedAt: Date
}
```

**Indexes:**
- Unique index on `email`

---

### Dish
```typescript
{
  source: string (default: 'manual')
  sourceId: string (required, unique per cuisine+category)
  name: string (required)
  imageUrl: string (required, full HTTPS URL from Unsplash)
  cuisineKey: string (required, enum: 'indian' | 'chinese' | 'italian' | 'mexican' | 'arabian' | 'desserts')
  categoryKey: string (required, enum: 'starters' | 'main-course' | 'desserts')
  isVeg: boolean (required)
  price: number (required)
  description: string (optional)
  cacheKey: string (unique, composite of source:sourceId:cuisineKey:categoryKey)
  createdAt: Date
  updatedAt: Date
}
```

**Indexes:**
- Unique index on `cacheKey` (composite of source:sourceId:cuisineKey:categoryKey)
  - Prevents same dish from appearing in multiple categories
- Query index: `{ cuisineKey: 1, categoryKey: 1, isVeg: 1 }`

**Key Rules:**
- Same `sourceId` can exist for different `cuisineKey` + `categoryKey` combinations
- Ensures category isolation (no duplicates across categories)
- All dishes are manually seeded with high-quality Unsplash images

---

### Order
```typescript
{
  userId: ObjectId (optional, ref: User)
  userName: string (optional)
  userEmail: string (optional)
  items: [
    {
      dishId: ObjectId (ref: Dish)
      name: string
      price: number
      qty: number
      isVeg: boolean
    }
  ]
  totals: {
    subtotal: number
    tax: number
    deliveryFee: number
    grandTotal: number
  }
  address: {
    fullName: string
    phone: string
    line1: string
    line2?: string
    city: string
    pincode: string
  }
  paymentMethod: 'UPI' | 'CARD' | 'COD'
  status: 'PLACED' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' (default: 'PLACED')
  createdAt: Date
  updatedAt: Date
}
```

---

### Contact
```typescript
{
  name: string (required)
  email: string (required, email format)
  phone: string (optional)
  message: string (required)
  createdAt: Date
  updatedAt: Date
}
```

---

## 🎨 Key Features & Design

### Single-Page Scrolling
- Smooth scroll navigation between sections
- Active section highlighting in navbar
- Hash-based routing for direct section access (`/#about`, `/#how-it-works`, `/#contact`)

### Video Background
- Seamless transitions between multiple videos
- Crossfade animations
- Looping playback
- Videos located in `public/videos/`

### Decorative Elements
- Floating food images with transparent PNG cutouts
- Glassmorphism effects on key sections
- Responsive image placement
- Images positioned absolutely (not in content flow)

### Cart System
- Persistent cart using localStorage
- Real-time quantity updates
- Badge showing item count in navbar
- Cart persists across page refreshes

### Menu Filtering
- **Cuisines**: Indian, Chinese, Italian, Mexican, Arabian, Desserts
- **Categories**: Starters, Main Course, Desserts
- **Veg/Non-Veg Toggle**: Independent filter
- **Clear Filters**: Resets to show all dishes
- **Seeded Data**: All dishes pre-loaded in MongoDB for reliable access

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start Next.js dev server on port 8081

# Build
npm run build        # Build for production
npm start            # Start production server on port 8081

# Database
npm run seed         # Seed database with sample dishes (if script exists)

# Linting
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Port Configuration
- **Frontend**: Port `8081` (locked, no auto-switch)
- **MongoDB**: Port `27017`
- **Mongo Express**: Port `8083`

See `PORTS.md` for complete port documentation.

### Environment Variables

**Required:**
```env
MONGODB_URI=mongodb://localhost:27017/cloudkitchen
JWT_SECRET=your-secret-key-change-in-production
```

**Validation:**
- All API routes validate required env vars
- Returns clear error messages if missing
- Status 500 with descriptive error

### MongoDB Connection
- **Local Development**: `mongodb://localhost:27017/cloudkitchen`
- **Docker Inter-container**: Use `mongodb` as hostname (not `localhost`)
- **No Authentication**: Simplified for development (no auth required)

## 🔐 Authentication Flow

1. **Signup**: User creates account → Password hashed with bcrypt → JWT token generated → Stored in sessionStorage
2. **Login**: User enters credentials → Password verified with bcrypt → JWT token generated → Stored in sessionStorage
3. **Session**: Token stored in `sessionStorage` as `token`, user info as `user`
4. **Protected Routes**: Check for token in sessionStorage (can be extended with middleware)

## 🍽️ Menu System

### Cuisine & Category Structure
```
Indian
  ├── Starters
  └── Main Course
Chinese
  ├── Starters
  └── Main Course
Italian
  ├── Starters
  └── Main Course
Mexican
  ├── Starters
  └── Main Course
Arabian
  ├── Starters
  └── Main Course
Desserts (standalone, no cuisine)
```

### Database Seeding
- **Source**: Pre-configured dishes with Unsplash images
- **Seed Script**: `frontend/scripts/seed.ts`
- **Coverage**: Indian, Chinese, Italian cuisines + Desserts
- **Images**: High-quality Unsplash URLs (no external API dependencies)
- **Deduplication**: Unique `cacheKey` prevents dish duplication across categories

### Filtering Logic
- **Default (no filter)**: Shows ALL dishes (respects veg/non-veg toggle)
- **With filters**: Shows ONLY dishes matching exact `cuisineKey` + `categoryKey`
- **Veg/Non-veg**: Works independently of cuisine/category filters
- **Clear Filters**: Resets to show all dishes

## 🧪 Testing & Verification

### Health Check
```bash
curl http://localhost:8081/api/health
```

### Seed Database
```bash
cd frontend
npx ts-node scripts/seed.ts
```

### Test Authentication
```bash
# Signup
curl -X POST http://localhost:8081/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Menu API
```bash
# All dishes
curl http://localhost:8081/api/menu

# Indian starters
curl "http://localhost:8081/api/menu?cuisineKey=indian&categoryKey=starters"

# Vegetarian dishes only
curl "http://localhost:8081/api/menu?vegMode=veg"
```

## 📚 Additional Documentation

- **FIXES_SUMMARY.md**: Recent bug fixes and improvements
- **PORTS.md**: Port configuration and conflict management
- **frontend/README.md**: Frontend-specific documentation

## 🐛 Troubleshooting

### "Failed to fetch menu"
- Verify MongoDB is running: `docker ps`
- Check if database is seeded: Run `npx ts-node scripts/seed.ts`
- Check server console for detailed error logs

### "Failed to create account"
- Check MongoDB connection
- Verify email is not already registered
- Check server console for `[AUTH_REGISTER]` logs

### "No dishes found"
- Run seed script: `npx ts-node scripts/seed.ts` from frontend directory
- Verify MongoDB has dishes: Use Mongo Express UI (http://localhost:8083)
- Check MongoDB connection string in `.env.local`

### Port Conflicts
- Frontend port 8081 is locked
- If port is in use, stop the conflicting service
- See `PORTS.md` for port assignments

## 📄 License

This project is part of an academic project (M.Tech Projects coursework).

## 👥 Contributors

Built as part of M.Tech Projects coursework.

---

## 🎯 Quick Reference

### URLs
- **Frontend**: http://localhost:8081
- **Mongo Express**: http://localhost:8083
- **Health Check**: http://localhost:8081/api/health

### Key Files
- **MongoDB Connection**: `frontend/src/lib/db.ts`
- **Menu API**: `frontend/src/app/api/menu/route.ts`
- **Auth Routes**: `frontend/src/app/api/auth/*`
- **Dish Model**: `frontend/src/lib/models/Dish.ts`
- **Seed Script**: `frontend/scripts/seed.ts`
- **Category Normalizer**: `frontend/src/lib/utils/categoryNormalizer.ts`

### Server Logging Prefixes
- `[AUTH_REGISTER]` - Signup operations
- `[AUTH_LOGIN]` - Login operations
- `[API]` - Menu API operations
- `[SEED]` - Seed operations

---

**For port configuration details, see `PORTS.md`.**
