#Pantry Management System

An efficient web application for managing groceries with user authentication, enabling seamless update, and deletion of items.

# Nibble Nabber

Nibble Nabber is a grocery management web application designed to simplify pantry tracking, shopping list creation, and budget management. It provides a seamless user experience by integrating intuitive features like inventory tracking, predictive recommendations for expiring or low-stock items, and expense monitoring to reduce food waste and save time.

---

## Features

- **Pantry Management**  
  Track pantry items with quantities and expiry dates.
  
- **Shopping List**  
  Create and manage dynamic shopping lists.
  
- **Budget Monitoring**  
  Track grocery expenses to stay within budget.
  
- **Predictive Recommendations**  
  Get insights on items that are expiring soon or low in stock.

- **Recipes Page**
  Fetch recipes using the Spoonacular API based on available ingredients.
  
- **Secure User Authentication**  
  JWT-based authentication and encrypted passwords for secure access.

---

## System Design

### Architecture
The application follows a three-tier architecture:
1. **Frontend**: React.js for the user interface.
2. **Backend**: Node.js with Express.js for routing and API logic.
3. **Database**: MongoDB for storing user and application data.

### Data Flow
1. User interacts with the React.js frontend.
2. Frontend communicates with the backend API.
3. Backend processes requests, interacts with the MongoDB database, and sends responses back to the frontend.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB (or access to MongoDB Atlas)



Instructions on setting up the backend of the project:

1. Navigate to the `server` directory: `cd server`
2. Install backend dependencies: `npm install`
3. Set up environment variables: Create a `.env` file and add necessary configurations (database URL, API keys, etc.)
4. Start the backend server: `npm start`

## Frontend Setup

Instructions on setting up the frontend of the project:

1. Navigate to the `client` directory: `cd client`
2. Install frontend dependencies: `npm install`
3. Configure frontend environment (if required)
4. Start the frontend application: `npm start`
5. In the Recipes.jsx file, change the spoonacular key to your_spoonacular_key

   
## Usage

Instructions on how to use the project:

- Start the backend server: `npm start` (inside the `server` directory)
- Start the frontend application: `npm start` (inside the `client` directory)
- Access the application at `http://localhost:PORT`


## .env file contents
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

PORT=3000



## API Endpoints
Pantry Management
GET /api/pantry - Fetch all pantry items
POST /api/pantry - Add a new pantry item
PUT /api/pantry/:id - Update an existing pantry item
DELETE /api/pantry/:id - Delete a pantry item
Shopping List
GET /api/shopping-list - Fetch all shopping list items
POST /api/shopping-list - Add a new shopping list item
PUT /api/shopping-list/:id - Update a shopping list item
DELETE /api/shopping-list/:id - Delete a shopping list item
User Authentication
POST /api/users/signup - Register a new user
POST /api/users/login - Authenticate and log in

