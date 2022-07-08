import { Router } from "express";
import { employeeRouter } from "./employee.route";
export const apiRouter = Router();

apiRouter.use("/employee", employeeRouter);
