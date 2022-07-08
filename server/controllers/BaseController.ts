import { Request } from "express";

interface IBodyResponse {
  success: boolean;
  data?: any;
}

export abstract class BaseController {
  protected responseData: IBodyResponse = { success: false };
}
