import { useState } from 'react'

import Categories from './Categories'
import CategoryForm from './CategoryForm'

const CategoriesContainer = ({ setActiveTab, setSelectedCategory }) => {
  const [activeComponent, setActiveComponent] = useState('categories')  // List of categories or form
  const [selectedItem, setSelectedItem] = useState(null)  // Selected category
  const [isEditing, setIsEditing] = useState(false)  // New or edit

  return (
    <div className="my-categories">
      {
        activeComponent !== 'category-form' ? (
          <Categories
            setActiveComponent={setActiveComponent}
            setSelectedItem={setSelectedItem}
            setIsEditing={setIsEditing}
            setActiveTab={setActiveTab}
            setSelectedCategory={setSelectedCategory}
          />
          ) : (  
          <CategoryForm
            setActiveComponent={setActiveComponent}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        )
      }
    </div>
  )
}

export default CategoriesContainer