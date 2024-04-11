import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/*-------------------
@desc     add product
@route    POST api/v1/products/
@access  private
*/
const addProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    category,
    brand,
    stockQuantity,
    flashSale,
    salePrice,
    saleEndDate,
  } = req.body;

  let imagePath = req.files?.image[0].path;

    if (!imagePath) {
      throw new ApiError(400, "Product file is required");
    }

  const uploadedImage = await uploadOnCloudinary(imagePath);

    if (!uploadedImage) {
      throw new ApiError(500, "Failed to upload product image");
    }

  const product = await Product.create({
    title,
    description,
    price,
    category,
    image: uploadedImage.url,
    stockQuantity,
    brand,
    flashSale,
    salePrice,
    saleEndDate,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product added successfully"));
});

/*-------------------
@desc     get All products
@route    POST api/v1/products/
@access  public
*/
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

export const productControllers = {
  addProduct,
  getAllProducts,
};
