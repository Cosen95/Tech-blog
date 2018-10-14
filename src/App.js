import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header'
import Home from './pages/home';
import Detail from './pages/detail';
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path="/" exact component={Home} />
            <Route path="/detail" exact component={Detail} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
