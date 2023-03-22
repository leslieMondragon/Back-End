const {Router} = require('express');
const cartsRouter = Router();

const {
    createCart,
    getCartId,
    getProductsByIdCart
} = require('../controllers/cartsController.js')

cartsRouter.post('/', createCart);
cartsRouter.get('/:cid', getCartId);
cartsRouter.post('/:cid/product/:pid', getProductsByIdCart )

module.exports = cartsRouter;