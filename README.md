
# Online Bookstore

This project is an online bookstore application built using Angular with Server-Side Rendering (SSR) for the frontend and NestJS for the backend. It supports running in local environments and containerized with Docker.

---

## Prerequisites

To run the project locally, ensure you have the following installed on your system:

- Node.js (v18 or higher)
- npm (v9 or higher)
- MySQL (for database)
- Docker & Docker Compose (optional for containerized deployment)

---

## Running Locally Without Docker

### 1. Clone the Repository

### 2. Set Up the Backend (NestJS)

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database connection:
   - Create a `.env` file in the `server` directory:
     ```env
     DATABASE_HOST=localhost
     DATABASE_PORT=3306
     DATABASE_USER=root
     DATABASE_PASSWORD=root
     DATABASE_NAME=bookstore
     JWT_SECRET=some-secret-string
     STRIPE_API_KEY=take-from-stripe
     STRIPE_API_SECRET=take-from-stripe
     APP_DOMAIN=http://localhost:4200
     ```

### 3. Set Up the Frontend (Angular SSR)

1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

### 4. Set Up the Database

1. Navigate to `server` directory:
   ```bash
   cd ../server
   ```
2. Sync the DB schema:
   ```bash
   npm run schema:sync
   ```
3. Run default products migration (optional, populates the db with dummy data)
   ```bash
   npm run migration:run
   ```

## Running with Docker

### 1. Build and Start the Containers
Ensure Docker is installed and running. Then execute:
```bash
docker-compose up -d --build
```

### 2. Access the Application
- Frontend (SSR): [http://localhost:4200](http://localhost:4200)
- Backend API: [http://localhost:3000](http://localhost:3000)

---
