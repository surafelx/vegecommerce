const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const routes = require("./routes");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');

app.use(morgan("dev")); // or 'dev' for less verbose logging

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON and urlencoded data (not needed for file uploads)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all origins
app.use(cors({ origin: true }));

// Routes
app.use("/api", routes);

app.listen(process.env.API_PORT || 8080, () => {
  console.log(`Server running on port ${process.env.API_PORT || 8080}`);
});
