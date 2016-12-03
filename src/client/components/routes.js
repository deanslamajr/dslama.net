import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import Posts from './Posts';
import Projects from './About';
import Snippets from './Snippets';
import Others from './Blogs';
import Login from './Login';

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Posts} />
    <Route path='posts' component={Posts} />
    <Route path='projects' component={Projects} />
    <Route path='snippets' component={Snippets} />
    <Route path='neat' component={Others} />
    <Route path='babylou' component={Login} />
  {/* @todo: add /404 path */}
  </Route>
);