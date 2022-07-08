import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

export const employeeRouter = Router();

const employeeController = new EmployeeController();

employeeRouter.post("/", employeeController.createEmployee());
employeeRouter.get("/", employeeController.fetchEmployee());
employeeRouter.get("/:id", employeeController.fetchEmployeeById());
employeeRouter.delete("/:id", employeeController.deleteEmployeeById());
employeeRouter.patch("/:id", employeeController.updateEmployee());
