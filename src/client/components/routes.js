import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import About from './About';
//import Posts from './Posts';
//import Post from './Post';
import Blogs from './Blogs';
import Stuff from './Stuff';
import Login from './Login';

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={About} />
    <Route path='about' component={About} />
    <Route path='blogs' component={Blogs} />
    <Route path='stuff' component={Stuff} />
    <Route path='babylou' component={Login} />
  </Route>
);