import React, {Component} from 'react'
import '../assets/index.css';
import {Operation} from '../Operation'
import {db} from '../config/constants'
import {Card, CardTitle, CardText, CardActions, Spinner, Button} from 'react-mdl'

class Tilt extends Component {
	constructor(props) {
		super(props)
		this.state={
			tilt:null,
			showCard:null,
			processed:null,
			file: null,
			name: null,
			doorOpened:false
		}
		this.ops = new Operation()
	}
	
	async componentDidMount() {
		this.ops.getTilt().then(tilt => {
			this.setState({tilt,showCard:true})
		})
		fetch('http://10.5.5.41:5001/compare').then(res => res.json())
			.then(res => {
				console.log("res",res)
				this.setState({
					processed:true,
					file: res.file,
					name: res.name
				})
			})
		this.setTiltListener()
	}
	
	setTiltListener = async () => {
		const ref = db.ref("tilt")
		const self = this
		ref.on("child_changed", function(snapshot) {
			if (!self.state.tilt) {
				self.setState({tilt: true})
			}
		})
	}
	renderButton = () => {
		return (
			<div>
				<Button border colored onClick={this.openDoor}>Open the door</Button>
				<Button border className="pull-right" colored onClick={this.hideCard}>Ignore</Button>
			</div>
		)
	}
	renderComponent = () => {
		return (
			<Card shadow={0} style={{ width: '360px', height: '300px', margin: 'auto' }}>
				<CardTitle style={{color: '#fff', height: '300px', width:'360px', background: `url(http://10.5.5.46:5000/image?${new Date().getTime()}) center / cover`, margin: 'auto'}}>
				</CardTitle>
				<CardText>
					<div style={{textAlign:'center'}}>
						There is someone at the door who wants to reach you
					</div>
				</CardText>
				{
					this.state.user!=="False"
					?this.renderButton()
					:null
				}
			</Card>
		)
	}
	openDoor = () => {
		this.ops.setDoorOpen(true)
		this.hideCard()
		this.setState({
			doorOpened:true,tilt:false
		})
	}
	
	hideCard = () => {
		this.setState({showCard: false,tilt:false})
	}
	
	renderFoundUser = () => {
		return (
			<Card shadow={0} style={{ width: '360px', height: '400px', margin: 'auto' }}>
				<CardTitle style={{color: '#fff', height: '300px', width:'360px', background: `url(http://localhost:5001/base/${this.state.file}?${new Date().getTime()}) center / cover`, margin: 'auto'}}>
					{this.state.name}
				</CardTitle>
				<CardText>
					<div style={{textAlign:'center'}}>
						The person who wants to reach you is {this.state.name}
					</div>
				</CardText>
				<CardActions>
					<Button border colored onClick={this.openDoor}>Open the door</Button>
					<Button border className="pull-right" colored onClick={this.hideCard}>Ignore</Button>
				</CardActions>
			</Card>
		)
	}
	
	render(){
		console.log("state",this.state)
		return (
			<div>
				<CardActions>
					{
						this.state.tilt && this.state.showCard
							?this.renderComponent()
							:<h4> There are no notifications</h4>
					}
				</CardActions>
				<CardActions>
					{
						this.state.showCard && this.state.processed
						&& this.state.file !=="False" && this.state.name !=="False" && this.state.tilt
							?this.renderFoundUser()
							: this.state.showCard && this.state.file==="False"
								?<h4>The person is unknown</h4>
								:null
					}
				</CardActions>
			</div>
		)
	}
}

export default Tilt