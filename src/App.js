import React, { Component } from 'react';
import { Layout, Tab, HeaderTabs, Header, Content } from 'react-mdl'
import Temperature from './components/Temperature'
import MotionDetected from './components/MotionDetected'
import Tilt from './components/Tilt'
import GarageDoor from './components/GarageDoor'
import background from './assets/background.jpeg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabId: 0
    }
  }
  
  handleTab = (tabId) => {
    this.setState({tabId})
  }
  
  renderComponent = () => {
    switch (this.state.tabId) {
      case 1:
        return <Temperature/>
      case 2:
        return <Tilt/>
      case 3:
        return <GarageDoor/>
      default:
        return <MotionDetected/>
    }
  }
  
  render() {
    console.log(background)
    return (
        <div>
          <div >
            <Layout fixedHeader fixedTabs style={{ height:'500px',position: 'relative' }}>
              <Header>
                <HeaderTabs ripple activeTab={this.state.tabId} onChange={this.handleTab}>
                  <Tab>Motion</Tab>
                  <Tab>Temperature</Tab>
                  <Tab>Tilt</Tab>
                  <Tab>GarageDoor</Tab>
                </HeaderTabs>
              </Header>
              <Content>
                {this.renderComponent()}
              </Content>
            </Layout>
          </div>
        </div>
    )
  }
}

export default App;
