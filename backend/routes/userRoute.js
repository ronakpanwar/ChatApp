import express from "express";
import { getAllOtherUser, login, logOut, register } from "../controller/userController.js";
import { isAutherized } from "../middlewere/isAutherized.js";

const router = express.Router()

router.post('/register' , register);
router.post('/login' , login)
router.get("/logout" , logOut)
router.get('/other-user' , isAutherized , getAllOtherUser)

export default router