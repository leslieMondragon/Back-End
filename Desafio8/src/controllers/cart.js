import { request } from "express";
// import CartManager from "../dao/CartManager.js";
// const cartManager = new CartManager();
import { cartService, ticketService, userService } from "../services/index.js"
import transport from "../utils/mailer.js";

class CartController {
  getView = async (req = request, res) => {
    const { cid } = req.params;
    let info = await cartService.getCart(cid);
    let products = info.products;
    products = products.map((item) => item.toObject());
    let cart = {
      _id: info._id,
      products,
    };
    res.render("carts", {
      cart,
    });
  };

  createCart = async (req = request, res) => {
    //carrito: id y array de products vacio
    await cartService.createCart();
    res.status(201).send("Nuevo Carrito");
  };

  getCart = async (req = request, res) => {
    //array de productos de carrito seleccionado
    const { cid } = req.params;
    let cart = await cartService.getCart(cid);
    res.status(201).send({ products: cart.products });
  };

  addProductQuantity = async (req = request, res) => {
    //agregar producto a carrito seleccionado (objeto con el id y cantidad de productos)
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    let cart = await cartService.addProductQuantity(cid, pid, quantity);
    res.status(201).send({
      "new cart": cart,
      message: "Añadido!",
    });
  };

  addProducts = async (req = request, res) => {
    const { cid } = req.params;
    let array = req.body;
    let cart = await cartService.addProducts(cid, array);
    res.status(201).send({
      "new cart": cart,
      message: "Añadidos!",
    });
  };

  deleteProduct = async (req = request, res) => {
    const { cid, pid } = req.params;
    let cart = await cartService.deleteProduct(cid, pid);
    res.status(201).send({
      "new cart": cart,
      message: "Eliminado!",
    });
  };

  deleteCart = async (req = request, res) => {
    const { cid } = req.params;
    let cart = await cartService.deleteCart(cid);
    res.status(201).send({
      "new cart": cart,
      message: "Carrito eliminado",
    });
  };

  finishProcess = async (req = request, res) => {
    const { cid } = req.params;
    let cart = await cartService.getCart(cid)
    let confirmation = await cartService.finishProcess(cart)
    if (confirmation.products.length > 0) {
      let user = await userService.getUserByEmail(req.session.user.email)
      let ticket = await ticketService.createTicket(confirmation, user._id)
      let result = await transport.sendMail({
        from: "Coder Tests <joaquinunez2004@gmail.com>",
        to: "joaquinunez2004@gmail.com",
        subject:"New Ticket",
        html: `<div>
        <h1>Purchase confirmed!</h1>
        <h2>Dates of purchase: </h2>
        <div>
          <p>Ticket ID: ${ticket._id.toString()}</p>
          <p>Purchaser ID: ${ticket.purchaser.toString()}</p>
          <p>Purchase time: ${ticket.purchase_datetime}</p>
          <p>Amount: ${ticket.amount}</p>
          <p>Cart: </p>
          <ul>
            ${ticket.cart.products.map((element)=>{
                return (`<li>${element.productId.title}</li>`)
            })}
          </ul>
        </div>
        </div>`
      })
      res.status(201).send({
        "new ticket": ticket,
        "new cart": confirmation,
        message: "Cart Processed",
      });
    }
    else {
      res.status(400).send({
        // "new ticket": ticket,
        // "new cart": confirmation,
        message: "We couldn't finish the purchase, please add products with stock",
      });
    }
  }
}

export default CartController;
