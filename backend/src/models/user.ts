import {InferSchemaType, model, Schema} from 'mongoose'

const userSchema = new Schema({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true, select:false},
    password:{type:String, required:true, select:false}
}) //select:false ensures that variable not getting imported

type User = InferSchemaType<typeof userSchema>

export default model<User>('User', userSchema)