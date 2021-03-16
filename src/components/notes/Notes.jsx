import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getNotes, getNotesForCategory } from '../../actions/notes'
import { formatDate }  from '../../utils/formatDate'

const Notes = ({ setActiveComponent, selectedNote, setSelectedNote, setIsEditing, setActiveTab, selectedCategory, setSelectedCategory }) => {
  const { notes, isLoading } = useSelector(state => state.notes)
  const dispatch = useDispatch()

  useEffect(() => {
    // Get notes for specific category
    if (selectedCategory !== 'all') {
      dispatch(getNotesForCategory(selectedCategory._id))
    }
    else {
      // Get all notes
      dispatch(getNotes())
    }
  }, [dispatch, selectedCategory])

  if (isLoading) {
    return (
      <div className="notes">
        <div className="no-notes">
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }
  if (notes.length === 0) {
    return (
      <div className="notes">
        <div className="no-notes">
          <h2>No notes</h2>
        </div>
      </div>
    )
  }
  return (
    <div className="notes">
      <div className="center">
        <div className="notes-tabs">
          <button
            className={`notes-tabs-tab ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All
          </button>
          {
            selectedCategory !== 'all' ? (
              <span className='notes-tabs-tab active'
              >
                {selectedCategory?.title}
              </span>
            ) : (
              <button
                className='notes-tabs-tab'
                onClick={() => setActiveTab('categories')}
              >
                Select from
              </button>
            )
          }
        </div>
      </div>
      {
        notes?.map(note => (
          <div
            key={note._id}
            className={`one-note ${selectedNote === note._id ? 'active' : ''}`}
            onClick={() => {
              setActiveComponent('note')
              setSelectedNote(note._id)
              setIsEditing(false)
            }}
          >
            <h3 className="one-note-title">{note.title}</h3>
            <div className='one-note-details'>
              <span className="one-note-details-date">
                {formatDate(note.updatedAt)}
              </span>
              <p className="one-note-details-body">{note.body}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Notes