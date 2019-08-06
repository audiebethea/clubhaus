//higher order component to add some css to my checkbox portion of the questionnaire page
//import statements
import React from 'react';
import {withStyles} from '@material-ui/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormControl';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../questionnaire/questionnaire.css';


const styles = {
    radioRoot : {
        '&$radioChecked' : {
            color : 'rgb(90, 201, 238)'
        }
    },
    radioChecked : {}
}


function CheckboxGrid(props){
    const {classes} = props;

    return(
            <div className='checkbox-grid'>
                {props.interests.map(interest => {
                    return (
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">
                                    {interest}
                                </FormLabel>
                                <RadioGroup 
                                    onChange = {event => {
                                        props.handleCheckboxChange(interest, event.target.value)
                                    }} row
                                >
                                    <FormControlLabel 
                                        label = "Interested"
                                        labelPlacement = "Top"
                                        control={
                                            <Radio 
                                                checked = {props.stateCheckboxes[interest] === "Interested"}
                                                classes = {{root : classes.radioRoot, checked : classes.radioChecked}}
                                            />
                                        }
                                        value="Interested"
                                    />
                                    <FormControlLabel 
                                        label = "Neutral"
                                        labelPlacement = "Top"
                                        control = {
                                            <Radio 
                                                checked = {props.stateCheckboxes[interest] === "Neutral"}
                                                classes = {{root : classes.radioRoot, checked : classes.radioChecked}}
                                            />
                                        }
                                        value="Neutral"
                                    />
                                    <FormControlLabel 
                                        label = "Not Interested"
                                        labelPlacement = "Top"
                                        control={
                                            <Radio 
                                                checked = {props.stateCheckboxes[interest] === "Not Interested"}
                                                classes = {{root : classes.radioRoot, checked : classes.radioChecked}}
                                            />
                                        }
                                        value="Not Interested"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    )
                }
            )}
        </div>
    )
}


export default withStyles(styles)(CheckboxGrid);