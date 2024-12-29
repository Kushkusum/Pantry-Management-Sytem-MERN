const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const pantryRoutes = require('./routes/pantryRoutes');
const shoppingListRoutes = require('./routes/ShoppingListRoutes');
const recommendationsRoutes = require('./routes/recommendationsRoutes');

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/pantry', pantryRoutes);
app.use('/api/shopping-list', shoppingListRoutes);
app.use('/api/recommendations', recommendationsRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
