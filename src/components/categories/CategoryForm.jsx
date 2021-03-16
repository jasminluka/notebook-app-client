import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaTrash } from 'react-icons/fa'

import { getCategory, createCategory, updateCategory, deleteCategory } from '../../actions/categories'

const CategoryForm = ({ setActiveComponent, selectedItem, setSelectedItem, isEditing, setIsEditing }) => {
  const [title, setTitle] = useState('')
  const { category, updated } = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const canSubmit = !!title

  useEffect(() => {
    // Get category when editing
    if (selectedItem) dispatch(getCategory(selectedItem))
  }, [dispatch, selectedItem])

  useEffect(() => {
    // Fill form when editing category
    if (category && isEditing) setTitle(category.title)
  }, [category, isEditing])

  useEffect(() => {
    // Change view after submiting form
    if (updated) setActiveComponent('categories')
  }, [updated, setActiveComponent])

  const handleSubmit = e => {
    e.preventDefault()

    if (isEditing) {
      dispatch(updateCategory(category._id, title, setActiveComponent))
      setIsEditing(false)
    }
    else {
      dispatch(createCategory(title))
    }
    
    setTitle('')
  }

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="category-form-title-input"
        placeholder='Title of category'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="options">
        {
          isEditing && category && (
            <button
              type='button'
              className="category-form-delete-button"
              onClick={() => {
                dispatch(deleteCategory(category._id))
                setSelectedItem(null)
                setIsEditing(false)
              }}
            >
              <FaTrash />
            </button>
          )
        }
        <button
          type='button'
          className="category-form-cancel-button"
          onClick={() => {
            setActiveComponent('categories')
            setSelectedItem(null)
            setIsEditing(false)
          }}
        >
          Cancel
        </button>
        <button
          type='submit'
          className="category-form-submit-button"
          disabled={!canSubmit}
        >
          {
            isEditing ? 'Edit' : 'Add'
          }
        </button>
      </div>
    </form>
  )
}

export default CategoryForm