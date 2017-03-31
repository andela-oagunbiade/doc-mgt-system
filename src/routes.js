import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import Header from './components/common/Header'
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage}/>
  </Route>
);
