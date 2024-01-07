export interface NoteModel {
    _id : string
    title : string
    description: string
    createdAt: string
    updatedAt : string
}
export interface createNote {
    title: string;
    description?: string;
}