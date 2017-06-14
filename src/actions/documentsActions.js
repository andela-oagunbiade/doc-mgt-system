/* eslint-disable require-jsdoc */

import types from '../constants/actionTypes';

export function createDocument(document) {
  return { type: types.CREATE_DOCUMENT, document };
}

export function editDocument(document) {
  return { type: 'EDIT_DOCUMENT', document };
}
