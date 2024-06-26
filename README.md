# API GATEWAY SERVICE

## Overview
This project is a User Authentication Service built using Node.js and Sequelize ORM. It is designed to handle user data securely with features like email validation, password encryption, and JWT (JSON Web Tokens) for secure authentication.

## Features
- User registration with email and password.
- Email validation to ensure proper email format.
- Password encryption using bcrypt for secure storage.
- JWT for secure and efficient user authentication.
Authorization check for adding roles to enhance security.
- Default customer role during signup to streamline the user onboarding process.
- Models for a many-to-many association between roles and users to facilitate complex user management scenarios.
- Rate limiter and proxy to improve API performance and security by managing the rate of incoming requests.

## Technologies Used
- Node.js
- Sequelize ORM
- bcrypt for password encryption
- JSON Web Tokens (JWT)
- Rate limiting tools
- Proxy servers for improved security and load handling

## Latest Updates
- Added JWT support for enhanced security in user authentication. This allows the server to issue tokens to users upon successful authentication, which are required for subsequent requests to protected routes.
- Improved email validation to ensure accurate email format validation.
- Improved password encryption to provide secure storage for user passwords.
- Improved JWT implementation to provide secure and efficient user authentication.

## Installation
- Clone the repository: `git clone https://github.com/git-ashutosh571/API-Gateway-Flights.git`
- Install dependencies: `npm install`
- Start the server: `npm start` or `npm run dev`

## Usage
- To use the API Gateway Service, you can make requests to the API endpoints provided in the documentation.
