import { NoteModel } from "../types/notes";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, description, createdAt, updatedAt } = note;
  return (
    <>
      <div className="card-container w-3/4 shadow-xl shadow-slate-300 rounded-xl p-5">
        <div className="notes--wrapper h-64 w-100 flex flex-col justify-center">
          <span className="text-2xl mb-4 font-bold">Title:</span>
          <h1 className="text-4xl font-poppins mb-3 tracking-wide medium">
            {title}
          </h1>
          <p className="text-2xl mt-2">{description}</p>
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
