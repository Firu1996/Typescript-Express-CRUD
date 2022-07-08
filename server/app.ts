import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { apiRouter } from "./routes";
import morgan from "morgan";

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initConnectDatabase();
    this.initMiddleware();
    this.initRoute();
  }

  public startServer() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server starting at PORT`, process.env.PORT);
    });
  }

  private initConnectDatabase() {
    mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
      console.log(`MongoDB connected`);
    });
  }

  private initMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
  }

  private initRoute() {
    this.app.use(apiRouter);
  }
}
