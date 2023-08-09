import {cleanEnv} from 'envalid'
import {port, str} from 'envalid/dist/validators'

export default cleanEnv(process.env, {
    Mongo_Connection: str(),
    PORT: port(),
})