import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom'
import { Layout, Navigation, Header, Drawer, Content } from 'react-mdl'
import Temperature from './components/Temperature'
import MotionDetected from './components/MotionDetected'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div style={{ height: '100px', position: 'relative'}}>
            <Layout style={{backgroundImage: 'url(./assets/backgound.jpg) center / cover'}}>
              <Header transparent title="Title" style={{color: 'white'}}>
                <Navigation>
                  <Link to="/" className="navbar-brand">Motion</Link>
                  <Link to="/temperature" className="navbar-brand">Temperature</Link>
                </Navigation>
              </Header>
              <Drawer title="Hacksociety">
                <Navigation>
                  <Link to="/motion" className="navbar-brand">Motion</Link>
                  <Link to="/temperature" className="navbar-brand">Temperature</Link>
                </Navigation>
              </Drawer>
              <Content />
            </Layout>
          </div>
          <Switch>
            <Route path="/" exact render={() => <MotionDetected/>} />
            <Route path="/temperature" render={() => <Temperature/>} />
            <Route render={() => <h3>No Match</h3>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
