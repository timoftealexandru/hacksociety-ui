import React, {Component} from 'react'
import {ProgressBar,Spinner,CardText, Card} from 'react-mdl'
import {Operation} from '../Operation'
import {db} from '../config/constants'

class GarageDoor extends Component {
	constructor(props) {
		super(props)
		this.state={
			distance:null
		}
		this.ops = new Operation()
	}
	
	componentDidMount() {
		this.ops.getDistance().then(distance => {
			this.setState({
				distance
			})
		})
		this.setDistance()
	}
	
	setDistance = async () => {
		const ref = db.ref("ultrasonic")
		const self = this
		ref.on("child_changed", function(snapshot) {
			self.setState({distance: snapshot.val()})
		})
	}
	
	renderComponent = () => {
		console.log(this.state.distance)
		return (
			<Card shadow={0} style={{width: '360px', height: '200px', margin: 'auto'}}>
				<CardText>
					<ProgressBar progress={parseInt(this.state.distance)/5} />
				</CardText>
				<CardText>
					Distance to Garage Door: {this.state.distance}
				</CardText>
			</Card>
		)
	}
	render() {
		return(
			<div>
				{
					this.state.distance
					?this.renderComponent()
					:<Card shadow={0} style={{width: '360px', margin: 'auto'}}><Spinner/></Card>
				}
			</div>
		)
	}
}

export default GarageDoor