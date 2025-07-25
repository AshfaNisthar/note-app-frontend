import { useState } from "react";
import { useNavigate } from "react-router";
import { useNotes } from "../context/NoteContext";

function NewNote() {

  const { loadNotes } = useNotes()

  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  const navigate = useNavigate();

  const saveNote = async() => {

    if (title.trim() || noteText.trim()) {

      console.log("Saving note:", { title, noteText });

       const backendUrl = import.meta.env.VITE_BACKEND_URL;
       const response = await fetch(`${backendUrl}/api/notes/create`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               title: title,
               note: noteText,
               date: new Date(),
            }),
       }); 

       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
       }

       loadNotes();

      alert("Note saved successfully!");

      setTitle("");
      setNoteText("");

      navigate('/')

    } else {
      alert("Please add a title or note content before saving.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Create New Note</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your note..."
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Note Content */}
              <div className="space-y-2">
                <label htmlFor="noteText" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="noteText"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Start writing your note..."
                  className="w-full h-96 sm:h-80 lg:h-96 px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-colors"
                  rows={16}
                />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="px-6 py-4 sm:px-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
              <div className="text-sm text-gray-500">
                {noteText.length > 0 && (
                  <span>{noteText.length} characters</span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  disabled={!title.trim() && !noteText.trim()}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Card - Hidden on mobile */}
        <div className="hidden lg:block mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">💡 Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use a descriptive title to easily find your notes later</li>
            <li>• Your notes are automatically saved with timestamp</li>
            <li>• You can use markdown formatting in your content</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewNote;