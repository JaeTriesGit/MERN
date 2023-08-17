import 'dotenv/config'
import morgan from 'morgan' 
import exp, { NextFunction, Request, Response } from 'express'
import noteRoutes from './routes/notes'
import userRoutes from './routes/users'
import createHttpError, { isHttpError } from 'http-errors'
import session from 'express-session'
import env from './util/envVal'
import MongoStore from 'connect-mongo'
import requireAuth from './middleware/auth'

const app = exp()

app.use(morgan('dev')) 

app.use(exp.json())

app.use(session({ //Session setup
    secret: env.Session_Secret, //We need a secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.Mongo_Connection
    })
}))

app.use("/api/notes", requireAuth, noteRoutes) //Connecting our notes route
//app.use("ROUTE-URL", ConnectTo)
app.use('/api/users', userRoutes) //Connecting our users route

app.use((req, res, next) => {
    next(createHttpError(404, 'Endpoint not found'))
})

//createHttpError(httpStatusCode, 'CustomMessage')
//isHttpError is a checking function for HttpError

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => { 
    console.error(error)
    let emsg = 'An unknown error has occurred'
    let statusCode = 500
    if (isHttpError(error)) {
        statusCode = error.status
        emsg = error.message
    }
    res.status(statusCode).json({error: emsg})
})

export default app