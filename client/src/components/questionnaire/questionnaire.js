//This file is the javascript used for the questionnaire portion of the app
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const INTERESTS = ["Acting", "Dancing", "Chess", "Eating", "Fencing", "Guitar", "Hair Styling", "Ice Skating", "Jump Roping"];

export default class Questionnaire extends React.Component{
    //there will be a prop with the name of the chosen university
    constructor(props){
        super(props);

        this.state = {
            actingChecked : false
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    //checkbox change event handler
    handleCheckboxChange(e){
        const isCheckboxChecked = this.state.
        this.setState({[e.target.value] : [e.target.checked]});
    }


    render(){
        return(
            <div>
                <p>Please select every option that you are interested in.</p>
                <FormControlLabel 
                    control={
                        <Checkbox checked={this.state.actingChecked}
                            onChange={this.handleCheckboxChange}
                            value="actingChecked"
                        />
                    }
                    label="Acting"
                />
            </div>
        )
    }
}