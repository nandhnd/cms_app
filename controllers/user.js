const {User} = require ('../models')
const user = async (req, res) => {
  if (!req.session.user) {
    res.redirect('login')
  }else{
  try {
    const data = await User.findAll()

    const result ={
      status: 'ok',
      data: data 
    }

    // res.send(result.data)
    // console.log(result.data)
    res.render('vuser', {data: result.data, session: req.session, title: 'user'})

  } catch (error) {
    console.log(error,'<-error')
  }
}
  // res.render('vuser')
}

const tambahuser = (req, res) => {
  res.render('vtambahuser', {session: req.session, title:'user'})
}

const createNewUser = async (req, res) => {
  try {
    const {username, password, role} = req.body
    const newUser = await User.create({username: username, password: password, role: role})
    // res.status(201).json({
    //   status: 'ok',
    //   data: {
    //     id: newUser.id,
    //     username: newUser.username,
    //     password: newUser.password,
    //     role: newUser.role,
    //     createdAt: newUser.createdAt,
    //     updatedAt: newUser.updatedAt,
    //   }
    // })
    res.redirect('/user')
  } catch (error) {
    console.log(error, '<-- error create new user')
  }
}

const editUser = async (req, res) => {
  try {
    const {id} = req.params
    const data = await User.findByPk(id)

    const result ={
      status: 'ok',
      data: data 
    }

    // res.send(result.data)
    // console.log(result.data)
    res.render('vupdateuser', {data: result.data, session: req.session})

  } catch (error) {
    console.log(error,'<-error')
  }
  // res.render('vupdateuser')
}

const updateUser = async (req, res) => {
  try {
    const {id} = req.params
    const {username, password, role} = req.body
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: `user with ${id} is not exists`
      })
    }

    user.username = username
    user.password = password
    user.role = role
    user.updatedAt = new Date()
    user.save()

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
    res.redirect('/user')
  } catch (error) {
    console.log(error, '<-- error update user')
  }
}

const destroyUser = async (req, res) => {
  try {
    const {id} = req.params
    console.log(id)
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: `user with ${id} is not exists`
      })
    }

    user.destroy()

    // res.json({
    //   status: 'ok',
    //   message: `success delete book with id ${id}`
    // })
    res.redirect('/user')
  } catch (error) {
    console.log(error, '<-- error update user')
  }
}


module.exports = {user, createNewUser, updateUser, destroyUser, tambahuser, editUser}