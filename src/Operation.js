import {db} from './config/constants'

export class Operation {
	
	saveTemperature = async (data) => {
		return await db.ref().child('temperatureRange')
			.set({
				min: data.min,
				max: data.max
			})
	}
	
	getMotion = async () => {
		const motion = await db.ref('motion').once('value')
		return motion.val()
	}
	
	getDistance = async () => {
		const dist = await db.ref('ultrasonic').once('value')
		return dist.val().distance
	}
	
	
	getTemperature = async () => {
		const temp = await db.ref('temperature').once('value')
		const range = await db.ref('temperatureRange').once('value')
		return {
			min: range.val().min,
			max: range.val().max,
			current: temp.val().current
		}
	}
}