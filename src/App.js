import { useState } from 'react'
import { Provider } from 'react-redux'

import Header from './components/Header'
import NotesContainer from './components/notes/NotesContainer'
import CategoriesContainer from './components/categories/CategoriesContainer'
import Map from './components/map/Map'

import store from './store'
import './App.scss'

const App = () => {
  const [activeTab, setActiveTab] = useState('notes')  // Notes or categories
  const [selectedCategory, setSelectedCategory] = useState('all')  // All notes or notes for specific category
  
  return (
    <Provider store={store}>
      <div className="app-container">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
        />
        {
          activeTab === 'notes' ?
            <NotesContainer
              setActiveTab={setActiveTab}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            /> :
            <CategoriesContainer
              setActiveTab={setActiveTab}
              setSelectedCategory={setSelectedCategory}
            />
        }
      </div>
      <Map />
    </Provider>
  )
}

export default App