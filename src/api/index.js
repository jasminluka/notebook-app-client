import axios from 'axios'

const API = axios.create({
  baseURL: 'https://notebook-app-server.herokuapp.com/'
})

// Notes
export const getNotes = () => API.get('/api/notes')
export const searchNotes = (searchWord, categoryId) => API.get(`/api/notes/search?searchWord=${searchWord}${categoryId ? `&categoryId=${categoryId}` : ''}`)
export const getNotesForCategory = categoryId => API.get(`/api/notes/category/${categoryId}`)
export const getNote = noteId => API.get(`/api/notes/${noteId}`)
export const addNote = note => API.post('/api/notes', note)
export const addNoteForCategory = (categoryId, note) => API.post(`/api/notes/category/${categoryId}/notes`, note)
export const addMarkerOnMap = (noteId, address) => API.put(`/api/notes/map/note/${noteId}`, address)
export const addCategoryForNote = (noteId, categoryId) => API.put(`/api/notes/${noteId}/category/${categoryId}`)
export const updateNote = (noteId, note) => API.put(`/api/notes/${noteId}`, note)
export const deleteNote = noteId => API.delete(`/api/notes/${noteId}`)

// Categories
export const getCategories = () => API.get('/api/categories')
export const getCategory = categoryId => API.get(`/api/categories/${categoryId}`)
export const createCategory = category => API.post('/api/categories', category)
export const updateCategory = (categoryId, category) => API.put(`/api/categories/${categoryId}`, category)
export const deleteCategory = categoryId => API.delete(`/api/categories/${categoryId}`)