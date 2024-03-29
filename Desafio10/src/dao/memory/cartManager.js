import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  get = async () => {
    if (fs.existsSync(`${this.path}carrito.json`)) {
      let carts = await JSON.parse(
        fs.readFileSync(`${this.path}carrito.json`, "utf-8")
      );
      return carts;
    } else {
      return false;
    }
  };

  getOne = async (id) => {
    if (fs.existsSync(`${this.path}carrito.json`)) {
      let carts = await JSON.parse(
        fs.readFileSync(`${this.path}carrito.json`, "utf-8")
      );
      let cart = carts.find((element) => element.id == id);
      if (cart == undefined) {
        return "No se encuentra ningun carrito con ese ID";
      } else {
        return cart; 
      }
    } else {
      return false;
    }
  };

  post = async () => {
    let newCartId = 0;
    if (fs.existsSync(`${this.path}carrito.json`)) {
      let carts = await JSON.parse(
        fs.readFileSync(`${this.path}carrito.json`, "utf-8")
      );
      let lastCart = await carts.pop();
      carts.push(lastCart);
      let cart = {
        id: lastCart.id + 1,
        objects: [],
      };
      newCartId = lastCart.id + 1;

      carts.push(cart);

      carts = JSON.stringify(carts);
      fs.writeFileSync(`${this.path}carrito.json`, carts);
    } else {
      let cart = {
        id: 0,
        objects: [],
      };
      let carts = [cart];

      carts = JSON.stringify(carts);
      fs.writeFileSync(`${this.path}carrito.json`, carts);
    }

    return `ID ${newCartId}`;
  };

  put = async (cartId, productId) => {
    if (
      fs.existsSync(`${this.path}carrito.json`) &&
      fs.existsSync(`${this.path}productos.json`)
    ) {
      let carts = await JSON.parse(
        fs.readFileSync(`${this.path}carrito.json`, "utf-8")
      );
      let cart = carts.find((element) => element.id == cartId);
      if (cart == undefined) {
        return "No se encuentra ningun carrito con ese ID";
      } else {
        let products = await JSON.parse(
          fs.readFileSync(`${this.path}productos.json`, "utf-8")
        );
        let product = products.find((element) => element.id == productId);
        if (product == undefined) {
          return "No se encuentra ningun producto con ese ID";
        } else {
          let idToSearch = (element) => element.id === productId;
          let position = await cart.objects.findIndex(idToSearch);

          if (position === -1) {
            cart.objects.push({ id: productId, quantity: 1 });
          } else {
            let cartProduct = cart.objects[position];
            cartProduct.quantity += 1;
            cart.objects.splice(position, 1, cartProduct);
          }
          let cartIdToSearch = (element) => element.id == cartId;
          let cartPos = await carts.findIndex(cartIdToSearch);
          carts.splice(cartPos, 1, cart);
          carts = JSON.stringify(carts);
          fs.writeFileSync(`${this.path}carrito.json`, carts);
          return "Producto agregado con exito";
        }
      }
    } else {
      return false;
    }
  };

  delete = async (cartId) => {
    if (
      fs.existsSync(`${this.path}carrito.json`) &&
      fs.existsSync(`${this.path}productos.json`)
    ) {
      let carts = await JSON.parse(
        fs.readFileSync(`${this.path}carrito.json`, "utf-8")
      );
      let cart = carts.find((element) => element.id == cartId);
      if (cart == undefined) {
        return "No se encuentra ningun carrito con ese ID";
      } else {
        carts.splice(cart, 1);
        return "Carrito eliminado";
      }
    } else {
      return false;
    }
  };
}

export default CartManager;
