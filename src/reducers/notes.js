import {
  GET_NOTES,
  GET_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NOTE_ERROR
} from '../actions/types'

const initialState = {
  note: null,
  notes: [],
  isLoading: true,
  updated: false,
  error: {}
}

const notesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        isLoading: false,
        updated: false
      }
    case GET_NOTE:
      return {
        ...state,
        note: payload,
        isLoading: false,
        updated: false
      }
    case ADD_NOTE:
      return {
        ...state,
        notes: [payload, ...state.notes],
        isLoading: false
      }
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => note._id === payload.id ? payload.data : note),
        isLoading: false,
        updated: true
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== payload),
        isLoading: false
      }
    case NOTE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    default:
      return state
  }
}

export default notesReducer