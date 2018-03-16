import {
  GET_PRODUCTS_LIST
} from '../constants/actionTypes'

export default (state = [], action) => {
  switch(action.type) {
    case GET_PRODUCTS_LIST:
      return action.payload
    default:
      return state
  }
}
