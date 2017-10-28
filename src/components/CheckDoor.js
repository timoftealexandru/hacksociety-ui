import React, {Component} from 'react';
import MDL from './MDL'

class CheckDoor extends Component{
    constructor(props){
        super(props)
        this.state={
            showComponent: false
        }
    }
    
    spaceFunction = (event) => {
        if(event.keyCode === 0){
            this.setState({showComponent:true})
        }
        else{
            console.log("N-ai apasat ce trebuie");
        }
    }

    componentDidMount(){
        document.addEventListener("keydown",this.spaceFunction, false);
    }

    componentWillMount(){
        document.removeEventListener("keydown",this.spaceFunction, false);
    }

    render(){
        return(
            <div>
                {
                    this.state.showComponent === true
                    ?<MDL/>
                    :null
                }
                <input onKeyPress={this.spaceFunction}/>
            </div>
        )
    }

}

export default CheckDoor;