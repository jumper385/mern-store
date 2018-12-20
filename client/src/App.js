import {size} from 'window-size'

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import Home from './components/home.page'
import About from './components/about.page'
import Products from './components/products.page'
import NavBar from './components/navbar.partial'

class App extends Component {

  componentDidMount(){
    axios.defaults.baseURL = 'http://192.168.1.108:3000';
    axios.get("/products/getAll")
        .then(({data}) => {
            this.props.getProducts(data.products)
        })
        .catch(error => console.log(error))
}

  render() {
    console.log(size)
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

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  getProducts: (payload) => dispatch({type:'GET_ALL_PRODUCTS', payload:payload})
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
