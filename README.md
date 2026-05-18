# Express JWT Authentication API

REST API authentication dan manajemen pengguna menggunakan Node.js, Express.js, MySQL, JWT, dan bcrypt.

## Features

- User Register
- User Login
- JWT Authentication
- Refresh Token
- Protected Route
- Get User Profile
- Update User Profile
- Logout
- Password Hashing with bcrypt

---

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt

### Other Packages
- dotenv
- cors
- cookie-parser
- mysql2

---

## Project Structure

```txt
src/
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   └── userController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── app.js
└── server.js
```

---

## Installation

Clone repository

```bash
git clone https://github.com/Adi-tegar-setiawan/express-jwt-authentication.git
```

Masuk ke folder project

```bash
cd express-jwt-authentication
```

Install dependency

```bash
npm install
```

Run server

```bash
npm run dev
```

---

## Environment Variables

Buat file `.env`

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=jwt_auth_db

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
```

---

## Database Setup

Create database

```sql
CREATE DATABASE jwt_auth_db;
```

Use database

```sql
USE jwt_auth_db;
```

Create users table

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /auth/register | Register new user |
| POST | /auth/login | Login user |
| GET | /auth/refresh-token | Refresh access token |
| DELETE | /auth/logout | Logout user |

---

### User

| Method | Endpoint | Description |
|---|---|---|
| GET | /users/profile | Get user profile |
| PUT | /users/profile | Update user profile |

---

## API Testing

### Register

```http
POST /auth/register
```

Body

```json
{
  "name": "steve",
  "email": "user1@gmail.com",
  "password": "123456"
}
```

---

### Login

```http
POST /auth/login
```

Body

```json
{
  "email": "user1@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "accessToken": "eyJhbGciOiJIUzI1Ni..."
}
```

---

### Protected Route

```http
GET /users/profile
```

Headers

```txt
Authorization: Bearer TOKEN
```

---

## Authentication Flow

```txt
Register
↓
Password di-hash menggunakan bcrypt
↓
Data user disimpan ke database

----------------------------

Login
↓
bcrypt.compare()
↓
Generate Access Token
↓
Generate Refresh Token
↓
Token dikirim ke user

----------------------------

Access Protected Route
↓
Middleware verify JWT
↓
Access granted
```

---

## Security Features

- Password hashing with bcrypt
- JWT access token
- Refresh token
- Protected routes
- HTTP Only Cookie

---

## Future Improvements

- Role-based authorization
- Email verification
- Forgot password
- Upload profile image
- Swagger documentation
- Unit testing
- Docker support
- Prisma ORM

---

## Author

Adi Tegar Setiawan

---

## License

This project is licensed under the MIT License.