import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

export const employeeRouter = Router();

const employeeController = new EmployeeController();

employeeRouter.post("/", employeeController.createEmployee());
