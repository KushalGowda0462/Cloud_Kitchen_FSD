# Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- Docker and Docker Compose installed

## Steps

1. **Start MongoDB using Docker (from root directory):**
   ```bash
   # From the root directory (where docker-compose.yml is located)
   docker compose up -d
   ```
   
   This will start:
   - MongoDB on port 27017
   - Mongo Express (web UI) on http://localhost:8083

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:**
   Copy `.env.example` from root to `.env.local` in frontend:
   ```bash
   cp ../.env.example .env.local
   ```
   
   Or create `.env.local` manually in the frontend directory:
   ```env
   MONGODB_URI=mongodb://admin:adminpassword@localhost:27017/cloudkitchen?authSource=admin
   ```

5. **Verify MongoDB connection:**
   After starting the dev server, visit:
   ```
   http://localhost:3000/api/health
   ```
   Should return: `{"ok":true,"db":"connected"}`

6. **Seed the database:**
   ```bash
   npm run seed
   ```
   This will create 30+ sample dishes across multiple cuisines.

7. **Start the development server:**
   ```bash
   npm run dev
   ```

8. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Docker Commands

**Note:** All Docker commands should be run from the root directory where `docker-compose.yml` is located.

**Start MongoDB:**
```bash
# From root directory
docker compose up -d
```

**View logs:**
```bash
# From root directory
docker compose logs -f mongodb
```

**Stop MongoDB:**
```bash
# From root directory
docker compose down
```

**Reset database (delete all data):**
```bash
# From root directory
docker compose down -v
```

**Access Mongo Express:**
- URL: http://localhost:8083
- Username: `admin`
- Password: `adminpassword`

## Testing the Application

1. **Browse Menu**: Go to `/order` and use the category dropdown and veg/non-veg toggle to filter dishes
2. **Add to Cart**: Click "Add to Cart" on any dish - you'll see a toast notification
3. **View Cart**: Click the cart icon in the top-right corner
4. **Checkout**: Click "Proceed to Order" and complete the 3-step checkout process
5. **Order Success**: After placing an order, you'll be redirected to the success page with your order ID

## Features to Test

- ✅ Category dropdown with nested cuisine/category selection
- ✅ Real-time dish filtering
- ✅ Veg/Non-Veg toggle
- ✅ Cart persistence (refresh the page - cart items remain)
- ✅ Cart badge updates in real-time
- ✅ Checkout stepper (Address → Payment → Review)
- ✅ Order placement and MongoDB storage
- ✅ Contact form submission
- ✅ Health check endpoint at `/api/health`

## Troubleshooting

- **MongoDB Connection Error**: 
  - Make sure Docker is running: `docker ps`
  - Check MongoDB container (from root directory): `docker compose logs mongodb`
  - Verify `.env.local` in frontend directory has the correct connection string
  
- **Port Already in Use**: 
  - Stop any existing MongoDB instances
  - Change ports in `docker-compose.yml` (in root directory) if needed
  
- **Seed Script Fails**: 
  - Ensure MongoDB container is running (from root): `docker compose ps`
  - Check connection string in `.env.local` (in frontend directory)
  - Verify database name matches: `cloudkitchen`
  
- **Docker Compose Not Found**: 
  - Make sure you're running docker commands from the root directory where `docker-compose.yml` is located
  
- **Build Errors**: 
  - Run `npm run lint` to check for TypeScript errors
  - Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
