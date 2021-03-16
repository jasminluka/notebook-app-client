import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addMarkerOnMap } from '../../actions/notes'

const AddMarker = ({ setActiveComponent }) => {
  const [address, setAddress] = useState('')
  const { note: noteToEdit, updated } = useSelector(state => state.notes)
  const dispatch = useDispatch()

  const canSubmit = !!address

  useEffect(() => {
    // Change view after submiting form
    if (updated) setActiveComponent('note')
  }, [updated, setActiveComponent])

  const handleSubmit = e => {
    e.preventDefault()

    // Add marker on map
    dispatch(addMarkerOnMap(noteToEdit._id, address))
    // Clear form
    setAddress('')
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type='text'
        className="note-form-address-input"
        placeholder='Tirane, Albania'
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <button
        type='submit'
        className="note-form-submit-button"
        disabled={!canSubmit}
      >
        Mark
      </button>
    </form>
  )
}

export default AddMarker