export interface Note {
    _id: string, //Mongodb uses _id
    title: string,
    text?: string,
    createdAt: string,
    updatedAt: string
}