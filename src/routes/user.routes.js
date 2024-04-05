import express from 'express';
import { userControllers } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.route('/register').post(userControllers.registerUser);
router.route('/login').post(userControllers.loginUser);
//secured route
router.route('/user-details').get(protect, userControllers.getUserDetails);

export default router;