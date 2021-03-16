import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaEdit, FaMapMarkerAlt, FaTrash, FaFolderPlus } from 'react-icons/fa'

import { getNote, deleteNote } from '../../actions/notes'
import { getAllDate, getTime }  from '../../utils/formatDate'

const Note = ({ setActiveComponent, selectedNote, setSelectedNote, setIsEditing }) => {
  const { note, isLoading } = useSelector(state => state.notes)
  const dispatch = useDispatch()

  useEffect(() => {
    // Get note
    if (selectedNote) dispatch(getNote(selectedNote))
  }, [dispatch, selectedNote])

  if (isLoading) {
    return (
      <div className="no-note">
        <h4>Loading...</h4>
      </div>
    )
  }
  if (!selectedNote) {
    return (
      <div className="no-note">
        <h4>Open a note</h4>
      </div>
    )
  }
  return (
    <div className="note">
      <p className="note-date">{getAllDate(note?.updatedAt)} at {getTime(note?.updatedAt)}</p>
      <div className="note-category">
        {
          note?.category && (
            <p>Category: {note.category.title}</p>
          )
        }
      </div>
      <h2 className="note-title">{note?.title}</h2>
      <p className="note-body">{note?.body}</p>
      <div className="note-options">
        <button
          className="note-options-update-button"
          onClick={() => {
            setActiveComponent('note-form')
            setIsEditing(true)
          }}
        >
          <FaEdit />
        </button>
        <button
          className="note-options-markmap-button"
          onClick={() => setActiveComponent('add-marker')}
        >
          <FaMapMarkerAlt />
        </button>
        <button
          className="note-options-delete-button"
          onClick={() => {
            dispatch(deleteNote(note?._id))
            setSelectedNote(null)
          }}
        >
          <FaTrash />
        </button>
        {
          !note?.category && (
            <button
              className="note-options-add-to-category-button"
              onClick={() => setActiveComponent('add-to-category')}
            >
              <FaFolderPlus />
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Note