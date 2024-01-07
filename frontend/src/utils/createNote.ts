import axios from "axios"
interface createNote {
    title: string
    description?: string    
}

const createNote = async (noteData: createNote)=>{
    const response = await axios.post("http://localhost:5000/api/v1/notes",{
        ...noteData,
    })
    return response
}
export default createNote