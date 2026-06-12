# Hyper-Local Delivery Dispatcher

A full-stack hyper-local delivery dispatch platform built for managing nearby stores, customer orders, seller operations, delivery partner assignment, live order tracking, and role-based dashboards.

This project provides an end-to-end delivery workflow where customers can browse local stores, place orders, sellers can manage products and dispatches, delivery partners can update availability and delivery status, and admins can monitor users, stores, orders, and platform activity.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [System Workflow](#system-workflow)
- [Backend API Modules](#backend-api-modules)
- [Frontend Pages](#frontend-pages)
- [Environment Variables](#environment-variables)
- [Installation and Setup](#installation-and-setup)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Database Models](#database-models)
- [Security Features](#security-features)
- [Deployment Notes](#deployment-notes)
- [Future Improvements](#future-improvements)
- [Project Highlights](#project-highlights)
- [License](#license)
- [Conclusion](#conclusion)

---

## Overview

Hyper-Local Delivery Dispatcher is designed to support fast and efficient local delivery management. The system connects customers, sellers, delivery partners, and admins through a single platform.

The application includes authentication, store management, product management, order placement, delivery assignment, live location tracking, delivery status updates, and earnings management for delivery partners.

It follows a modern MERN-style architecture with a React frontend, Node.js/Express backend, and MongoDB database.

---

## Key Features

### Customer Features

- User registration and login
- Browse available local stores
- Search and filter stores
- View store details and products
- Place orders with delivery address and location
- View personal order history
- Track active orders
- Manage user profile and saved addresses

### Seller Features

- Seller dashboard
- Create and manage store profile
- Add, update, and delete products
- View incoming orders
- Accept or manage customer orders
- Assign delivery partners to orders
- Track dispatch status
- View seller-specific order data

### Delivery Partner Features

- Delivery partner dashboard
- Update availability status
- Update live location
- View assigned orders
- Update delivery progress
- Mark orders as dispatched or delivered
- View earnings

### Admin Features

- Admin dashboard statistics
- View all users
- View all stores
- View all orders
- View delivery partners
- Update user roles
- Delete users
- Delete stores
- Monitor platform activity

### Dispatch and Tracking Features

- Assign delivery partners to accepted orders
- View available delivery partners
- Track order delivery location
- Store location history
- Manage dispatch status
- Calculate delivery distance
- Maintain delivery workflow from order placement to completion

---

## User Roles

| Role | Description |
|---|---|
| `user` | Customer who browses stores and places orders |
| `seller` | Store owner who manages store, products, and orders |
| `owner` | Store management role with dispatch permissions |
| `deliveryBoy` | Delivery partner who handles assigned deliveries |
| `admin` | Platform administrator with full monitoring and management access |

---

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Tailwind CSS
- Context API
- Fetch API
- Local storage based session handling

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- cookie-parser
- CORS
- Multer
- Cloudinary
- Socket.IO-ready backend dependency

### Database

- MongoDB Atlas or local MongoDB instance

### Deployment

- Frontend: Vercel
- Backend: Node-compatible hosting platform
- Database: MongoDB Atlas
- Media storage: Cloudinary or local uploads

---

## Project Structure

```bash
Hyper-Local-Delivery-Dispatcher/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── README.md
```

---

## System Workflow

1. A user signs up or logs in.
2. The user browses nearby stores.
3. The user selects a store and places an order.
4. The seller receives and manages the order.
5. The seller accepts the order and assigns a delivery partner.
6. The delivery partner receives the assigned order.
7. The delivery partner updates availability, location, and delivery status.
8. The customer tracks the order.
9. The order is marked as delivered.
10. Earnings are recorded for the delivery partner.
11. Admin can monitor users, stores, orders, and delivery partners.

---

## Backend API Modules

### Authentication

Base route:

```bash
/api/auth
```

Endpoints:

- `POST /signup`
- `POST /signin`
- `POST /signout`
- `GET /check`

### Stores

Base route:

```bash
/api/stores
```

Endpoints:

- `GET /`
- `GET /search`
- `GET /category/:category`
- `GET /:storeId`
- `GET /:storeId/products`
- `GET /admin/all`
- `DELETE /:storeId`

### Seller

Base route:

```bash
/api/seller
```

Endpoints:

- `GET /profile`
- `POST /store`
- `GET /store`
- `PUT /store`
- `POST /products`
- `GET /products`
- `PUT /products/:productId`
- `DELETE /products/:productId`
- `GET /orders`
- `GET /dashboard`

### Orders

Base route:

```bash
/api/orders
```

Endpoints:

- `POST /`
- `GET /my`
- `GET /seller`
- `GET /status/:status`
- `GET /`
- `GET /:orderId`
- `PUT /:orderId/accept`
- `PUT /:orderId/cancel`

### Dispatch

Base route:

```bash
/api/dispatch
```

Endpoints:

- `GET /`
- `GET /available-delivery-boys`
- `GET /order/:orderId`
- `GET /:id`
- `POST /assign/:orderId`
- `PUT /:id/status`

### Tracking

Base route:

```bash
/api/tracking
```

Endpoints:

- `PUT /location`
- `GET /available-delivery-boys`
- `GET /order/:orderId`
- `GET /order/:orderId/history`

### Delivery Partner

Base route:

```bash
/api/delivery-boy
```

Endpoints:

- `GET /profile`
- `PUT /availability`
- `PUT /location`
- `GET /orders`
- `PUT /orders/:orderId/status`
- `GET /earnings`

### Admin

Base route:

```bash
/api/admin
```

Endpoints:

- `GET /stats`
- `GET /users`
- `PUT /users/:id/role`
- `DELETE /users/:id`
- `GET /orders`
- `GET /stores`
- `GET /delivery-partners`

---

## Frontend Pages

### Authentication

- `/login`

### Customer Routes

- `/home`
- `/stores/:storeId`
- `/my-orders`
- `/track/:orderId`
- `/profile`

### Seller Routes

- `/seller/dashboard`
- `/seller/store`
- `/seller/products`
- `/seller/orders`
- `/seller/dispatch`

### Delivery Partner Routes

- `/delivery-boy/dashboard`
- `/delivery-boy/orders`
- `/delivery-boy/earnings`

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000
DB_URL=your_mongodb_connection_string
SECRETKEY=your_jwt_secret_key
PUBLIC_BASE_URL=http://localhost:5000

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=http://localhost:5000
```

For production, update `VITE_API_URL` with the deployed backend URL.

---

## Installation and Setup

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account or local MongoDB
- Cloudinary account, if using Cloudinary uploads

### Clone the Repository

```bash
git clone https://github.com/your-username/Hyper-Local-Delivery-Dispatcher.git
cd Hyper-Local-Delivery-Dispatcher
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Running the Project

### Start the Backend Server

```bash
cd backend
npm run dev
```

Backend URL:

```bash
http://localhost:5000
```

### Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend URL:

```bash
http://localhost:5173
```

---

## Available Scripts

### Backend

```bash
npm run dev
```

Starts the backend server using Nodemon.

```bash
npm start
```

Starts the backend server using Node.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

---

## Database Models

### User Model

Stores user details, role, availability status, live location, and saved addresses.

### Store Model

Stores seller-owned store information such as name, category, address, coordinates, and open status.

### Product Model

Stores products connected to stores and sellers.

### Order Model

Stores customer orders, seller reference, store reference, delivery partner reference, items, delivery address, delivery coordinates, total amount, delivery charge, and order status.

Supported order statuses:

```bash
pending
accepted
assigned
dispatched
delivered
cancelled
```

### Dispatch Model

Stores delivery assignment details including order, seller, delivery partner, pickup location, drop location, distance, and dispatch status.

Supported dispatch statuses:

```bash
assigned
picked
dispatched
delivered
cancelled
```

### Location Model

Stores delivery partner location updates and order tracking history.

### Earning Model

Stores delivery partner earnings per order.

Supported earning statuses:

```bash
pending
paid
```

---

## Security Features

- JWT-based authentication
- Protected backend routes
- Role-based access control
- Password hashing with bcryptjs
- CORS origin restrictions
- Auth session validation
- Automatic frontend redirect on authentication failure
- Secure environment variable usage

---

## Deployment Notes

### Frontend Deployment

The frontend is configured for Vercel deployment.

Before deploying, set:

```env
VITE_API_URL=https://your-backend-url.com
```

### Backend Deployment

The backend can be deployed on platforms such as Render, Railway, Cyclic, or any Node.js hosting provider.

Required backend environment variables:

```env
PORT
DB_URL
SECRETKEY
PUBLIC_BASE_URL
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### CORS Configuration

The backend allows local frontend ports and the deployed Vercel frontend domain. If deploying to a different domain, update the allowed origins in `backend/server.js`.

---

## Future Improvements

- Real-time Socket.IO order tracking
- Payment gateway integration
- Push notifications
- Delivery route optimization
- Seller analytics dashboard
- Admin revenue reports
- Rating and review system
- Order invoice generation
- Advanced map integration
- Automated delivery partner assignment
- Multi-store cart support
- Email and SMS notifications

---

## Project Highlights

- Complete role-based delivery workflow
- Separate dashboards for customers, sellers, delivery partners, and admins
- MongoDB-powered data persistence
- Secure JWT authentication
- Scalable REST API structure
- Clean frontend routing
- Delivery assignment and tracking support
- Cloudinary-ready image upload support
- Production-ready frontend deployment configuration

---

## License

This project is licensed under the MIT License.

---

## Conclusion

Hyper-Local Delivery Dispatcher is a complete full-stack delivery management system for local commerce. It brings together customers, store owners, delivery partners, and administrators into one organized platform.

The project demonstrates practical full-stack development using React, Node.js, Express, MongoDB, JWT authentication, protected routes, role-based access, order management, delivery dispatching, and tracking workflows.
