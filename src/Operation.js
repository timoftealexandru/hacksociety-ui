import {db} from './config/constants'

export class Operation {
	
	saveData = async () => {
		return await db.ref().child(`data`)
			.set({
				data: "something"
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