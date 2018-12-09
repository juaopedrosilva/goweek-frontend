import React, { Component } from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom' 

import Login from './pages/login'
import Timiline from './pages/timiline'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/timiline' component={Timiline} />
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App
