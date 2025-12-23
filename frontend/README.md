# CloudKitchen - Customer Ordering Platform

A modern cloud kitchen ordering platform built with Next.js 14+, TypeScript, TailwindCSS, and MongoDB.

## Features

- 🍽️ **Browse Menu**: Filter dishes by cuisine, category, and dietary preferences (Veg/Non-Veg)
- 🛒 **Shopping Cart**: Add items, adjust quantities, and manage your order
- 💳 **Checkout**: Multi-step checkout process with address and payment selection
- 📦 **Order Management**: Place orders and track order status
- 📧 **Contact Form**: Reach out to us with any questions or feedback

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: MongoDB with Mongoose
- **Forms**: react-hook-form + zod
- **Toasts**: sonner
- **Icons**: lucide-react
- **State Management**: React Context + useReducer

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed (for local MongoDB)

### Installation

1. Clone the repository and navigate to the root directory:
```bash
cd FSD
```

2. Start MongoDB using Docker Compose (from root directory):
```bash
docker compose up -d
```

3. Navigate to the frontend directory:
```bash
cd frontend
```

4. Install dependencies:
```bash
npm install
```

5. Set up environment variables:
   - Copy `.env.example` from root to `.env.local` in frontend:
   ```bash
   cp ../.env.example .env.local
   ```
   - Or create `.env.local` manually in the frontend directory with:
   ```env
   MONGODB_URI=mongodb://admin:adminpassword@localhost:27017/cloudkitchen?authSource=admin
   ```

5. Seed the database with sample dishes:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Local MongoDB (Docker)

This project includes a Docker Compose setup for running MongoDB locally with persistent data storage. The `docker-compose.yml` file is located in the root directory.

### Quick Start

**Start MongoDB (from root directory):**
```bash
docker compose up -d
```

**View MongoDB logs:**
```bash
docker compose logs -f mongodb
```

**Stop MongoDB:**
```bash
docker compose down
```

**Reset Database (delete all data):**
```bash
docker compose down -v
```

**Note:** All Docker commands should be run from the root directory where `docker-compose.yml` is located.

### MongoDB Details

- **Connection String**: `mongodb://admin:adminpassword@localhost:27017/cloudkitchen?authSource=admin`
- **Database Name**: `cloudkitchen`
- **Username**: `admin`
- **Password**: `adminpassword`
- **Port**: `27017`

### Mongo Express (Web UI)

Mongo Express is included for easy database management:

- **URL**: http://localhost:8083
- **Username**: `admin`
- **Password**: `adminpassword`

Access Mongo Express in your browser to view and manage your MongoDB data.

### Health Check

Test the MongoDB connection:
```bash
curl http://localhost:3000/api/health
```

Or visit http://localhost:3000/api/health in your browser.

### Docker Services

- **mongodb**: MongoDB 7 instance with persistent volume
- **mongo-express**: Web-based MongoDB admin interface

### Notes

- Data persists in a Docker volume named `mongo_data`
- When connecting from within Docker containers, use hostname `mongodb` instead of `localhost`
- The MongoDB container includes health checks to ensure it's ready before starting dependent services

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/             # API routes
│   │   ├── about/           # About page
│   │   ├── cart/            # Cart page
│   │   ├── checkout/        # Checkout page
│   │   ├── contact/         # Contact page
│   │   ├── how-it-works/    # How it works page
│   │   ├── order/           # Order page
│   │   └── order-success/   # Order success page
│   ├── components/          # React components
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   ├── order/           # Order page components
│   │   ├── cart/            # Cart components
│   │   └── checkout/        # Checkout components
│   ├── context/             # React Context providers
│   ├── lib/                 # Utilities and models
│   │   ├── models/          # Mongoose models
│   │   └── db.ts            # MongoDB connection
│   └── utils/               # Utility functions
├── scripts/
│   └── seed.ts              # Database seeding script
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with sample dishes

## Pages

- **Home** (`/`) - Landing page with hero section and features
- **About Us** (`/about`) - Company information and values
- **How it Works** (`/how-it-works`) - Step-by-step ordering process
- **Contact Us** (`/contact`) - Contact form and information
- **Place your order** (`/order`) - Browse and filter dishes
- **Cart** (`/cart`) - Review cart items and proceed to checkout
- **Checkout** (`/checkout`) - Multi-step checkout process
- **Order Success** (`/order-success`) - Order confirmation page

## API Routes

- `GET /api/health` - Health check endpoint to verify MongoDB connection
- `GET /api/dishes` - Fetch dishes with optional filters (cuisine, category, vegMode)
- `POST /api/orders` - Create a new order
- `POST /api/contact` - Submit contact form

## Database Models

- **Dish**: Menu items with cuisine, category, price, and availability
- **Order**: Customer orders with items, totals, address, and payment info
- **Contact**: Contact form submissions

## Features in Detail

### Order Page
- Category dropdown with nested cuisine and category selection
- Real-time dish filtering
- Veg/Non-Veg toggle
- Cart button with item count badge
- Skeleton loaders for better UX

### Cart
- Persistent cart using localStorage
- Quantity controls
- Remove items
- Order summary with tax and delivery fee calculation
- Free delivery above ₹500

### Checkout
- 3-step stepper (Address → Payment → Review)
- Form validation with zod
- Multiple payment options (UPI, Card, COD)
- Order summary sidebar

## Notes

- Cart persists across page refreshes using localStorage
- All images use placeholder URLs - replace with actual images in production
- Payment processing is mocked - integrate with payment gateway for production
- Free delivery threshold is ₹500

## License

This project is private and proprietary.
