import * as api from '../api'
import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_ERROR
} from '../actions/types'


// Get all categories
export const getCategories = () => async dispatch => {
  try {
    const { data } = await api.getCategories()

    dispatch({
      type: GET_CATEGORIES,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response
    })
  }
}


// Get a single category
export const getCategory = categoryId => async dispatch => {
  try {
    const { data } = await api.getCategory(categoryId)

    dispatch({
      type: GET_CATEGORY,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response
    })
  }
}


// Create category
export const createCategory = category => async dispatch => {
  try {
    const { data } = await api.createCategory({ title: category })

    dispatch({
      type: CREATE_CATEGORY,
      payload: data.data
    })
  }
  catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response
    })
  }
}


// Update category
export const updateCategory = (categoryId, category) => async dispatch => {
  try {
    const { data } = await api.updateCategory(categoryId, { title: category })

    dispatch({
      type: UPDATE_CATEGORY,
      payload: {
        id: categoryId,
        data: data.data
      }
    })
  }
  catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response
    })
  }
}


// Delete Category
export const deleteCategory = categoryId => async dispatch => {
  try {
    await api.deleteCategory(categoryId)

    dispatch({
      type: DELETE_CATEGORY,
      payload: categoryId
    })
  }
  catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: err.response
    })
  }
}