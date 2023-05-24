import { request } from "express";
import ProductManager from "../dao/ProductManager.js";
const productManager = new ProductManager();

class ProductController {
  getProducts = async (req = request, res) => {
    const { limit, page, query, sort } = req.query;
    let products = await productManager.getProducts(limit, page, query, sort);
    let info = {
      status: products !== undefined ? "success" : "error",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink,
      nextLink: products.nextLink,
    };
    res.send(info);
  };

  getView = async (req = request, res) => {
    const { limit, page, query, sort } = req.query;
    let info = await productManager.getProducts(limit, page, query, sort);
    let products = info.docs;
    products = products.map((item) => item.toObject());
    if (req.session.user !== undefined) {
      console.log(req.session.admin);
      let user = {
        first_name: req.session.user.first_name
          ? req.session.user.first_name
          : req.session.user.name,
        isAdmin: req.session.user.admin ? "admin" : "user",
      };
      res.render("products", {
        user,
        products,
      });
    } else {
      res.status(401).send({ status: "error", message: "No existe sesion" });
    }
  };

  // postView =  async (req=request, res) => {

  // }

  getPID = async (req = request, res) => {
    const { pid } = req.params;
    console.log(pid);
    let products = await productManager.getProductById(parseInt(pid));
    console.log(products);
  };

  addProduct = async (req = request, res) => {
    let product = req.body;
    if (
      !product.title ||
      !product.description ||
      !product.code ||
      !product.price ||
      !product.stock ||
      !product.category
    ) {
      return res.status(400).send({ message: "Campos faltantes" });
    }
    productManager.addProducts(
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock,
      product.category
    );
    res.status(201).send({
      product,
      message: "producto agregado",
    });
  };

  updateProduct = async (req = request, res) => {
    const { pid } = req.params;
    let product = req.body;
    let entries = Object.entries(product);
    entries.forEach(async (keyValue) => {
      console.log(pid, keyValue);
      productManager.updateProduct(parseInt(pid), keyValue);
    });

    res.status(201).send({
      product,
      message: "usuario Modificado",
    });
  };

  deleteProduct = async (req = request, res) => {
    const { pid } = req.params;
    productManager.deleteProduct(parseInt(pid));
    res.status(201).send({
      message: "Producto Eliminado",
    });
  };
}

export default ProductController;
