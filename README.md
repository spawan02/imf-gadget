# Gadget API

This project is a **RESTful API** designed to manage gadgets in an inventory system. The API allows CRUD (Create, Read, Update, Delete) operations on gadgets, as well as the ability to filter gadgets by their status. The application includes **JWT authentication** for secure routes and uses **Prisma** to manage database operations.

## Features
- **CRUD operations** for gadgets.
- Filter gadgets by **status** (e.g., Available, Deployed, etc.).
- **JWT authentication** for securing certain routes.
- **Prisma ORM** for interacting with the database.

## Requirements
- **Node.js**
- **PostgreSQL** or **MySQL** database for `DATABASE_URL`.

## Setup Instructions

### 1. Clone the Repository
 Clone the repository to your local machine:
```bash
git clone https://github.com/spawan02/imf-gadget.git
cd imf-gadget
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
 Create a .env file in the root directory and add the following variables:
```bash
DATABASE_URL:your-database-connection-url-here
JWT_SECRET:your-jwt-secret-key-here.
```
### 4. Run Database Migrations:
 If you're using Prisma, run the following command to apply database migrations:
```bash
npx prisma migrate dev
```
### 5. Start the Application
```bash
npm start
```
