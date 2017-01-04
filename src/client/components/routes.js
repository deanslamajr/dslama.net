import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import Posts from './Posts';
import Projects from './About';
import Snippets from './Snippets';
import AddSnippet from './Snippets/Add';
import Login from './Login';

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={Snippets} />
    <Route path='posts' component={Posts} />
    <Route path='projects' component={Projects} />
    <Route path='snippets' component={Snippets}>
      <Route path='add' component={AddSnippet} />
    </Route>
    <Route path='babylou' component={Login} />
  {/* @todo: add /404 path */}
  </Route>
);