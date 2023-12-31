import express from 'express'
import { authUser, getUserProfile, logOutUser, registerUser, updateUserProfile } from '../controllers/userController.js';
import { protectedRoute } from '../middlewares/authMiddleware.js';
import { addProductController, deleteProductController, productController ,singleProduct } from '../controllers/productController.js';
import { categoryController } from '../controllers/categoryController.js';
import storage from './multer.js' ;
import multer from 'multer';
const upload = multer({storage:storage }); 

const router = express.Router();
router.post('/auth',authUser)
router.post('/register',registerUser) 
router.post('/logout',logOutUser)
router.route('/profile').get(protectedRoute, getUserProfile).put(protectedRoute, updateUserProfile)
 
// product routes
router.get('/products', productController);
router.delete('/delete/:id', deleteProductController)
router.post('/addproduct', upload.array('image',5), addProductController); 
router.get('/product', singleProduct)

//category routes
router.get('/categories', categoryController)


export default router