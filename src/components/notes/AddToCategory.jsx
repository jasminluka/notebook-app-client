import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addCategoryForNote } from '../../actions/notes'
import { getCategories } from '../../actions/categories'

const AddToCategory = ({ setActiveComponent }) => {
  const [categoryId, setCategoryId] = useState('')
  const { note: noteToEdit, updated } = useSelector(state => state.notes)
  const { categories } = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const canSubmit = !!categoryId

  useEffect(() => {
    // Get categories
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    // Change view after submiting form
    if (updated) setActiveComponent('note')
  }, [updated, setActiveComponent])

  const handleSubmit = e => {
    e.preventDefault()

    // Add category for note
    dispatch(addCategoryForNote(noteToEdit._id, categoryId))
    // Clear form
    setCategoryId(null)
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <select
        className="note-form-select-input"
        value={categoryId}
        onChange={e => setCategoryId(e.target.value)}
      >
        <option
          className="note-form-select-input-option"
          value=""
          disabled
        >
          Choose category
        </option>
        {
          categories?.map(category => (
            <option
              key={category._id}
              className="note-form-select-input-option"
              value={category._id}
            >
              {category.title}
            </option>
          ))
        }
      </select>
      <button
        type='submit'
        className="note-form-submit-button"
        disabled={!canSubmit}
      >
        Add to category
      </button>
    </form>
  )
}

export default AddToCategory