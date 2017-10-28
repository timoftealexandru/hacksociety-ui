import React, { Component } from 'react';
import { Button, Card, CardText, CardTitle, CardActions, CardMenu, IconButton } from 'react-mdl'

class ExampleMDL extends Component {

    takePicture(){
        alert("New picture");
    }

    render() {
        return (
            <Card shadow={0} style={{ width: '320px', height: '320px', margin: 'auto' }}>
                <CardTitle expand style={{ color: '#fff', background: 'grey' }}>Task 1: New visitor at the door</CardTitle>
                <CardText>
                    You have a new visitor at the door! Do you want to see who is out there?
                </CardText>
                <CardActions border>
                    <Button colored>Ignore</Button>
                    <Button colored onClick={this.takePicture}>Take picture</Button>
                </CardActions>
            </Card>

        )
    }
}

export default ExampleMDL;