import {db} from './config/constants'

export class Operation {
	
	saveTemperatureRange = async (data) => {
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
	
	getTemperature = async () => {
		const motion = await db.ref('temperature').once('value')
		return motion.val()
	}
}