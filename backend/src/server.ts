import app from './app'
import env from './util/envVal'
import mong from 'mongoose'

const port = env.PORT //Gets the port from envVal

mong.connect(env.Mongo_Connection) //Tries to establish a connection
    .then(() => { //Runs after/if connection is established
        console.log('Mongoose connected')
        app.listen(port, () => { //Starts listening to port
            console.log('Listening to port: '+port)
        })
    })
    .catch(console.error) //In case errors happen