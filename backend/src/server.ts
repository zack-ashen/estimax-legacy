// Importing required modules
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

// Routes
import authRoutes from "./api/routes/auth.routes";
import locationRoutes from "./api/routes/location.routes";
import organizationRoutes from "./api/routes/organization.routes";
import projectRoutes from "./api/routes/project.routes";
import propertyRoutes from "./api/routes/property.routes";
import vendorRoutes from "./api/routes/vendor.routes";

import { errorHandler } from "./api/middleware/errors";

import userRoutes from "./api/routes/user.routes";
import swaggerSpec from "./swagger/swagger";

// Load environment variables from .env file
dotenv.config();

// setup morgan
morgan("tiny");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL!)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/project", projectRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error Handling
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
