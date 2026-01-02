# Thindi Potha - Backend Implementation Summary

## ✅ Implementation Complete

All backend logic has been implemented using Next.js API routes (no separate Express server).

## 📁 File Structure

```
frontend/src/
├── app/api/
│   ├── auth/
│   │   ├── signup/route.ts      ✅ JWT + bcrypt signup
│   │   └── login/route.ts       ✅ JWT + bcrypt login
│   ├── dishes/route.ts          ✅ GET with filters (cuisine, category, vegMode)
│   ├── orders/
│   │   ├── route.ts             ✅ POST (auth required, stores cuisine/category)
│   │   └── my/route.ts          ✅ GET user orders (auth required)
│   ├── admin/
│   │   └── summary/route.ts     ✅ GET admin analytics (admin only)
│   └── health/route.ts          ✅ GET health check
├── lib/
│   ├── db.ts                    ✅ Cached MongoDB connection
│   ├── auth.ts                  ✅ JWT auth helpers
│   ├── models/
│   │   ├── User.ts             ✅ email, passwordHash, role
│   │   ├── Dish.ts             ✅ Menu items
│   │   └── Order.ts            ✅ Orders with cuisine/category in items
│   └── utils/
│       ├── jwt.ts              ✅ JWT generation/verification
│       └── totals.ts           ✅ Order totals calculation
└── scripts/
    └── seed.ts                 ✅ Seeds 30+ dishes + admin user
```

## 🔐 Authentication

- **JWT-based**: Tokens passed via `Authorization: Bearer <token>` header
- **Password hashing**: bcrypt with 10 rounds
- **Routes**:
  - `POST /api/auth/signup` - Register new customer
  - `POST /api/auth/login` - Login and get JWT token

**Response format:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "customer" | "admin"
  }
}
```

## 🍽️ Dishes API

**GET /api/dishes**

Query parameters:
- `cuisine` (optional): Filter by cuisine
- `category` (optional): Filter by category
- `vegMode` (optional): `all` | `veg` | `nonveg` (default: `all`)

**Image Path Rule**: All dish images must use `/assets/menu/<filename>.png` format
- Images stored in: `frontend/public/assets/menu/`
- No spaces in filenames
- No external URLs

## 🛒 Orders API

**POST /api/orders** (Auth required)

Request body:
```json
{
  "items": [
    { "dishId": "dish_id", "qty": 2 }
  ],
  "address": {
    "fullName": "John Doe",
    "phone": "1234567890",
    "line1": "123 Main St",
    "line2": "Apt 4B",
    "city": "City",
    "pincode": "123456"
  },
  "paymentMethod": "COD" | "UPI" | "CARD"
}
```

**Features:**
- Fetches dish details from DB
- Stores full dish snapshot (name, cuisine, category, price, isVeg) in order items
- Calculates totals (subtotal, 5% tax, delivery fee)
- Links order to authenticated user via `userId`

**GET /api/orders/my** (Auth required)

Returns all orders for the authenticated user.

## 👨‍💼 Admin API

**GET /api/admin/summary** (Admin only)

Returns:
- `totalOrders`: Total number of orders
- `totalCustomers`: Total number of customer accounts
- `ordersPerCustomer`: Top 10 customers by order count
- `topDishes`: Top 10 dishes by quantity sold
- `topCuisines`: Top 10 cuisines by quantity sold

Uses MongoDB aggregation pipelines for efficient queries.

## 🌱 Database Seeding

**Seed script**: `frontend/scripts/seed.ts`

**Creates:**
- 30+ dishes across multiple cuisines (Indian, Chinese, Italian, Mexican, Arabian, Desserts)
- 1 admin user:
  - Email: `admin@thindipotha.com`
  - Password: `admin123`
  - Role: `admin`

**Run seeding:**
```bash
cd frontend
npm run seed
```

## 🔧 Environment Variables

Required in `frontend/.env.local`:

```env
MONGODB_URI=mongodb://admin:adminpassword@localhost:27017/cloudkitchen?authSource=admin
JWT_SECRET=your-secret-key-change-in-production
```

**Note**: `JWT_SECRET` defaults to `thindi-potha-secret-key-change-in-production` if not set (change in production!)

## 🚀 API Endpoints Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register new customer |
| POST | `/api/auth/login` | No | Login and get JWT |
| GET | `/api/dishes` | No | Get dishes (with filters) |
| POST | `/api/orders` | Yes | Create new order |
| GET | `/api/orders/my` | Yes | Get user's orders |
| GET | `/api/admin/summary` | Admin | Get admin analytics |
| GET | `/api/health` | No | Health check |

## 📝 Key Features

1. ✅ **No separate backend server** - All logic in Next.js API routes
2. ✅ **JWT authentication** - Stateless, secure auth
3. ✅ **Password hashing** - bcrypt for security
4. ✅ **Order analytics** - Stores cuisine/category for admin insights
5. ✅ **Image path standardization** - All images use `/assets/menu/` format
6. ✅ **MongoDB aggregation** - Efficient admin queries
7. ✅ **Type safety** - Full TypeScript support
8. ✅ **Validation** - zod schemas for all inputs

## 🔍 Testing

1. **Health Check:**
   ```bash
   curl http://localhost:8081/api/health
   ```

2. **Signup:**
   ```bash
   curl -X POST http://localhost:8081/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Login:**
   ```bash
   curl -X POST http://localhost:8081/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

4. **Get Dishes:**
   ```bash
   curl http://localhost:8081/api/dishes?cuisine=Indian&vegMode=veg
   ```

5. **Create Order (with JWT):**
   ```bash
   curl -X POST http://localhost:8081/api/orders \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"items":[{"dishId":"...","qty":2}],"address":{...},"paymentMethod":"COD"}'
   ```

## ⚠️ Important Notes

1. **Image Files**: You need to add actual dish images to `frontend/public/assets/menu/` with filenames matching the seed script (e.g., `masala-dosa.png`, `butter-chicken.png`, etc.)

2. **JWT Secret**: Change `JWT_SECRET` in production environment

3. **MongoDB**: Ensure Docker MongoDB is running before seeding or using APIs

4. **Port**: All APIs accessible at `http://localhost:8081/api/*`

