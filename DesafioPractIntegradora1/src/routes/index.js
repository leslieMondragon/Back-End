import { Router } from "express";
import ProductRouter from "./products.js"
import CartRouter from "./carts.js"

const router = Router()

router.use('/api/products', ProductRouter)
router.use('/api/carts', CartRouter)

export default router