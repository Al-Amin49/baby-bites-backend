import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*-------------------
@desc     create a new user
@route    POST api/v1/users/register
@access  public
*/
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "Email already exists");
  }
  const user = await User.create({
    username,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  res
    .status(201)
    .json(new ApiResponse(200, user, "User registered succesfully"));
});
/*-------------------
@desc     Auth user & get token
@route    POST api/v1/users/login
@access  public
*/
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  //password matches
  const isPasswordValid = await user.matchPassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User credentials");
  }
  //token
  const token = user.generateAuthToken();
  return res
  .status(200).
  json(
    new ApiResponse(
        200,
        {user, token},
       'User logged in successfully'
  ));
});

export const getUserDetails=asyncHandler(async(req, res)=>{
 const user= await User.findById(req.user._id);
 if(user){
    res.json({
        _id: user._id,
        username: user.username,
        email: user.email
    })
 }
 else{
    throw new ApiError(404, 'User Not found')
 }
})
export const userControllers = {
  registerUser,
  loginUser,
  getUserDetails
};
