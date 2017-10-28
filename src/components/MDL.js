import React, { Component } from 'react';
import { Button, Card, CardText, CardTitle, CardActions, CardMenu, IconButton } from 'react-mdl'

class ExampleMDL extends Component {

    render() {
        return (
            <Card shadow={0} style={{ width: '320px', height: '320px', margin: 'auto' }}>
                <CardTitle expand style={{ color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC' }}>Update</CardTitle>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenan convallis.
                </CardText>
                <CardActions border>
                    <Button colored>View Updates</Button>
                </CardActions>
            </Card>

        )
    }
}

export default ExampleMDL;