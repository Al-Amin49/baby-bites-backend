import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const userSchema= new Schema(
    {
        username:{
            type:String,
            required:[true, 'Username is required'],
            trim:true
        },
        email:{
            typ:String,
            requird:[true, 'Email is requied'],
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:[true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
            maxlength: [20, 'Password cannot be more than 20 characters']
        },
        role:{
            type:String,
            enum:['user','admin'],
            trim:true,
            default:'user'
        },
        profile:{
            type:String,
            default:'https://cdn-icons-png.freepik.com/256/1077/1077012.png?uid=R139182508&ga=GA1.1.1449054835.1702407798&'
        }
    },
    {timestamps:true}

)

//match user entered password to hashed password
userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
  }
  // Encrypt password using bcrypt before saving
  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  //generate token
  userSchema.methods.generateAuthToken=function(){
    return jwt.sign(
      {
        _id:this._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn:process.env.JWT_EXPIRY
      }
  
    )
  }
  
export const User= mongoose.model('User', userSchema)