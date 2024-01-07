import { NoteModel } from "../types/notes";
import DeleteIcon from "@mui/icons-material/Delete";

interface NoteProps {
  note: NoteModel;
  deleteNote: (note: NoteModel) => void;
}

const Note = ({ note, deleteNote }: NoteProps) => {
  const { title, description, createdAt, updatedAt } = note;

  return (
    <>
      <div className="card-container w-4/5 shadow-xl shadow-slate-300 rounded-xl p-5 mb-7">
        <div className="notes--wrapper w-100 flex flex-col justify-center gap-2">
          <span className="flex justify-between text-xl mt-4 font-bold">
            Title:{" "}
            <span onClick={()=> deleteNote(note)}>
              {<DeleteIcon />}
            </span>
          </span>
          <h1 className="text-3xl font-poppins tracking-wide medium">
            {title}
          </h1>
          <p className="text-md mt-2 mb-4">{description}</p>
        </div>
        <div className="note--footer border-t-2">
          <small>
            Created at: {new Date(createdAt).toLocaleString()}
            <br />
            Updated At: {new Date(updatedAt).toLocaleString() || "Never"}
          </small>
        </div>
      </div>
    </>
  );
};

export default Note;
