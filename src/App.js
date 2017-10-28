import React, { Component } from 'react';
import Home from './components/Home'
import {Operation} from './Operation'

class App extends Component {
  constructor(props) {
    super(props)
    this.ops = new Operation()
  }
  
  async componentWillMount() {
    this.ops.saveData()
      .then((result) => {
        console.log(result)
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Home/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
