import React, { Component } from 'react';
import Home from './components/Home'
import {Operation} from './Operation'
import ExampleMDL from './components/MDL'

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
        <ExampleMDL/>
    );
  }
}

export default App;
