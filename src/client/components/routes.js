import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import About from './About';
import Projects from './Projects';
import Readings from './Readings';
import AddReading from './Readings/Add';
import Login from './Login';

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={About} />
    <Route path='about' component={About} />
    <Route path='projects' component={Projects} />
    <Route path='readings' component={Readings}>
      <Route path='add' component={AddReading} />
    </Route>
  {/* login path is purposefully obscured */}
    <Route path='babylou' component={Login} />
  {/* @todo: add /404 path */}
  </Route>
);