import axios from "axios";
import { NoteModel, createNote } from "../types/notes";

const createNote = async (noteData: createNote) => {
  try {
    const response = await axios.post("http://localhost:5000/api/v1/notes", {
      ...noteData,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
const updateNote = async (id: string, note: createNote): Promise<NoteModel> => {
  const response = await axios.put(`http://localhost:5000/api/v1/notes/${id}`, {
    ...note,
  });
  return response.data as NoteModel;
};

const deleteNote = async (id: string) => {
  console.log(id);
  return await axios.delete(`http://localhost:5000/api/v1/notes/${id}`);
};
export { createNote, deleteNote, updateNote };
