const { home, addToCart, deleteFromCart, checkout, prosesCheckout } = require('../controllers/home')
const { login, proseslogin, logout} = require('../controllers/login')
const { user, createNewUser, updateUser, destroyUser, tambahuser, editUser } = require('../controllers/user')
const { product, tambahproduct, createNewProduct, editProduct, updateProduct, destroyProduct } = require('../controllers/product')

var methodOverride = require('method-override')
const session = require('express-session')
const router = require('express').Router()

router.get('/', home)
router.get('/login', login)
router.post('/loginproses', proseslogin)

router.get('/logout', logout)
router.get('/home', home)
router.post('/addtocart', addToCart)
router.post('/deletefromcart', deleteFromCart)
router.post('/checkout', checkout)
router.post('/prosescheckout', prosesCheckout)
router.get('/user', user)
router.get('/product', product)

// proses user
router.get('/tambahuser', tambahuser)
router.post('/createnewuser', createNewUser)
router.post('/edituser/:id', editUser)
router.post('/updateuser/:id/resource', methodOverride('_method'))
router.patch('/updateuser/:id/resource', updateUser)
router.post('/deleteuser/:id/resource', methodOverride('_method'))
router.delete('/deleteuser/:id/resource', destroyUser)

//proses product
router.get('/tambahproduct', tambahproduct)
router.post('/createnewproduct', createNewProduct)
router.post('/editproduct/:id', editProduct)
router.post('/updateproduct/:id/resource', methodOverride('_method'))
router.patch('/updateproduct/:id/resource', updateProduct)
router.post('/deleteproduct/:id/resource', methodOverride('_method'))
router.delete('/deleteproduct/:id/resource', destroyProduct)


module.exports = router