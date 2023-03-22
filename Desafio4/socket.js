const ProductManager = require('./src/productManager');
const path = require('path');
const ruta = path.join(`${__dirname}/src/db/products.json`);

const adminProducts = new ProductManager(ruta);

const sockets = (socketServer)=>{
    let addProducts = [];
    
    socketServer.on('connection', async(socket) => {

        //Add 
        socket.on('productReceived', async(data) => {
            await adminProducts.addProduct(data);
            addProducts.push(data);
            socketServer.emit('addProducts', addProducts);
        });

        //Delete
        socket.on('productDelete', async(data)=>{
            const products = await adminProducts.getProducts()
            const productDelete = products.find(prod => prod.code === data);
            
            if(!Boolean(productDelete)){
                console.log('Error: product not found');
                return;
            }
            await adminProducts.deleteProduct(productDelete.id);
        })
    });
};


module.exports = {sockets};

