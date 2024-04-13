import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: Number,
    comment: String,
  },
  { timestamps: true }
);


const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default:0
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    brand: {
      type: String,
    },
    flashSale: {
      type: Boolean,
      default: false,
    },
    salePrice: {
      type: Number,
    },
    saleEndDate: {
      type: Date,
    },
    reviews: [reviewSchema],
  
  },

  { timestamps: true }
);

//discount field based on  price and SalePrice
productSchema.virtual('discount').get(function(){
  if(this.flashSale && this.salePrice){
    return ((this.price-this.salePrice)/this.price)*100;
  }
  else{
    return 0;
  }
})
export const Product = mongoose.model("Product", productSchema);
