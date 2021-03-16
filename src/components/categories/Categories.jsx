import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaPlus, FaEllipsisV } from 'react-icons/fa'

import { getCategories } from '../../actions/categories'

const Categories = ({ setActiveComponent, setSelectedItem, setIsEditing, setActiveTab, setSelectedCategory }) => {
  const { categories } = useSelector(state => state.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <div className="categories">
      <div
        className="categories-item"
        onClick={() => setActiveComponent('category-form')}
      >
        <h2 className="categories-item-title">Add category</h2>
        <p className="categories-item-icon"><FaPlus /></p>
      </div>
      {
        categories.map(category => (
          <div
            key={category._id}
            className="categories-item"
            onClick={() => {
              setActiveTab('notes')
              setSelectedCategory(category)
            }}
          >
            <h2 className="categories-item-title">
              {category.title}
            </h2>
            <p className="categories-item-notes">
              {category?.notes?.length || 0} {category?.notes?.length !== 1 ? 'notes' : 'note'}
            </p>
            <p
              className="categories-item-icon edit"
              onClick={e => {
                e.stopPropagation()
                setSelectedItem(category._id)
                setActiveComponent('category-form')
                setIsEditing('true')
              }}
            >
              <FaEllipsisV />
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default Categories
