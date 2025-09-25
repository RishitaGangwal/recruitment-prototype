# Recruitment Platform Prototype

## Project Overview
This project is a **full-stack recruitment platform prototype** built with **Spring Boot**, **MySQL**, and **React**. Users can register, log in using JWT authentication, and view their profile.

---

## Features
- **User Registration**: Sign up with email, password, first name, and last name.
- **User Login**: Authenticate using email and password. JWT is issued on successful login.
- **Profile Page**: Fetch and display user information after login.
- **Secure Authentication**: Passwords are encrypted, and JWT is used for API security.
- **Basic Error Handling**: Handles invalid inputs, authentication errors, and missing or invalid JWT tokens.

---

## Technology Stack
- **Backend**: Spring Boot, Spring Security, Spring Data JPA
- **Frontend**: React, Axios
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Build Tools**: Maven

---

## Database Schema

### `users` Table

| Column     | Type         | Description                      |
|------------|-------------|----------------------------------|
| id         | BIGINT       | Primary Key, Auto-increment      |
| email      | VARCHAR(255) | Unique, User email               |
| password   | VARCHAR(255) | Encrypted password               |
| first_name | VARCHAR(255) | User first name                  |
| last_name  | VARCHAR(255) | User last name                   |

---

## API Endpoints

### 1. Registration
POST /auth/register
Request Body:
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}


Response:
{
  "message": "Registration successful!"
}



### 2. Login


POST /auth/login
Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}


Response:
{
  "token": "jwt-token-here"
}


### 3. Profile


GET /api/users/me
Headers:
Authorization: Bearer <jwt-token>


Response:
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}



---

## Authentication Flow
1. User registers using `/auth/register`.
2. User logs in using `/auth/login` and receives a JWT token.
3. The token is stored in the frontend (localStorage).
4. Protected API calls (e.g., `/api/users/me`) require the `Authorization: Bearer <token>` header.
5. Backend validates JWT for protected endpoints.

---

## Error Handling
- **Invalid credentials** → Returns `Invalid email or password`.
- **Missing JWT** → Returns `Missing or invalid Authorization header`.
- **Invalid JWT** → Returns `Invalid token`.
- **User not found** → Returns `404 User not found`.

---

## Setup Instructions

### Backend (Spring Boot)
1. Clone the repository:  
git clone <your-repo-url>

2. Navigate to backend folder:  


cd server

3. Configure MySQL in `application.properties`:


spring.datasource.url=jdbc:mysql://localhost:3306/recruitment_db
spring.datasource.username=
spring.datasource.password==
jwt.secret=
jwt.expiration=3600000

4. Build and run:


./mvnw clean package
java -jar target/server.jar


### Frontend (React)
1. Navigate to frontend folder:  


cd client

2. Install dependencies:  


npm install

3. Start the development server:  


npm start

4. Access the app at `http://localhost:3000`.

---

## Architectural Choices
- **Spring Boot** for backend REST APIs.
- **JWT** for stateless, secure authentication.
- **React** for single-page application frontend.
- **MySQL** for storing user data with simple schema.
- **Spring Security** handles authentication and endpoint protection.

---

## Scaling & Improvements
- Use **Spring Boot Profiles** for different environments.
- Store sensitive variables in environment variables for deployment.

---

## Notes
- This is a **prototype**, focusing on core functionality.
- Passwords are stored encrypted using **BCrypt**.
- JWT secret must be **at least 256 bits** for security.
