import { useEffect, useState } from "react";
import { NoteModel } from "./types/notes";
import axios from "axios";
import Note from "./components/Note";
import FormModal from "./components/FormModal";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/notes");
        setNotes(data.notes);
      } catch (error) {
        console.log(error);
      }
    };
    loadNotes();
  }, [notes]);

  return (
    <>
      <div className="mt-6 p-6">
        <FormModal />
        <div className="grid grid-cols-3 p-20">
          {notes.map((note) => (
            <Note key={note._id} note={note} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
