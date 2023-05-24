import { Router } from 'express'
import CartController from '../controllers/cart.js';

const router = Router()
const cartController = new CartController();

router.get('/views/:cid', cartController.getView)

router.post('/', cartController.createCart)

router.get('/:cid', cartController.getCart)

router.put('/:cid/products/:pid', cartController.addProductQuantity)

router.put('/:cid', cartController.addProducts)

router.delete('/:cid/products/:pid', cartController.deleteProduct)

router.delete('/:cid', cartController.deleteCart)

export default router