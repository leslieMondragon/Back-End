import { request } from "express";
import { productService } from "../services/index.js"
import CustomError from "../services/errors/CustomError.js";
import { EErrors } from "../services/errors/enums.js";

class ProductController {
  getProducts = async (req = request, res) => {
    const { limit, page, query, sort } = req.query;
    const { docs, totalPages,hasPrevPage, hasNextPage, prevPage, nextPage } = await productService.getProducts(limit, page, query, sort);
    if(!docs || docs.length === 0){
      return res.status(404).json({
          msg: 'No existen productos',
          products: false
      })
  }   
  res.status(200).json({
      status: 'success',
      payload: docs,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      prevLink: prevPage ? `http://localhost:8080/api/products?page=${prevPage}` : null,
      nextLink: nextPage ? `http://localhost:8080/api/products?page=${nextPage}` : null,
      page
  })
  };

  getView = async (req = request, res) => {
    const { limit, page, query, sort } = req.query;
    let info = await productService.getProducts(limit, page, query, sort);
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
      // res.status(401).send({ status: "error", message: "No existe sesion" });
      CustomError.createError({
        name: "Session has finished",
        cause: sessionErrorInfo(),
        message: "Error in setting a user from session",
        code: EErrors.SESSION_ERROR
      })
    }
  };



  getPID = async (req = request, res) => {
    const { pid } = req.params;
    console.log(pid);
    let products = await productService.getProduct(parseInt(pid));
    res.send(products);
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
      // return res.status(400).send({ message: "Datos faltantes" });
    });
      CustomError.createError({
        name: "Product not created",
        cause: createProductErrorInfo({
          title : product.title, 
          description : product.description,
          code: product.code,
          price: product.price,
          stock: product.stock,
          category: product.category
        }),
        message: "Error in creating a product",
        code: EErrors.INVALID_TYPES_ERROR
      })
    }
    productService.createProduct(
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
      productService.updateProduct(parseInt(pid), keyValue);
    });

    res.status(201).send({
      product,
      message: "usuario Modificado",
    });
  };

  deleteProduct = async (req = request, res) => {
    const { pid } = req.params;
    productService.deleteProduct(parseInt(pid));
    res.status(201).send({
      message: "Producto Eliminado",
    });
  };
}

export default ProductController;
