import { useEffect, useState } from "react";
import { Note } from "./types/notes";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/notes");
        setNotes(data.notes)
      } catch (error) {
        console.log(error);
      }
    };
    loadNotes();
  }, []);

  return <><div className="text-3xl font-bold underline">{JSON.stringify(notes)}</div></>;
}

export default App;
