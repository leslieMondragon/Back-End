class ProductManager {
    constructor() {
        this.products = [];
        console.log("1. Instancia creada");
    }

    getProducts() {
        return this.products;
    }

    search(product) {
        return product.code;
    }

    addProduct(product) {
        if (this.search(product) && !this.products.find(p => p.code === product.code)) {
            this.products.push({
                ...product,
                id: this.products.length + 1
            });
            return console.log(`3. Added: ${product.title}`)
        } else {
            return console.log(`5. ${product.title} already exist.`);
        }
    }

    getProductById(id) {
        const findById = this.products.find(p => p.id === id);
        if (findById) return console.log(`Product ID ${id} :`), console.log(findById);
        else return console.log(`Product ID ${id} doesn´t exist.`);
    }
}


const test = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}


//Se creará una instancia de la clase “ProductManager”
const productClass = new ProductManager();

//Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
console.log("2. Arreglo vacío", productClass.getProducts());

//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
productClass.addProduct(test);

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log("4. ", productClass.getProducts());


//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
productClass.addProduct(test);


//Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
productClass.getProductById(1);
productClass.getProductById(16);