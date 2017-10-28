import {db} from './config/constants'

export class Operation {
	
	saveData = async () => {
		return db.ref().child(`data`)
			.set({
				data: "something"
			})
			.then((data) => data)
	}
}