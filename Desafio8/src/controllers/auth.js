import { request } from "express";
import { createHash } from "../utils/bycriptPass.js";
import { userService } from "../services/index.js";
import CustomError from "../services/errors/CustomError.js";
import { generateUserErrorInfo } from "../services/errors/info.js";
import { EErrors } from "../services/errors/enums.js";

class AuthController {
  githubCallback = async (req = request, res) => {
    req.session.user = req.user;
    res.redirect("/api/products/view");
  };

  logout = async (req = request, res) => {
    req.session.destroy((err) => {
      if (!err) res.status(200).redirect("/auth/login");
      else res.send({ status: "Logout error", message: err });
    });
  };

  login = async (req = request, res) => {
    if (req.user === undefined) {
      CustomError.createError({
        name: "Failed Login",
        cause: generateUserErrorInfo({
          first_name : req.user.first_name, 
          last_name : req.user.first_name,
          email: req.user.email,
          role: req.user.role
        }),
        message: "Error in login and creating a session",
        code: EErrors.SESSION_ERROR
      })
    } else {
      const user = await userService.getUserByEmail(req.user.email);
      req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: user.email,
        role: user.role,
      };
    }
    res.status(200).redirect("/api/products/view");
  };

  register = async (req = request, res) => {
    res.status(200).redirect("login");
  };

  restorePass = async (req = request, res) => {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user)
      return res
        .status(401)
        .send({ status: "error", message: "El usuario no existe" });
    user.password = createHash(password);
    await user.save();

    res
      .status(200)
      .json({
        status: "success",
        message: "Contraseña actualizada correctamente",
      })
      .redirect("login");
  };
}

export default AuthController;

