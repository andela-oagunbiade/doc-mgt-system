/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */

import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import Header from './components/common/Header';
import HomePage from './components/home/HomePage';
import DocumentsPage from './components/documents/DocumentsPage';
import AboutPage from './components/about/AboutPage';
import CreateAccessUser from './components/assessUsers/addNewUser';
import ViewAssessUsersPage from './components/assessUsers/viewAssessUsers';

function redirectToLogin() {
  window.location.href = "/";
}

export default (
  <Route component={App}>
    <Route path="/" component={HomePage} />
    <Route path="/documents" component={DocumentsPage}/>
    <Route path="/about" component={AboutPage}/>
    <Route path="/createAssessUser" component={CreateAccessUser}/>
    <Route path="/viewAssessUser" component={ViewAssessUsersPage}/>
    <Route path="*" onEnter={redirectToLogin} />
  </Route>
);
