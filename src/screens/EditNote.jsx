import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useNotes } from "../context/NoteContext";

function EditNote() {

    const {noteId} = useParams();
    const {noteList, loadNotes} = useNotes();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const [originalNote, setOriginalNote] = useState(null);

  useEffect(()=>{

    const note = noteList.find(note => note._id == noteId)
    if (!note) {
      navigate('/');
      return;
    }

    setTitle(note.title);
    setNoteText(note.note);
    setOriginalNote(note);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[noteId])

  const updateNote = async() => {

    if (title.trim() || noteText.trim()) {

       console.log("Updating note:", { title, noteText });

       const backendUrl = import.meta.env.VITE_BACKEND_URL;
       const response = await fetch(`${backendUrl}/api/notes/${noteId}`, {
            method: "PUT",
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

       alert("Note updated successfully!");
       navigate(-1);
    } else {
      alert("Please add a title or note content before saving.");
    }
  };

  const hasChanges = originalNote && (
    title !== originalNote.title || 
    noteText !== originalNote.note
  );

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
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-gray-900">Edit Note</h1>
                {originalNote && (
                  <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(originalNote.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </div>
              {hasChanges && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm font-medium">Unsaved changes</span>
                </div>
              )}
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
                  placeholder="Edit your note content..."
                  className="w-full h-96 sm:h-80 lg:h-96 px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-colors"
                  rows={16}
                />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="px-6 py-4 sm:px-8 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {noteText.length > 0 && (
                  <span>{noteText.length} characters</span>
                )}
                {hasChanges && (
                  <span className="text-amber-600 font-medium">• Modified</span>
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
                  onClick={updateNote}
                  disabled={!hasChanges || (!title.trim() && !noteText.trim())}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {hasChanges ? 'Save Changes' : 'No Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Tips - Hidden on mobile */}
        <div className="hidden lg:block mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800 mb-2">✏️ Editing Tips</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Make changes to either the title or content to enable saving</li>
            <li>• Your original note creation date is preserved</li>
            <li>• Use Ctrl+Z (Cmd+Z on Mac) to undo changes in the text area</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EditNote;