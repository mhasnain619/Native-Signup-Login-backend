import express from 'express'
import { loginController } from '../controller/loginController.js'
import { signupController } from '../controller/signUoController.js'
import { getAllUserController } from '../controller/getAllUserConntroller.js'
import { tokenVerification } from '../middleware/middleware.js'
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controller/productController.js'
const router = express.Router()

router.route('/api/signup').post(signupController)
router.route('/api/login').post(loginController)
router.route('/api/getUsers').get(getAllUserController)
router.route('/api/getAllProducts').get(getAllProducts)
router.route('/api/getAllProducts/:id').get(getAllProducts)
router.route('/api/deleteProducts/:id').delete(deleteProduct)
router.route('/api/update').put(updateProduct)
router.route('/api/createProducts').post(createProduct)

export default router