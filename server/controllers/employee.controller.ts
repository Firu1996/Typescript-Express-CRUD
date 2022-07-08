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
      res.locals = { ...this.responseData, data: newEmployee };
      res.status(201).send(res.locals);
    };
  }

  fetchEmployee(): RequestHandler {
    return async (req, res) => {
      try {
        const employeeList = await employeeModel.find();

        this.responseData = { success: true, data: employeeList };
        res.locals = { ...this.responseData };
        res.status(200).send(res.locals);
      } catch (err) {
        throw err;
      }
    };
  }

  fetchEmployeeById(): RequestHandler {
    return async (req, res) => {
      const { id } = req.params;
      try {
        const employee = await employeeModel.findById(id);

        if (!employee) {
          this.responseData = { success: true };
          res.locals = {
            ...this.responseData,
            data: employee,
            msg: "Employee not found",
          };
          res.send(res.locals);
        }

        this.responseData = { success: true };
        res.locals = { ...this.responseData, data: employee };
        res.status(200).send(res.locals);
      } catch (err) {
        throw new Error("Error at findById");
      }
    };
  }

  deleteEmployeeById(): RequestHandler {
    return async (req, res) => {
      const { id } = req.params;
      try {
        const employee = await employeeModel.findById(id);

        if (!employee) {
          this.responseData = { success: false };
          res.locals = {
            ...this.responseData,
            msg: "Employee not found",
          };
          res.send(res.locals);
        }
        await employee?.deleteOne();
        this.responseData = { success: true };
        res.locals = { ...this.responseData, msg: "Employee Deleted" };
        res.status(200).send(res.locals);
      } catch (err) {
        throw new Error("Error at delete");
      }
    };
  }

  updateEmployee(): RequestHandler {
    return async (req, res) => {
      const { id } = req.params;
      try {
        const employee = await employeeModel.findById(id);

        if (!employee) {
          this.responseData = { success: false };
          res.locals = {
            ...this.responseData,
            msg: "Employee not found",
          };
          res.send(res.locals);
        }
        await employee?.updateOne(req.body);
        this.responseData = { success: true };
        res.locals = {
          ...this.responseData,
          msg: "Employee Updated",
        };
        res.status(200).send(res.locals);
      } catch (err) {
        throw new Error("Error at Update");
      }
    };
  }
}
