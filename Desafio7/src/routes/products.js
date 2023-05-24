import { Router } from "express";
import auth from "../middleware/auth.js";
import ProductController from "../controllers/product.js";

const router = Router();

const productController = new ProductController();

router.get("/", auth("session"), productController.getProducts);

router.get("/view", auth("session"), productController.getView);

router.get("/:pid", productController.getPID);

router.post("/", productController.addProduct);

router.put("/:pid", productController.updateProduct);

router.delete("/:pid", productController.deleteProduct);


export default router;


