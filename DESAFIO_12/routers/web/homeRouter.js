import { Router } from "express";
import path from "path";

const homeRouter = new Router();

homeRouter.get("/", (req, res) => {
  res.redirect("/home");
});

// homeRouter.get("/home", (req, res) => {
//   if (req.isAuthenticated()) {
//     const userData = {
//       name: req.user.displayName,
//       photo: req.user.photos[0].value,
//     };

//     res.render(path.join(process.cwd(), "/views/pages/index.hbs"), {
//       data: userData,
//     });
//   } else {
//     res.redirect("/login");
//   }
// });

homeRouter.get("/productos-vista-test", (req, res) => {
  res.render(path.join(process.cwd(), "/views/faker.hbs"));
});

export default homeRouter;
