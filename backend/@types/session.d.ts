import mongoose from 'mongoose'

//We have to declare userId in our sessionData, otherwise it does not exist (in controllers/user.ts)

declare module "express-session" {
    interface SessionData {
        userId: mongoose.Types.ObjectId
    }
}