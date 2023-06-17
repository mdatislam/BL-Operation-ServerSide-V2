const express = require('express')
const router = express.Router()
const userController= require('../Controllers/User.Controller')

router.route('/singUp').post(userController.createUser).get(userController.getUser)


module.exports=router