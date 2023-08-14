import 'dotenv/config'
import morgan from 'morgan' 
import exp, { NextFunction, Request, Response } from 'express'
import noteRoutes from './routes/notes'
import createHttpError, { isHttpError } from 'http-errors'

const app = exp()

app.use(morgan('dev')) 

app.use(exp.json())

app.use("/api/notes", noteRoutes) //This will set our URL

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