import React, {Component} from 'react'
import '../assets/index.css';
import {Slider} from 'react-mdl'
import {Operation} from '../Operation'
import {db} from '../config/constants'
import {Card, CardTitle, CardText, CardActions, Button} from 'react-mdl'

class Temperature extends Component {
	constructor(props) {
		super(props)
		this.state={
			min: 15,
			max: 35,
			current: "30"
		}
		this.ops = new Operation()
	}
	
	setTemperature = async () => {
		const ref = db.ref("temperature")
		const self = this
		ref.on("child_changed", function(snapshot) {
			console.log("snap",snapshot.val())
			self.setState({current: snapshot.val()})
		})
	}
	
	async componentDidMount() {
		this.ops.getTemperature().then(temp => {
			this.setState({current: temp.current})
		})
		this.setTemperature()
	}
	
	renderSlider = () => {
		let value = this.state.value
		console.log("slider",this.state.current)
		return (
		<Card shadow={0} style={{ width: '320px', height: '200px', margin: 'auto' }}>
			<CardTitle expand style={{ color: '#fff', background: '#FC4582' }}>Real time temperature</CardTitle>
			<CardText>
				<div className="slider" style={{background: 'linear-gradient(to right, blue, green, red)' }}>
					<div id="slidecontainer">
						<input type="range" min="25" max="30" value={this.state.current} className="slider" id="myRange" style={{ background: "transparent", position: "relative", top: "-2px", left: "-2px" }}/>
					</div>
				</div>
				<div style={{textAlign:'center'}}>
					{this.state.current}°C
				</div>
			</CardText>
			<CardActions border>
			</CardActions>
		</Card>
			
		)
	}
	
	render(){
		return (
			<div>
				{
					this.state.current
					?this.renderSlider()
					:null
				}
			</div>
		)
	}
}

export default Temperature