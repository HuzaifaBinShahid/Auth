import express from "express";
import {
    signup,
    login,
    googleLogin,
    authenticateToken,
    checkToken,
    logout
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/auth/google", googleLogin)

// router.get("/check-token", authenticateToken, checkToken);

router.post("/logout", logout);

export default router;
