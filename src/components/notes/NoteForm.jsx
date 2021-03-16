import { useReducer, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addNote, updateNote, addNoteForCategory } from '../../actions/notes'

const initialState = {
  title: '',
  body: ''
}

const noteDataReducer = (noteData, { type, payload }) => {
  switch (type) {
    case 'TITLE':
      return {
        ...noteData,
        title: payload
      }
    case 'BODY':
      return {
        ...noteData,
        body: payload
      }
    case 'FILL_FORM':
      return {
        title: payload.title,
        body: payload.body
      }
    case 'RESET_FORM':
      return {
        ...initialState
      }
    default:
      return noteData
  }
}

const NoteForm = ({ setActiveComponent, isEditing, setIsEditing, selectedCategory }) => {
  const [noteData, dispatchNoteData] = useReducer(noteDataReducer, initialState)
  const { note: noteToEdit, updated } = useSelector(state => state.notes)
  const dispatch = useDispatch()

  const canSubmit = Object.values(noteData).every(Boolean)

  useEffect(() => {
    // Reset form when edit form or add to category is opened and add new note button is clicked
    dispatchNoteData({ type: 'RESET_FORM' })
    
    // Fill form when editing note
    if (noteToEdit && isEditing) {
      dispatchNoteData({ type: 'FILL_FORM', payload: noteToEdit })
    }
  }, [noteToEdit, isEditing, selectedCategory])

  useEffect(() => {
    // Change view after editing note
    if (updated) setActiveComponent('note')
  }, [updated, setActiveComponent])

  const handleSubmit = e => {
    e.preventDefault()

    if (isEditing) {
      // Edit note
      dispatch(updateNote(noteToEdit._id, noteData))
      setIsEditing(false)
    }
    else if (selectedCategory !== 'all') {
      // Add note for specific category
      dispatch(addNoteForCategory(selectedCategory._id, noteData))
      setActiveComponent('note')
    }
    else {
      // Add new note
      dispatch(addNote(noteData))
      setActiveComponent('note')
    }

    dispatchNoteData({ type: 'RESET_FORM' })
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type='text'
        className="note-form-title-input"
        placeholder='Title of your note'
        value={noteData.title}
        onChange={e => dispatchNoteData({ type: 'TITLE', payload: e.target.value })}
      />
      <textarea
        className="note-form-body-input"
        placeholder='Your note'
        value={noteData.body}
        onChange={e => dispatchNoteData({ type: 'BODY', payload: e.target.value })}
      />
      <button
        type='submit'
        className="note-form-submit-button"
        disabled={!canSubmit}
      >
        {
          isEditing ? 'Edit' : selectedCategory !== 'all' ? 'Add to category' : 'Add note'
        }
      </button>
    </form>
  )
}

export default NoteForm