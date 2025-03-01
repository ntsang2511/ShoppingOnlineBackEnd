# Online Watch Shop Web Backend

## Description
Handles data processing on the database side (MongoDB) and provides APIs for the frontend.

## Key Features
1. User Authentication & Management
User registration, login, and role-based access control (Admin, User, Shipper).
Security implementation using JWT and bcrypt.

2. Product Management
CRUD operations for products, categories, and images.
Search and filter by category.

3. Order & Cart Management
Create and update orders, manage shipping statuses.
Handle shopping cart, calculate total price, and shipping fees.

4. Payment & Shipping
Integration with Zalopay.
Shipping management and order tracking.

5. Reports & Analytics
Revenue statistics, order tracking, and customer behavior analysis.
6. Security & API
API authentication with JWT.
Provides RESTful API services.


## Installation
- Download the project:
git clone https://github.com/ntsang2511/ShoppingOnlineBackEnd.git

- Create a MongoDB account to set up storage and update the MONGO_DB link in the .env file.
(Ensure that port 3001 is available and not in use by another project. If necessary, change it to a different port.)

- Install dependencies:
npm install

- Run the application:
npm start

## Technologies Used
NodeJS,ExpressJS, mongoose, nodemailer, axios, cors, body-parser, cookie-parser, jsonwebtoken,...

## Contact Information
- Email: tansang25112003@gmail.com
- GitHub: https://github.com/ntsang2511
