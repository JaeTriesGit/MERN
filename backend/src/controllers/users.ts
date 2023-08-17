import { RequestHandler } from "express";
import UserModel from '../models/user'
import createHttpError from "http-errors";
import bcrypt from 'bcrypt'

import Auth from '../middleware/auth'

export const AuthenticateUser: RequestHandler = async (req,res,next) => {
    const currentUserId = req.session.userId

    try{
        const gotUser = await UserModel.findById(currentUserId).select("+email").exec()
        res.status(200).json(gotUser)
    } catch(error){
        next(error)
    }
}

interface SignBody {
    username?:string,
    email?:string,
    password?:string
}

//We are using bcrypt for password hashing
//We are using express-session for login cookies
//bcrypt: https://www.npmjs.com/package/bcrypt

export const signUp: RequestHandler<unknown, unknown, SignBody, unknown> = async (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const passwordRaw = req.body.password

    try{
        //Check if username, email or password is missing
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, 'Missing information!')
        }

        //Check for username in UserModel
        const existingUsername = await UserModel.findOne({username: username}).exec()
        if (existingUsername) {
            throw createHttpError(409, 'Username already taken.')
        }

        //Check for email in UserModel
        const existingEmail = await UserModel.findOne({email:email}).exec()
        if (existingEmail){
            throw createHttpError(409, 'Email already in use!')
        }
        //Gotta hash that pass!
        const hashPass = await bcrypt.hash(passwordRaw, 10)
        //Here we create the account
        const CreatedUser = await UserModel.create({
            username:username,
            email:email,
            password:hashPass
        })

        req.session.userId = CreatedUser._id

        res.status(201).json(CreatedUser) //Send to user
        //We can easily hash the raw password with bcrypt
        // bcrypt.hash(RAWPASS, Salt) 

    } catch(error){
        next(error)
    }
}

interface LoginBody {
    username?:string,
    password?:string
}
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req,res,next) => {
    const usr = req.body.username
    const pw = req.body.password

    try{
        if (!usr || !pw) {
            throw createHttpError(409, 'Credentials are invalid')
        }

        const User = await UserModel.findOne({username:usr}).select('+password +email').exec()

        if (!User){
            throw createHttpError(401, 'User does not exist')
        }

        const PWM = await bcrypt.compare(pw, User.password) //Returns true or false depending on if the passwords match

        if (!PWM) {
            throw createHttpError(401, 'Invalid credentials')
        }

        req.session.userId = User._id
        res.status(201).json(User) //Send to user

    } catch(error){
        next(error)
    }
}

export const logout: RequestHandler = async(req,res,next) => {
    req.session.destroy(error => {
        if (error) {
            next(error)
        } else {
            res.sendStatus(200)
        }
    })
    //destroy(callback)
}