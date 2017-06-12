/* eslint-disable require-jsdoc */

export function createDocument(document) {
  return { type: 'CREATE_DOCUMENT', document };
}

export function editDocument(document) {
  return { type: 'EDIT_DOCUMENT', document };
}
