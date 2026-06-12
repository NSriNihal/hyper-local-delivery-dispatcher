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
- [License](#license)

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
│   │   ├── cloudinary.js
│   │   └── db.js
│   │
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
│   │   │   ├── auth/
│   │   │   ├── deliveryBoy/
│   │   │   ├── seller/
│   │   │   └── user/
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
