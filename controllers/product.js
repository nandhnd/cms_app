const path = require('path')
const fs = require('fs');
const {Product} = require ('../models')

const product = async (req, res) => {
  if (!req.session.user) {
    res.redirect('login')
  }else{
  try {
    const data = await Product.findAll()

    const result ={
      status: 'ok',
      data: data 
    }

    res.render('vproduct', {data: result.data, session: req.session, title: 'product'})

  } catch (error) {
    console.log(error,'<-error')
  }
}
}

const tambahproduct = (req, res) => {
  res.render('vtambahproduct', {session: req.session, title: 'product'})
}


const createNewProduct = (req, res) => {
  if (req.file === null) return res.redirect('tambahproduct')
  const {nama, harga} = req.body
  const file = req.files.file
  const fileName = file.name 
  const ext = path.extname(file.name)
  const allowedType =  ['.png', '.jpg', '.jpeg']

  if(!allowedType.includes(ext.toLowerCase())) return res.redirect('tambahproduct')
  file.mv(`./public/img/${fileName}`, async(err) => {
    if(err) return console.log('gagal simpan file')
    console.log('berhasil simpan file')
    try {
      const newProduct = await Product.create({nama: nama, harga: harga, image: fileName})
      res.redirect('/product')
    } catch (error) {
      console.log(error, '<-- error create new user')
    }
  })
}

const editProduct = async (req, res) => {
  try {
    const {id} = req.params
    const data = await Product.findByPk(id)

    const result ={
      status: 'ok',
      data: data 
    }

    // res.send(result.data)
    // console.log(result.data)
    res.render('vupdateproduct', {data: result.data})

  } catch (error) {
    console.log(error,'<-error')
  }
}

const updateProduct = async (req, res) => {
  try {
    const {id} = req.params
    const {nama, harga} = req.body
    const product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({
        status: 'failed',
        message: `product with ${id} is not exists`
      })
    }

    product.nama = nama
    product.harga = harga
    product.updatedAt = new Date()
    product.save()

    // res.json({
    //   status: 'ok',
    //   data: {
    //     id: user.id,
    //     username: user.username,
    //     password: user.password,
    //     role: user.role,
    //     createdAt: user.createdAt,
    //     updatedAt: user.updatedAt,
    //   }
    // })
    res.redirect('/product')
  } catch (error) {
    console.log(error, '<-- error update product')
  }
}

const destroyProduct = async (req, res) => {
  const {id} = req.params
  const product = await Product.findByPk(id)
  try {
    // const filePath = `./public/img/${product.image}`
    // fs.unlinkSync(filePath) 
    if (!product) {
      return res.status(404).json({
        status: 'failed',
        message: `user with ${id} is not exists`
      })
    }

    product.destroy()

    // res.json({
    //   status: 'ok',
    //   message: `success delete book with id ${id}`
    // })
    res.redirect('/product')
  } catch (error) {
    console.log(error, '<-- error update product')
  }
}


module.exports = {product, tambahproduct , createNewProduct, updateProduct, destroyProduct, editProduct}