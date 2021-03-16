import { combineReducers } from 'redux'

import notesReducer from './notes'
import categoriesReducer from './categories'

export default combineReducers({
  notes: notesReducer,
  categories: categoriesReducer
})