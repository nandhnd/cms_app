const {Product} = require ('../models')
const home = async(req, res) => {
  if (!req.session.user) {
    res.redirect('login')
  }else{
      try {
        const data = await Product.findAll()
  
        const result ={
          status: 'ok',
          data: data,

        }
        res.render('index', {data: result.data, session: req.session, title: 'home'})
      } catch (error) {
        console.log(error,'<-error')
      }   
    }
  
}

const addToCart = async(req, res) => {
  if (!req.session.user) {
    res.redirect('login')
  }else{
    const {id, nama, harga} = req.body  
    let count = 0
    for(let i = 0; i < req.session.cart.length; i++){
      if(req.session.cart[i].id === id){
        req.session.cart[i].quantity += 1
        count++
      }
    }
    if(count === 0){
      const cart_data = {
        id: id,
        nama: nama,
        harga: parseFloat(harga),
        quantity: 1
      }
      req.session.cart.push(cart_data)
    }
    res.redirect('/home')
  }
  
}

const deleteFromCart = async(req, res) => {
  if (!req.session.user) {
    res.redirect('login')
  }else{
    const {id} = req.body  
    for(let i = 0; i < req.session.cart.length; i++){
      if (req.session.cart[i].id === id) {
        req.session.cart.splice(i, 1)
      }
    }
    res.redirect('/home')
  }
}

const checkout = async(req, res) => {
  if (!req.session.user) {
    res.redirect('login')
  }else{
    res.render('vcheckout', {session: req.session, title: 'checkout'})
  }
}

const prosesCheckout = async(req, res) => {
  if (!req.session.user) {
    res.redirect('login')
  }else{
    req.session.cart=[]
    res.redirect('home')
  }
}



module.exports = {home, addToCart, deleteFromCart, checkout, prosesCheckout}