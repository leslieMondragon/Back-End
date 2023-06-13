import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.js";
import auth from "../middleware/auth.js";

const authController = new AuthController();
const router = Router();

//Github
router.get("/github", passport.authenticate("github", { scope:["user:email"] })
);

router.get("/githubcallback", passport.authenticate("github", {failureRedirect:"/auth/login"}),authController.githubCallback
);

router.get("/logout", authController.logout);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/auth/faillogin" }),
  auth("session"),
  authController.login
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/auth/failregister" }),
  authController.register
);

router.post("/restorepass", authController.restorePass);

router.get("/faillogin", async (req, res) => {
  res.status(400).json({ error: "failed login" });
});

router.get("/failregister", async (req, res) => {
  console.log("failregister");
  res.status(400).json({ error: "failed register" });
});

router.get("/login", (req, res) => {
  res.render("login", {
    style: "login.css",
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    style: "login.css",
  });
});

export default router;
