# CloudKitchen - Cloud Kitchen Ordering Platform

A modern, customer-facing web application for a cloud kitchen ordering platform. Built with Next.js 14+ and featuring a beautiful single-page scrolling design with seamless video backgrounds, decorative food imagery, and a complete ordering system.

## 🚀 Features

### Marketing Pages
- **Single-Page Scrolling Layout**: Smooth navigation between Home, About Us, How it Works, and Contact sections
- **Hero Section**: Dynamic video background with seamless transitions between multiple videos
- **About Us**: Company story, mission, values, and "Why Choose Us" sections
- **How it Works**: 3-step process explanation with background imagery and glassmorphism effects
- **Contact Form**: Functional contact form with validation and MongoDB storage

### Ordering System
- **Category Filtering**: Nested dropdown with cuisines (Indian, Chinese, Italian, Mexican, Arabian, Desserts) and categories (Starters, Main Course)
- **Veg/Non-Veg Toggle**: Real-time filtering with visual indicators
- **Dish Grid**: Responsive grid displaying dishes with images, prices, descriptions, and dietary badges
- **Shopping Cart**: Persistent cart using localStorage with real-time updates
- **Checkout Flow**: 3-step checkout process (Delivery Address → Payment → Review & Place Order)
- **Order Management**: Complete order placement with MongoDB storage

### Technical Features
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Form Validation**: react-hook-form + zod for robust form handling
- **Toast Notifications**: sonner for user feedback
- **State Management**: React Context + useReducer for cart management
- **Database**: MongoDB with Mongoose for data persistence
- **Docker Support**: Local MongoDB instance with Mongo Express UI

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: MongoDB with Mongoose
- **Forms**: react-hook-form + zod
- **Icons**: lucide-react
- **Toasts**: sonner
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
FSD/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App Router pages and API routes
│   │   │   ├── page.tsx     # Home page (single-page scrolling)
│   │   │   ├── order/       # Order page
│   │   │   ├── cart/        # Cart page
│   │   │   ├── checkout/    # Checkout page
│   │   │   ├── order-success/ # Order success page
│   │   │   └── api/         # API routes
│   │   ├── components/      # React components
│   │   │   ├── layout/      # Navbar, Footer
│   │   │   ├── order/       # Order-related components
│   │   │   ├── cart/        # Cart components
│   │   │   ├── checkout/    # Checkout components
│   │   │   └── decor/       # Decorative components
│   │   ├── context/         # React Context providers
│   │   ├── lib/             # Utilities and database
│   │   │   ├── db.ts        # MongoDB connection
│   │   │   └── models/      # Mongoose models
│   │   └── utils/           # Helper functions
│   ├── public/              # Static assets
│   │   ├── images/          # Images and GIFs
│   │   └── videos/          # Video backgrounds
│   ├── scripts/             # Utility scripts
│   │   └── seed.ts          # Database seeding script
│   └── package.json
├── docker-compose.yml       # Docker services configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose (for local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FSD
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example frontend/.env.local
   ```
   
   The `.env.local` file should contain:
   ```env
   MONGODB_URI=mongodb://admin:adminpassword@localhost:27017/cloudkitchen?authSource=admin
   ```

3. **Start MongoDB with Docker**
   ```bash
   docker compose up -d
   ```
   
   This starts:
   - MongoDB on port `27017`
   - Mongo Express UI on port `8083` (http://localhost:8083)
   - Credentials: `admin` / `adminpassword`

4. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Commands

### Start Services
```bash
docker compose up -d
```

### View Logs
```bash
docker compose logs -f mongodb
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
- URL: http://localhost:8083
- Username: `admin`
- Password: `adminpassword`
- Database: `cloudkitchen`

## 📡 API Endpoints

### GET `/api/dishes`
Fetch all available dishes with optional filters.

**Query Parameters:**
- `cuisine` (optional): Filter by cuisine
- `category` (optional): Filter by category
- `vegMode` (optional): `all` | `veg` | `nonveg`

**Response:**
```json
[
  {
    "_id": "...",
    "name": "Dish Name",
    "cuisine": "Indian",
    "category": "Starters",
    "isVeg": true,
    "price": 250,
    "imageUrl": "...",
    "description": "...",
    "isAvailable": true
  }
]
```

### POST `/api/orders`
Create a new order.

**Request Body:**
```json
{
  "items": [
    { "dishId": "...", "qty": 2 }
  ],
  "address": {
    "fullName": "John Doe",
    "phone": "+91 1234567890",
    "line1": "123 Street",
    "line2": "Apt 4B",
    "city": "City",
    "pincode": "560001"
  },
  "paymentMethod": "UPI"
}
```

**Response:**
```json
{
  "orderId": "..."
}
```

### POST `/api/contact`
Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "ok": true
}
```

### GET `/api/health`
Check MongoDB connection status.

**Response:**
```json
{
  "ok": true,
  "db": "connected"
}
```

## 🗄️ Database Models

### Dish
- `name`: string
- `cuisine`: string
- `category`: string
- `isVeg`: boolean
- `price`: number
- `imageUrl`: string
- `description`: string
- `isAvailable`: boolean (default: true)
- `timestamps`: createdAt, updatedAt

### Order
- `items`: Array of { dishId, name, price, qty, isVeg }
- `totals`: { subtotal, tax, deliveryFee, grandTotal }
- `address`: { fullName, phone, line1, line2?, city, pincode }
- `paymentMethod`: "UPI" | "CARD" | "COD"
- `status`: "PLACED" | "CONFIRMED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" (default: "PLACED")
- `timestamps`: createdAt, updatedAt

### Contact
- `name`: string
- `email`: string
- `phone`: string (optional)
- `message`: string
- `timestamps`: createdAt, updatedAt

## 🎨 Key Features & Design

### Single-Page Scrolling
- Smooth scroll navigation between sections
- Active section highlighting in navbar
- Hash-based routing for direct section access

### Video Background
- Seamless transitions between multiple videos
- Crossfade animations
- Looping playback

### Decorative Elements
- Floating food images with transparent PNG cutouts
- Glassmorphism effects on key sections
- Responsive image placement

### Cart System
- Persistent cart using localStorage
- Real-time quantity updates
- Badge showing item count in navbar

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start Next.js dev server

# Database
npm run seed         # Seed database with sample dishes

# Build
npm run build        # Build for production
npm start            # Start production server
```

## 🔧 Configuration

### MongoDB Connection
- **Local Docker**: `mongodb://admin:adminpassword@localhost:27017/cloudkitchen?authSource=admin`
- **Inter-container**: Use `mongodb` as hostname instead of `localhost`

### Environment Variables
See `.env.example` for required variables.

## 📄 License

This project is part of an academic project.

## 👥 Contributors

Built as part of M.Tech Projects coursework.

---

For detailed setup instructions, see `frontend/README.md` and `frontend/SETUP.md`.

