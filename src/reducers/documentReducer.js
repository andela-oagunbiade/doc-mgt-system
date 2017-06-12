/* eslint-disable require-jsdoc */

export default function documentReducer(state = [], action) {
  switch (action.type) {
    case 'CREATE_DOCUMENT':
      return Object.assign({}, state, action.document);
    default:
      return state;
  }
}
