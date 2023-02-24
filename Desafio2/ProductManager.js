import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }


  async readFile() {
    try {
      const content = await fs.promises.readFile(this.path, 'utf-8');
      const parseContent = JSON.parse(content);
      return parseContent;
    } catch (e) {
      console.log("Error reading File", e);
    }
  }


  async search(code) {
    const fileContent = await this.readFile();
    return fileContent.find((object) => object.code === code);
  }

  async addProduct(obj) {
    const fileContent = await this.readFile();
    if (await this.search(obj.code)) return console.log(`Product ${obj.code} already exist.`)
    try {
      if (fileContent.length > 0) await fs.promises.writeFile(this.path, JSON.stringify([...fileContent, {
        ...obj,
        id: fileContent[fileContent.length - 1].id + 1
      }, ], null, 3));
      else await fs.promises.writeFile(this.path, JSON.stringify([{
        ...obj,
        id: 1
      }]));
    } catch (e) {
      console.log("Product not added", e);
    }
  }

  async getProducts() {
    const fileContent = await this.readFile();
    try {
      console.log(fileContent);
    } catch (e) {
      console.log("Product can not be found", e);
    }
  }

  async getProductById(id) {
    try {
      const fileContent = await this.readFile();
      if (fileContent.find((object) => object.id === id)) {
        console.log(fileContent.find((object) => object.id === id));
      } else throw new Error(`Product ${id} not found.`);
    } catch (e) {
      console.log(`Product ${id} not found.`);
    }
  }


  async updateProducts(id, obj) {
    try {
      const fileContent = await this.readFile();
      const updated = fileContent.map((product) => product.id === id ? {
        ...product,
        ...obj
      } : product);
      if (!fileContent.find((objeto) => objeto.id === id)) throw new Error(`Product ${id} not found.`);
      else await fs.promises.writeFile(this.path, JSON.stringify(updated, null, 3));
    } catch (e) {
      console.log(`Can´t update ${id}.`);
    }
  }


  async deleteProductById(id) {
    try {
      const fileContent = await this.readFile();
      const update = fileContent.filter((product) => product.id !== id);
      if (!fileContent.find((obj) => obj.id === id)) throw new Error(`Product not found: ${id}`);
      else await fs.promises.writeFile(this.path, JSON.stringify(update, null, 3));
    } catch (error) {
      console.log("Can´t delete product");
    }
  }
}



//Crea en caso que no exista
const newProdManager = '[]';
fs.readFile('./items.json', 'utf8', (e) => {
  if (e) {
    fs.writeFile('./items.json', newProdManager, e => {
      if (e) {
        console.error("Error", e);
      }
    });
    return;
  }
  console.log("File already exist");
});


//Agrega Productos
const test = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
}




// Instancia
const products = new ProductManager("./items.json");

// .-.-.-. PARA PRUEBAS DESCOMENTAR .-.-.-.-.-. 


//products.getProducts();
//products.addProduct(test);
//products.getProducts();
//products.getProductById(1);
//products.updateProducts(1, { title: "Update Products Test" });
products.deleteProductById(1);