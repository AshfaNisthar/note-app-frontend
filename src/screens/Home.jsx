import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import { useNotes } from "../context/NoteContext";

function Home() {
  const { loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex flex-col mx-auto">
      <Header />
      <NoteList />
      <Footer />
    </div>
  );
}

export default Home;
