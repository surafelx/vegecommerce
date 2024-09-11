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

location /boro-api {
  proxy_pass http://127.0.0.1:z;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
proxy_connect_timeout       600;
proxy_send_timeout          600;
proxy_read_timeout          600;
}