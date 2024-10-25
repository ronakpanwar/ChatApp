import {Router} from "express";
import { isAutherized } from "../middlewere/isAutherized.js";
import { getMessages, sendMessage } from "../controller/messageController.js";

const router = Router();

router.post('/send/:id' , isAutherized , sendMessage)
router.get('/:id' , isAutherized , getMessages)

export default router