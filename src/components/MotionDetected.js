import React, { Component } from 'react';
import { Button, Card, CardText, CardTitle, CardActions, CardMenu, FABButton } from 'react-mdl'
import { Operation } from '../Operation'
import { db } from '../config/constants'

class MotionDetected extends Component {
	constructor(props) {
		super(props)
		this.state={
			motion: null,
      showCard: false,
      showPicture: false,
      showVideo: false
		}
		this.ops = new Operation()
	}
	
	isMotionDetected = async () => {
		const ref = db.ref("motion")
		const self = this
		ref.on("child_changed", function(snapshot) {
			self.setState({motion: snapshot.val(), showCard:true})
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}
	
	async componentDidMount() {
		const motion = await this.ops.getMotion()
    
		this.setState({
		  motion: motion.motionDetected === 1,
		  showCard: motion.motionDetected === 1
		})
		this.isMotionDetected()
	}

	hideCard = () => {
		this.setState({showCard:false})
  }
	
	showPicture = async () => {
		if (this.state.showVideo) {
			alert("Cannot take picture while recording")
			return
		}
     this.setState({showPicture: true})
  }
	showVideo = async () => {
		fetch('http://10.5.5.46:5000/startVideo').then(res => {
			console.log(res)
			
		})
		setTimeout(() => {this.setState({showVideo: true})}, 2000)
  }
	
  hidePicture = () => {
	  this.setState({showPicture: false})
  }
	
	hideVideo = () => {
		fetch('http://10.5.5.46:5000/stopVideo').then(res => {
			console.log(res)
		})
		setTimeout(() => {this.setState({showVideo: false})}, 1000)
	}
	
	renderCard = () => {
	  return (
      <Card shadow={0} style={{ width: '320px', height: '200px', margin: 'auto' }}>
        <CardTitle expand style={{ color: '#fff', background: 'grey' }}>You have a new visitor at the door</CardTitle>
        <CardText>
          Do you want to see who is out there?
        </CardText>
        <CardActions border>
          <Button colored onClick={this.showPicture}>Picture</Button>
          <Button colored onClick={this.showVideo}>Video</Button>
          <Button colored onClick={this.hideCard}>Ignore</Button>
        </CardActions>
      </Card>
    )
  }
  
  renderPicture = () => {
	  return (
      <Card shadow={0} style={{width: '320px', height: '256px', background: 'url(http://10.5.5.46:5000/image) center / cover', margin: 'auto'}}>
        <CardMenu style={{color: '#fff'}}>
          <FABButton colored mini ripple onClick={this.hidePicture}>
           x
          </FABButton>
        </CardMenu>
      </Card>
    )
  }
	
	renderVideo = () => {
		return (
      <Card shadow={0} style={{width: '320px', height: '241px',margin: 'auto'}}>
        <CardMenu style={{color: '#fff'}}>
          <FABButton colored mini ripple onClick={this.hideVideo}>
            x
          </FABButton>
        </CardMenu>
        <iframe title="video" src="http://10.5.5.46:8081/" width="320px" height="241px">
          alternative content for browsers which do not support iframe.
        </iframe>
      </Card>
		)
	}
  
  render() {
    return (
      <div>
        {this.state.motion && this.state.showCard
          ?this.renderCard()
          :null
        }
        {
          this.state.showPicture
          ?this.renderPicture()
          :null
        }
	      {
		      this.state.showVideo
			      ?this.renderVideo()
			      :null
	      }
      </div>
    )
  }
}

export default MotionDetected;