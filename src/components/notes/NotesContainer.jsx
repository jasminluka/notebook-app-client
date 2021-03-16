import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import Notes from './Notes'
import Note from './Note'
import NoteForm from './NoteForm'
import AddMarker from './AddMarker'
import AddToCategory from './AddToCategory'

const NotesContainer = ({ setActiveTab, selectedCategory, setSelectedCategory }) => {
  const [activeComponent, setActiveComponent] = useState('note')  // note, note-form, add-marker or add-to-category
  const [selectedNote, setSelectedNote] = useState(null)
  const [isEditing, setIsEditing] = useState(false)  // Add new or edit

  return (
    <div className="my-notes">
      <Notes
        setActiveComponent={setActiveComponent}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        setIsEditing={setIsEditing}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {
        activeComponent === 'note-form' ? (
          <NoteForm
            setActiveComponent={setActiveComponent}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            selectedCategory={selectedCategory}
          />
        ) : activeComponent === 'add-marker' ? (
          <AddMarker
            setActiveComponent={setActiveComponent}
          />
        ) : activeComponent === 'add-to-category' ? (
          <AddToCategory
            setActiveComponent={setActiveComponent}
          />
        ) : (
          <Note
            setActiveComponent={setActiveComponent}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            setIsEditing={setIsEditing}
          />
        )
      }
      {
        (activeComponent !== 'note-form' || isEditing) && (
          <button
            className="add-new-note"
            onClick={() => {
              setActiveComponent('note-form')
              setIsEditing(false)
              setSelectedNote(null)
            }}
          >
            <FaPlus />
          </button>
        )
      }
    </div>
  )
}

export default NotesContainer