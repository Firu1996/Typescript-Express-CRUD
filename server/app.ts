import express, { Application, Request, Response } from "express";

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initMiddleware();
    this.initRoute();
  }

  public startServer() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Server starting at PORT`, process.env.PORT);
    });
  }

  private initMiddleware() {}

  private initRoute() {}
}
