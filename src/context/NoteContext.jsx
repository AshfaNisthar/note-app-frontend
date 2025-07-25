import { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {

  const [noteList, setNoteList] = useState([]);

  const loadNotes = async () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendUrl}/api/notes/getAll`);
    const data = await response.json();

    setNoteList(data.Data);
  };

  const getTextnoteFromAudio = (audioUrl) =>{
    console.log(audioUrl)
  }

  return (
    <NoteContext.Provider value={{ noteList, setNoteList, loadNotes, getTextnoteFromAudio}}>
      {children}
    </NoteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotes = () => useContext(NoteContext);
