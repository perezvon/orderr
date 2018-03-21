import {
  VIEW_VENDOR,
  ADD_VENDOR,
  UPDATE_VENDOR
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type) {
    case VIEW_VENDOR:
    case ADD_VENDOR:
    case UPDATE_VENDOR:
      return action.payload
    default:
      return state
  }
}
