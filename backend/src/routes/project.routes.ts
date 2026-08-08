import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema.js";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.post("/", validateBody(createProjectSchema), ProjectController.createProject);
router.put("/:id", validateBody(updateProjectSchema), ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

export default router;
