import ProductManager from '../dao/classes/MongoDB/ProductManager.js';
import { Router } from 'express'

const router = Router()
const productManager = new ProductManager();

const queryImport = async (limit) => {
    const array = []
    if (limit === undefined) {
        console.log('products');
        return await productManager.getProducts() 
    }
    else {
        for (let index = 1; index <= limit; index++) {
            array.push(await productManager.getProductById(index))
        }
        return array
    }
}


router.get('/', async (req, res)=>{
    const {limit} = req.query
    let info = await queryImport(limit)
    res.send({
        info
    })
})  

router.get('/:pid', async (req, res)=>{
    const { pid } = req.params
    let info = await productManager.getProductById(parseInt(pid))
    res.send(info)
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