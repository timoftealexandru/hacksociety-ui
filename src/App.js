import React, { Component } from 'react';
import img from './assets/background.jpg'
import { Layout, Tab, HeaderTabs, Header, Content } from 'react-mdl'
import Temperature from './components/Temperature'
import MotionDetected from './components/MotionDetected'

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
      default:
        return <MotionDetected/>
    }
  }
  
  render() {
    return (
        <div>
          <div >
            <Layout fixedHeader fixedTabs style={{ height:'500px',position: 'relative', backgroundImage: 'url(./assets/background.jpg) no-repeat' }}>
              <Header>
                <HeaderTabs ripple activeTab={1} onChange={this.handleTab}>
                  <Tab>Motion</Tab>
                  <Tab>Temperature</Tab>
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
