export const handleSave = async (content, dispatch, newNote, saveNotes, notebookId, noteId) => {
  if (noteId === 'new' && notebookId) {
      dispatch(newNote(content, notebookId))
    }
    else if (!noteId && !notebookId) {
      dispatch(newNote(content, notebookId))
    } else {
      dispatch(saveNotes(content, noteId));
    }
  };