import express from "express";
import path from "path";
import config from "../../config.js";

import passport from "passport";
import { Strategy } from "passport-facebook";
const FacebookStrategy = Strategy;

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  res.render(path.join(process.cwd(), "/views/login-fb.hbs"));
});

const FACEBOOK_APP_ID = config.facebookApp.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = config.facebookApp.FACEBOOK_APP_SECRET;

// ------ Config Passport ------ //

passport.use(
  new FacebookStrategy(
  {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8282/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
  },
  function (accessToken, refreshToken, profile, cb) {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log(profile);
      cb(null, profile);
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// ------ Fin Config Passport ------ //

authRouter.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    const userData = {
      name: req.user.displayName,
      photo: req.user.photos[0].value,
    };
    res.render(path.join(process.cwd(), "/views/index.hbs"), {
      data: userData,
    });
  } else {
    res.redirect("/login");
  }
});

//-----------Logout con facebook----------

authRouter.get("/logout", (req, res) => {
  res.render(path.join(process.cwd(), "views/logout.hbs"),{name: req.user.displayName})
  req.logout()
  req.session.destroy();
});

authRouter.get("/auth/facebook", passport.authenticate("facebook"));

authRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: "/home",
    authType: "reauthenticate",
  })
);

export default authRouter;
