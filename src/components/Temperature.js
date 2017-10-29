import React, {Component} from 'react'
import '../assets/index.css';
import {Operation} from '../Operation'
import {db} from '../config/constants'
import {Card, CardTitle, CardText, CardActions, Button, Textfield, Chip, ChipContact} from 'react-mdl'
import temperature from '../assets/temperature.jpeg'

class Temperature extends Component {
	constructor(props) {
		super(props)
		this.state={
			min: null,
			max: null,
			current: null,
			minEditing: false,
			maxEditing: false
		}
		this.ops = new Operation()
	}
	
	async componentDidMount() {
		this.ops.getTemperature().then(temp => {
			this.setState({
				current: temp.current,
				min: temp.min,
				max: temp.max
			})
		})
		this.setTemperature()
	}
	
	setTemperature = async () => {
		const ref = db.ref("temperature")
		const self = this
		ref.on("child_changed", function(snapshot) {
			self.setState({current: snapshot.val()})
		})
	}
	
	saveTemp = async (e) => {
		e.preventDefault()
		const temp = {
			min: this.state.min,
			max: this.state.max
		}
		await this.ops.saveTemperature(temp)
		this.setState({
			minEditing: false,
			maxEditing: false
		})
	}
	
	handleMinEdit = () => {
		this.setState({
			minEditing: true
		})
	}
	
	handleMaxEdit = () => {
		this.setState({
			maxEditing: true
		})
	}
	
	renderMin = () => {
		return this.state.minEditing
			?<Textfield
				onBlur={this.saveTemp}
				pattern="-?[0-9]*(\.[0-9]+)?"
				error="Input is not a number!"
				label="Min temperature..."
				autofocus
				style={{width: '150px'}}
			  value={this.state.min}
			  onChange={(e) => this.setState({min: e.target.value})}
			/>
			:<Button
				raised
         accent 
         ripple
         style={{width:'135px', backgroundColor: '#4154B2', marginLeft:'10px', marginRight:'10px'}}
         onClick={this.handleMinEdit}>
						{this.state.min}
				</Button>
	}
	
	renderMax = () => {
		return this.state.maxEditing
			?<Textfield
				onBlur={this.saveTemp}
				pattern="-?[0-9]*(\.[0-9]+)?"
				error="Input is not a number!"
				label="Max temperature..."
				style={{width: '150px', textAlign: 'center'}}
			  value={this.state.max}
			  autofocus
				onChange={(e) => this.setState({max: e.target.value})}
			/>
			:<Button
				raised
         accent
         ripple
         style={{width:'135px', backgroundColor: '#4154B2', marginLeft:'10px', marginRight:'10px'}}
         onClick={this.handleMaxEdit}>
					{this.state.max}
			</Button>
	}
	
	renderSlider = () => {
		return (
		<Card shadow={0} style={{ width: '360px', height: '350px', margin: 'auto' }}>
			<CardTitle expand style={{ color: '#fff', background: `#FC4582 url(${temperature})`}}>Real time temperature</CardTitle>
			<CardText>
				<div className="slider" style={{background: 'linear-gradient(to right, blue, green, red)', width:'290px', borderRadius: '25px' }}>
					<div id="slidecontainer">
						<input type="range" min={parseInt(this.state.min-5)} max={parseInt(this.state.max)+5} value={this.state.current} className="slider" id="myRange" style={{ background: "transparent", position: "relative", top: "-2px", left: "-2px" }}/>
					</div>
				</div>
			</CardText>
			<CardText>
				<div style={{textAlign:'center', marginRight: '10%'}}>
					There are {this.state.current}°C in the room now
				</div>
			</CardText>
			<CardText>
				<CardActions>
					<Chip style={{marginLeft:'20px',marginRight:'20px'}}>
						Heating
						{
							(parseInt(this.state.current) < parseInt(this.state.min))
							?<ChipContact className="mdl-color--teal mdl-color-text--white">on</ChipContact>
							:<ChipContact className="mdl-color--red-700 mdl-color-text--white">off</ChipContact>
						}
					</Chip>
					<Chip style={{marginLeft:'50px',marginRight:'20px'}}>
						AC
						{
							parseInt(this.state.current) > parseInt(this.state.max)
							?<ChipContact className="mdl-color--teal mdl-color-text--white">on</ChipContact>
							:<ChipContact className="mdl-color--red-700 mdl-color-text--white">off</ChipContact>
						}
					</Chip>
				</CardActions>
			</CardText>
			<CardActions>
				{this.renderMin()}  
				{this.renderMax()}
			</CardActions>
		</Card>
			
		)
	}
	
	render(){
		console.log("state",this.state)
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