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

//styles used for the component
const styles = {
    radioRoot : {
        '&$radioChecked' : {
            color : 'rgb(90, 201, 238)'
        }
    },
    radioChecked : {},
    fclRoot : {
        marginBottom : '3%'
    },
    fclLabel : {
        fontSize : 'calc(12px + .25vw)'
    }
}


function CheckboxGrid(props){
    const {classes} = props;

    //returns a grid layout of labeled checkboxes for each interest
    return(
            <div className='checkbox-grid' >
                {props.interests.map(interest => {
                    return (
                        <div>
                            <FormControl component="fieldset" style={{marginTop : '4%'}}>
                                <FormLabel component="legend" style={{fontSize:'calc(15px + .7vmax)'}}>
                                    {interest}
                                </FormLabel>
                                <hr className='underline'></hr>
                                <RadioGroup 
                                    style={{marginTop:'5%'}}
                                    onChange = {event => {
                                        props.handleCheckboxChange(interest, event.target.value)
                                    }}
                                    row
                                >
                                    <FormControlLabel
                                        label = 'Interested'
                                        labelPlacement = 'top'
                                        classes = {{root : classes.fclRoot, label : classes.fclLabel}}
                                        control={
                                            <Radio 
                                                checked = {props.stateCheckboxes[interest] === "Interested"}
                                                classes = {{root : classes.radioRoot, checked : classes.radioChecked}}
                                            />
                                        }
                                        value='Interested'
                                    />
                                    <FormControlLabel 
                                        label = 'Neutral'
                                        labelPlacement = 'top'
                                        classes = {{root : classes.fclRoot, label : classes.fclLabel}}
                                        control = {
                                            <Radio 
                                                checked = {props.stateCheckboxes[interest] === "Neutral"}
                                                classes = {{root : classes.radioRoot, checked : classes.radioChecked}}
                                            />
                                        }
                                        value='Neutral'
                                    />
                                    <FormControlLabel 
                                        label = 'Not Interested'
                                        labelPlacement = 'top'
                                        classes = {{root : classes.fclRoot, label : classes.fclLabel}}
                                        control={
                                            <Radio 
                                                checked = {props.stateCheckboxes[interest] === "Not Interested"}
                                                classes = {{root : classes.radioRoot, checked : classes.radioChecked}}
                                            />
                                        }
                                        value='Not Interested'
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