import express from "express";
import { productControllers } from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    productControllers.addProduct
  )
  .get(productControllers.getAllProducts);

export default router;
