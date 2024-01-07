import { useEffect, useState } from "react";
import { NoteModel } from "../types/notes";
import axios from "axios";
import Note from "../components/Note";
import FormModal from "../components/FormModal";
import { deleteNote } from "../utils/createNote";


function NotesUI() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteModel | null>(null)
  const [modalState, setModalState] = useState(false)

  const loadNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/notes");
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadNotes();
  },[]);

  const handleDelete = async (note: NoteModel) => {
    await deleteNote(note._id)
    loadNotes()
  }
  const editNote = async (note: NoteModel | null) =>{
    setSelectedNote(note)
    setModalState(!modalState)
  }
  return (
    <>
      <div className="mt-6 p-6">
        <span className="flex justify-between w-2/3 m-auto text-3xl font-semibold p-3">
          ALL NOTES
          <FormModal noteToEdit={selectedNote}  openModal = {modalState}/>
        </span>
        <div className="grid grid-cols-3 p-20 min-w-min">
          {notes.map((note) => (
            <Note key={note._id} note={note} deleteNote={handleDelete} editNote={() => {editNote(note)}} />
          ))}
        </div>
      </div>
    </>
  );
}

export default NotesUI;
