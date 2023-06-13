import { Router } from 'express'
import CartController from '../controllers/cart.js';
import authorization from "../middleware/authorization.js";

const router = Router()
const cartController = new CartController();

router.get('/views/:cid', cartController.getView)

router.post('/',authorization("user") , cartController.createCart)

router.get('/:cid', authorization("user"), cartController.getCart)

router.put('/:cid/products/:pid', authorization("user"), cartController.addProductQuantity)

router.put('/:cid', authorization("user"), cartController.addProducts)

router.delete('/:cid/products/:pid', authorization("user"), cartController.deleteProduct)

router.delete('/:cid', authorization("user"), cartController.deleteCart)

router.get('/:cid/purchase', cartController.finishProcess)

export default router