import express from 'express'
import * as UsersController from '../controllers/users'

const Router = express.Router()

Router.get('/', UsersController.AuthenticateUser)

Router.post('/signup', UsersController.signUp)
// Router.post(URL, ForwardingFunc
Router.post('/login', UsersController.login)

Router.post('/logout', UsersController.logout)
export default Router