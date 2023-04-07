import fs from 'fs'
export default class CartManager {
    #carts
    constructor(path){
        this.path = path
        this.#carts = []
        this.#createFile()
    }

    async #createFile () {
        try {
          let data = await fs.promises.readFile(this.path, 'utf-8')
          let dataJS = JSON.parse(data)
          this.#carts = dataJS
        } catch (error){
          await this.#addCartToFile(this.path, this.#carts)
        }
    }

    async #addCartToFile (path, data) {
        await fs.promises.writeFile(path, JSON.stringify(data))
    }

    async createCart (){
        let newId = 1
        if (this.#carts.length > 0) newId = this.#carts.length + 1
        this.#carts.push({
            id: newId,
            products: []
        })
        this.#addCartToFile(this.path, this.#carts)
    }

    async #allCarts (){
        try {
            let data = await fs.promises.readFile(this.path, 'utf-8')
            let dataJS = JSON.parse(data)
            return dataJS
          } catch (error){
            console.log(error)
          }
    }

    async getCart (id){
        let data = await this.#allCarts()

        function findId(cart) {
            return cart.id === id;
          }
      
          if (data.find(findId) === undefined) {
            console.log("No existe carrito con ese ID");
          } else {
            return data.find(findId);
          }
    }

    async addProduct (cid, pid){
        let cart = await this.getCart(cid)
        let products = cart.products

        function findId(product) {
            return product.id === pid;
        }
      
          if (products.find(findId) === undefined) {
            products.push({
                id: pid,
                quantity: 1
            })
            this.#reWriteCart(cart)
            return cart
          }
          else {
            products.find(findId).quantity++
            this.#reWriteCart(cart)
            return cart
          } 
    }

    async #reWriteCart(newCart) {

      function removeObjectWithId(arr, id) {
        const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
        if (objWithIdIndex > -1) arr.splice(objWithIdIndex, 1)
        return arr;
      }

        removeObjectWithId(this.#carts, newCart.id)
        this.#carts.push(newCart)
        this.#addCartToFile(this.path, this.#carts)
    }
}