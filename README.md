# Shrimp Zone API

Backend API for Shrimp Zone food ordering system built with Express.js, MongoDB, and TypeScript.

## Features

- **Authentication**: JWT-based authentication with role-based access control (Customer/Admin)
- **Public API**: Access branches, menu items, categories, and approved reviews
- **Customer API**: Create orders, view order history, submit reviews
- **Admin API**: Full CRUD operations for branches, menu items, categories, orders, and reviews
- **Role-based Access**: Admin users have full control, customers have limited access

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shrimpzone?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

**Important**: Replace `MONGODB_URI` with your actual MongoDB Atlas connection string.

### 3. Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user with read/write permissions
5. Get your connection string and add it to `.env`

### 4. Seed Default Admin User

Run the seed script to create the default admin user:

```bash
npm run seed:admin
```

**Default Admin Credentials:**
- Email: `nadertok111@gmail.com`
- Password: `Nader@012`

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### 6. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Public Endpoints (No Authentication)

- `GET /api/branches` - Get all branches
- `GET /api/branches/:id` - Get branch by ID
- `GET /api/categories` - Get all categories
- `GET /api/menu` - Get all menu items (optional query: `?categoryId=xxx&branchId=xxx`)
- `GET /api/menu/:id` - Get menu item by ID
- `GET /api/menu/featured` - Get featured menu items
- `GET /api/reviews` - Get approved reviews

### Authentication Endpoints

- `POST /api/auth/register` - Register new customer
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (requires auth)

### Customer Endpoints (Requires Authentication)

- `POST /api/customer/orders` - Create new order
- `GET /api/customer/orders` - Get my orders
- `GET /api/customer/orders/:id` - Get order by ID
- `POST /api/customer/reviews` - Submit review
- `GET /api/customer/reviews/my` - Get my reviews

### Admin Endpoints (Requires Admin Role)

**Branches:**
- `POST /api/admin/branches` - Create branch
- `PUT /api/admin/branches/:id` - Update branch
- `DELETE /api/admin/branches/:id` - Delete branch

**Categories:**
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

**Menu Items:**
- `POST /api/admin/menu` - Create menu item
- `PUT /api/admin/menu/:id` - Update menu item
- `DELETE /api/admin/menu/:id` - Delete menu item

**Orders:**
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status

**Reviews:**
- `GET /api/admin/reviews` - Get all reviews
- `PUT /api/admin/reviews/:id/approve` - Approve review
- `DELETE /api/admin/reviews/:id` - Delete review

**Users:**
- `GET /api/admin/users` - Get all users

## Authentication

To access protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Schema

### User
- email, password, name, role (customer/admin), phone

### Branch
- name (bilingual), address (bilingual), phone, hours (bilingual), zone (bilingual), deliveryFee, etaMinutes, rating, isOpen, image

### Category
- name (bilingual)

### MenuItem
- categoryId, name (bilingual), description (bilingual), price, image, isAvailable, unavailableInBranches, featured

### Order
- orderId, userId, branchId, items, total, deliveryFee, status, customerName, customerPhone, customerAddress, customerNotes, paymentMethod, deliveryType

### Review
- branchId, userId, customerName, rating, comment (bilingual), isApproved

## Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Render

1. Connect your GitHub repository to Render
2. Add environment variables
3. Deploy automatically on push

### VPS (DigitalOcean, AWS, etc.)

1. Build the project: `npm run build`
2. Set up Node.js on your server
3. Configure environment variables
4. Run: `npm start`
5. Use PM2 for process management: `pm2 start dist/server.js --name shrimp-zone-api`

## License

ISC
