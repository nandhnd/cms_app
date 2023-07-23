const { QueryTypes } = require('sequelize')
const { sequelize } = require('sequelize')
const session = require('express-session')

const {User} = require ('../models')

const sessionCheck = (req, res) => {
  res.render('vlogin', {title: 'login', session:{role: 'admin'}})
}

const login = (req, res) => {
  if (!req.session.user) {
  res.render('vlogin', {title: 'login'})
  }else{
    res.redirect('/home')
  }
}

const proseslogin = async (req, res) => {
  const user = await User.findOne({ where : {username : req.body.username }})
  if(user){
    if(user.password == req.body.password){
        req.session.user = user.username
        req.session.role = user.role
        req.session.cart = []
        console.log(req.session)
        res.redirect('/home')
    } else {
      res.redirect('/login')
    }
  
  }else{
    res.redirect('/login')
  }
  }

const logout = (req, res) => {
  req.session.destroy(function(err) {
    console.log('Destroyed session')
  })
  res.redirect('/');
}

 async function getUsers(){
  try {
    const data = await User.findAll()

    const result ={
      status: 'ok',
      data: data 
    }

    return result
  } catch (error) {
    console.log(error,'<-error')
  }
}

module.exports = {sessionCheck, login, proseslogin, logout}