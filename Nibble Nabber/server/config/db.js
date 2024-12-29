const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // No need for useNewUrlParser and useUnifiedTopology
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB; // Export the connectDB function