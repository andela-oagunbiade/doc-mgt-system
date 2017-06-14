/* eslint-disable require-jsdoc */

import types from '../constants/actionTypes';

export default function documentReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_DOCUMENT:
      return [...state, Object.assign({}, action.document)];
    default:
      return state;
  }
}
