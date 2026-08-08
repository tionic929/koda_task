import express from "express";
import cors from "cors";
import projectRoutes from "./src/routes/project.routes.js";
import { errorHandler, notFoundHandler } from "./src/middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/projects", projectRoutes);
app.use("/api/projects", projectRoutes);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Middleware for missing routes and errors
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
