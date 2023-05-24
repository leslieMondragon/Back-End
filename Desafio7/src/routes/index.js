import { Router } from "express";
import ProductRouter from "./products.js"
import CartRouter from "./carts.js"
import Auth from "./auth.js"
import auth from "../middleware/auth.js";
import SessionRouter from "./sessions.js"

const router = Router()

router.use('/api/products', auth(), ProductRouter)
router.use('/api/carts', auth(), CartRouter)
router.use('/auth', auth(), Auth)
router.use('/api/sessions', auth(), SessionRouter)
export default router