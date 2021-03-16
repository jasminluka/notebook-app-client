import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { FaSearch } from 'react-icons/fa'

import useDebounce from '../hooks/useDebounce'
import { getNotes, searchNotes, getNotesForCategory } from '../actions/notes'

const Header = ({ activeTab, setActiveTab, selectedCategory }) => {
  const [searchWord, setSearchWord] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    setSearchWord('')
  }, [selectedCategory])

  const search = useCallback(value => {
    if (selectedCategory !== 'all') {
      if (!value) {
        return dispatch(getNotesForCategory(selectedCategory._id))
      }
      dispatch(searchNotes(value, selectedCategory._id))
    }
    else {
      if (!value) {
        return dispatch(getNotes())
      }
      dispatch(searchNotes(value))
    }
  }, [dispatch, selectedCategory]) // Save function ref
  
  const delayedFn = useDebounce(search, selectedCategory)

  const handleChange = e => {
		setSearchWord(e.target.value)

		delayedFn(e.target.value)
	}

  return (
    <div className="header">
      <div className={`header-search-box ${activeTab !== 'notes' ? 'hidden' : ''}`}>
        <input
          type="text"
          className="header-search-box-input"
          placeholder="Search for notes..."
          value={searchWord}
          onChange={handleChange}
        />
        <div className="header-search-box-icon">
          <FaSearch />
        </div>
      </div>
      <h2 className="header-title">NoteBook App</h2>
      <div className="header-tabs">
        <button
          className={`header-tabs-tab ${activeTab === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
        <button
          className={`header-tabs-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>
    </div>
  )
}

export default Header