import React, {Component} from 'react'
import '../assets/index.css';
import {Slider} from 'react-mdl'

class Temperature extends Component {
	constructor(props) {
		super(props)
		this.state={
			min:15,
			max:25,
			current: 20
		}
	}
	
	renderSlider = () => {
		return (
			<div className="slider">
				<Slider min={this.state.min} max={this.state.max} defaultValue={this.state.current} />
			</div>
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