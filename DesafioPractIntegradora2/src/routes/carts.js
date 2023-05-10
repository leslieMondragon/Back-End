import { Router } from 'express'
import CartManager from '../dao/classes/MongoDB/CartManager.js';

const router = Router()

const cartManager = new CartManager();

router.get('/views/:cid', async (req, res)=>{
    const { cid } = req.params
    let info = await cartManager.getCart(cid)
    let products = info.products
    products = products.map(item => item.toObject())
    let cart = {
        _id: info._id,
        products
    }
    // cart =  cart.map(item => item.toObject())
    res.render('carts', {
        cart
    })
    // res.send(info)
})

router.post('/', async (req, res)=>{
    //crear carrito con id y array de products vacio
    await cartManager.createCart()
    res.status(201).send('Nuevo carrito')
})

router.get('/:cid', async (req, res)=>{

    const { cid } = req.params
    let cart = await cartManager.getCart(cid)
    res.status(201).send({products: cart.products})
})

router.put('/:cid/products/:pid', async (req, res)=>{


    const { cid, pid } = req.params
    const { quantity } = req.body
    let cart = await cartManager.addProductQuantity(cid, pid, quantity)
    res.status(201).send({
        "new cart": cart,
        "message": "Producto añadido"
    })
})

router.put('/:cid', async (req,res)=> {
    const {cid} = req.params
    let array = req.body
    let cart = await cartManager.addProducts(cid, array)
    res.status(201).send({
        "new cart": cart,
        "message": "Productos añadidos"
    })
})

router.delete('/:cid/products/:pid', async (req, res)=> {
    const { cid, pid } = req.params
    let cart = await cartManager.deleteProduct(cid, pid)
    res.status(201).send({
        "new cart": cart,
        "message": "Producto eliminado"
    })
})

router.delete('/:cid', async (req, res)=> {
    const { cid } = req.params
    let cart = await cartManager.deleteCart(cid)
    res.status(201).send({
        "new cart": cart,
        "message": "Carrito eliminado"
    })
})

export default router