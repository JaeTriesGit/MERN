import {InferSchemaType, model, Schema} from 'mongoose' //Getting stuff we need from mongoose

const noteSchema = new Schema({ //This is an example of a note
    title: { type: String, required: true },
    text: {type: String},
    userId: {type:Schema.Types.ObjectId, required:true}
}, {timestamps: true})

type Note = InferSchemaType<typeof noteSchema> //We can name this anything, Note is just a temp

export default model<Note>("Note", noteSchema)