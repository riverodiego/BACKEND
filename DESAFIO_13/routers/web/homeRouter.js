import { Router } from "express";
import path from "path";

const homeRouter = new Router();

homeRouter.get("/", (req, res) => {
  res.redirect("/home");
});

homeRouter.get("/productos-vista-test", (req, res) => {
  res.render(path.join(process.cwd(), "/views/faker.hbs"));
});

export default homeRouter;
