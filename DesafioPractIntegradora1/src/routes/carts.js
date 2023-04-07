import { Router } from 'express'
import CartManager from '../dao/classes/MongoDB/CartManager.js';

const router = Router()

const cartManager = new CartManager();


router.post('/', async (req, res)=>{
    //crear un carrito con id y array de products vacio
    await cartManager.createCart()
    res.status(201).send('New Cart created')
})

router.get('/:cid', async (req, res)=>{
    //mostrar el array de productos del carrito seleccionado
    const { cid } = req.params
    let cart = await cartManager.getCart(cid)
    res.status(201).send(cart.products)
})

router.post('/:cid/product/:pid', async (req, res)=>{
    //agregar el producto al carrito seleccionado, es un objeto con el id y cantidad del producto
    const { cid, pid } = req.params
    let cart = await cartManager.addProduct(cid, pid)
    res.status(201).send({
        "new cart": cart,
        "message": "Product added"
    })
})

export default router