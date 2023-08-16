import {cleanEnv} from 'envalid'
import {port, str} from 'envalid/dist/validators'

export default cleanEnv(process.env, {
    Mongo_Connection: str(), //String
    PORT: port(), //Port
    Session_Secret: str() //String
})

//This whole thing makes sure our .env values can be used on runtime