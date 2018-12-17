import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/home.page'
import About from './components/about.page'
import Products from './components/products.page'
import NavBar from './components/navbar.partial'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

            <NavBar />

            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/products' component={Products} />
            </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
