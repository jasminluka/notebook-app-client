import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR
} from '../actions/types'

const initialState = {
  category: null,
  categories: [],
  isLoading: true,
  updated: false,
  error: {}
}

const categoriesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        isLoading: false,
        updated: false
      }
    case GET_CATEGORY:
      return {
        ...state,
        category: payload,
        isLoading: false,
        updated: false
      }
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [payload, ...state.categories],
        isLoading: false,
        updated: true
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category => category._id === payload.id ? payload.data : category),
        isLoading: false,
        updated: true
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category._id !== payload),
        isLoading: false,
        updated: true
      }
    case CATEGORY_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    default:
      return state
  }
}

export default categoriesReducer