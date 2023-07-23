const express = require('express')
const session = require('express-session')
const fileUpload = require('express-fileupload')
 
const app = express()
const port = 3000
const router = require('./routes/index')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(fileUpload())
app.set('trust proxy', 1)
app.use(session({
  secret: 'greatsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false}
}))

app.use(router)

app.listen(port, () => console.log(`port ${port}`))