import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import Posts from './Posts';
import Projects from './About';
import Stuff from './Stuff';
import Others from './Blogs';
import Login from './Login';

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Posts} />
    <Route path='posts' component={Posts} />
    <Route path='projects' component={Projects} />
    <Route path='stuff' component={Stuff} />
    <Route path='others' component={Others} />
    <Route path='babylou' component={Login} />
  </Route>
);