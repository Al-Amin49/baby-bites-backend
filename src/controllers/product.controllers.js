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
 // Convert product to JSON including virtual properties
 const productJSON = product.toJSON({ virtuals: true });
  return res
    .status(201)
    .json(new ApiResponse(201, productJSON, "Product added successfully"));
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

/*-------------------
@desc    GET single product
@route    GET api/v1/products/:id
@access  public
*/
const getSingleProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

/*-------------------
@desc     update single product
@route    PUT api/v1/products/:id
@access   private
*/
const updateSingleProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title,description, price,category, brand, stockQuantity,flashSale,salePrice,saleEndDate} = req.body;

  // Check if the product with the specified ID exists
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    throw new ApiError(404, "Product not found");
  }

  // Update the product
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { title,description, price,category, brand, stockQuantity,flashSale,salePrice,saleEndDate} ,
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

/*-------------------
@desc     delete single product
@route    DELETE api/v1/products/:id
@access   private
*/
const deleteSingleProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if (!deletedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});
export const productControllers = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct
};
