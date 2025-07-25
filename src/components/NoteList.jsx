import { Link } from "react-router";
import Note from "./Note";
import { useNotes } from "../context/NoteContext";

function NoteList() {

    const { noteList } = useNotes();

    return (
        <div className="mt-12 mb-4 px-3 overflow-y-scroll">
            <div className="flex flex-wrap gap-4 sm:justify-center lg:justify-start">
                {noteList.map((note) => (
                    <Link to={`view-note/${note._id}`} key={note._id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                        <Note {...note} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default NoteList;
