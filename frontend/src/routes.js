import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import Reading from './pages/Reading';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/product/new" exact component={NewProduct} />
        <Route path="/readings" component={Reading} />
      </Switch>
    </BrowserRouter>
  )
}