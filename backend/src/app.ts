import 'dotenv/config'
import exp, { NextFunction, Request, Response } from 'express'
import noteRoutes from './routes/notes'

const app = exp()

app.use(exp.json())

app.use("/api/notes", noteRoutes) //This will set our URL (api/notes = INPUT)

app.use((req, res, next) => {
    next(Error('Endpoint not found'))
})

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => { 
    console.error(error)
    let emsg = 'An unknown error has occurred'
    if (error instanceof Error) emsg = error.message
    res.status(500).json({error: emsg})
})

export default app