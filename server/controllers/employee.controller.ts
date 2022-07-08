import { RequestHandler } from "express";
import { BaseController } from "./BaseController";
import employeeModel from "../models/employee.model";

interface IFetchById {
  id: string;
}

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
      res.locals = { ...this.responseData, data: newEmployee };
      res.status(201).send(res.locals);
    };
  }

  fetchEmployee(): RequestHandler {
    return async (req, res) => {
      const employeeList = await employeeModel.find();

      this.responseData = { success: true, data: employeeList };
      res.locals = { ...this.responseData };
      res.status(200).send(res.locals);
    };
  }

  fetchEmployeeById(params: IFetchById): RequestHandler {
    return async (req, res) => {
      const { id } = params;
      if (!id) {
        res.locals = { ...this.responseData, msg: "Please enter employee id" };
        res.send(res.locals);
      }

      const employee = await employeeModel.findById(id);
      if (employee === null) {
        this.responseData = { success: true };
        res.locals = {
          ...this.responseData,
          data: employee,
          msg: "Employee not found",
        };
      }

      this.responseData = { success: true };
      res.locals = { ...this.responseData, data: employee };
      res.status(200).send(res.locals);
    };
  }
}
