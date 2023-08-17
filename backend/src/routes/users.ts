import express from 'express'
import * as UsersController from '../controllers/users'

const Router = express.Router()
//Router.post(URL, ForwardingFunc)
Router.get('/', UsersController.AuthenticateUser)
//localhost:3000/api/users
Router.post('/signup', UsersController.signUp)
//localhost:3000/api/users/signup
Router.post('/login', UsersController.login)
//localhost:3000/api/users/login
Router.post('/logout', UsersController.logout)
//localhost:3000/api/users/logout
export default Router