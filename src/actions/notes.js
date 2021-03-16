import * as api from '../api'
import {
  GET_NOTES,
  GET_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NOTE_ERROR
} from '../actions/types'


// Get all notes
export const getNotes = () => async dispatch => {
  try {
    const { data } = await api.getNotes()

    dispatch({
      type: GET_NOTES,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Search for notes
export const searchNotes = (searchWord, categoryId) => async dispatch => {
  try {
    const { data } = await api.searchNotes(searchWord, categoryId)

    dispatch({
      type: GET_NOTES,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Get notes for category
export const getNotesForCategory = categoryId => async dispatch => {
  try {
    const { data } = await api.getNotesForCategory(categoryId)

    dispatch({
      type: GET_NOTES,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Get a single note
export const getNote = noteId => async dispatch => {
  try {
    const { data } = await api.getNote(noteId)

    dispatch({
      type: GET_NOTE,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Post note
export const addNote = note => async dispatch => {
  try {
    const { data } = await api.addNote(note)

    dispatch({
      type: ADD_NOTE,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Add note for category
export const addNoteForCategory = (categoryId, note) => async dispatch => {
  try {
    const { data } = await api.addNoteForCategory(categoryId, note)

    dispatch({
      type: ADD_NOTE,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Add marker on map
export const addMarkerOnMap = (noteId, address) => async dispatch => {
  try {
    const { data } = await api.addMarkerOnMap(noteId, { address })

    dispatch({
      type: UPDATE_NOTE,
      payload: {
        id: noteId,
        data: data.data
      }
    })

    dispatch(getNotes())
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Add category for note
export const addCategoryForNote = (noteId, categoryId) => async dispatch => {
  try {
    const { data } = await api.addCategoryForNote(noteId, categoryId)

    dispatch({
      type: UPDATE_NOTE,
      payload: data.data
    })

    dispatch(getNotes())
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Update note
export const updateNote = (noteId, note) => async dispatch => {
  try {
    const { data } = await api.updateNote(noteId, note)

    dispatch({
      type: UPDATE_NOTE,
      payload: {
        id: noteId,
        data: data.data
      }
    })

    dispatch(getNotes())
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}


// Delete note
export const deleteNote = noteId => async dispatch => {
  try {
    await api.deleteNote(noteId)

    dispatch({
      type: DELETE_NOTE,
      payload: noteId
    })
  }
  catch (err) {
    dispatch({
      type: NOTE_ERROR,
      payload: err.response
    })
  }
}