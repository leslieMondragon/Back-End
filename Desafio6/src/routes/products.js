import ProductManager from '../dao/classes/MongoDB/ProductManager.js';
import CartManager from '../dao/classes/MongoDb/CartManager.js';
import { Router } from 'express'
import auth from '../middleware/auth.js';

const router = Router()
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/', async (req, res)=>{
    const {limit, page, query, sort } = req.query
    let products = await productManager.getProducts(limit, page, query, sort)
    let info = {
        status: products !== undefined ? 'success' : 'error',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink,
    }
    res.send(info)
})

router.get('/view', async (req, res)=>{
    const {limit, page, query, sort } = req.query
    let info = await productManager.getProducts(limit, page, query, sort)
    let products = info.docs
    products = products.map(item => item.toObject())
    let user = {
        "first_name": req.session.user.first_name? req.session.user.first_name: req.session.user.name,
        "isAdmin": req.session.admin? "admin" : "user"
    }
    res.render('products', {
        user,
        products
    })
})

router.post('/view', async (req, res)=> {
    const { id } = req.body
    console.log(req.body);
    if (id !== undefined) {
        await cartManager.addProduct('640a9116397d14b30e55aa18', id)
    }
})

router.get('/:pid', async (req, res)=>{
    const { pid } = req.params
    let products = await productManager.getProductById(parseInt(pid))
    res.send(products)
})  

router.post('/', async (req, res)=>{
        let product = req.body
        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
            return res.status(400).send({ message: 'Completar los datos faltantes'})
        }
        productManager.addProducts(product.title, product.description, product.price, product.thumbnail, product.code, product.stock, product.category)
        res.status(201).send({ 
            product,
            message: 'usuario creado' 
        })
    
})  

router.put('/:pid', async (req, res)=>{
    const { pid } = req.params
    let product = req.body
    let entries = Object.entries(product)
    entries.forEach(async (keyValue)=>{
        console.log(pid, keyValue);
        productManager.updateProduct(parseInt(pid), keyValue)
    })

    res.status(201).send({ 
        product,
        message: 'usuario Modificado' 
    })

})

router.delete('/:pid', async (req, res)=>{
    const { pid } = req.params
    productManager.deleteProduct(parseInt(pid))
    res.status(201).send({ 
        message: 'Producto Eliminado' 
    })
})

export default router