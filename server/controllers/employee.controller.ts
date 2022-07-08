import { RequestHandler } from "express";
import { BaseController } from "./BaseController";
import employeeModel from "../models/employee.model";

export class EmployeeController extends BaseController {
  constructor() {
    super();
  }

  createEmployee(): RequestHandler {
    return async (req, res) => {
      const { firstName, lastName, dateOfBirth, salary } = req.body;

      const newEmployee = new employeeModel({
        firstName,
        lastName,
        dateOfBirth,
        salary,
      });
      await newEmployee.save();

      this.responseData = { success: true };
      res.locals = { ...this.responseData, newEmployee };
      res.status(201).send(res.locals);
    };
  }
}
