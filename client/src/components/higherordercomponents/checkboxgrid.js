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
    radioGroup : {
        ['@media (min-width:600px)'] : { // eslint-disable-line no-useless-computed-key
            width: 'auto',
            height: 'auto',
            display: 'flex',
            flexWrap: 'nowrap',
            flexDirection: 'row'
        }
    },
    controlLabel : {
        labelPlacement : 'top'
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
                            <FormControl component="fieldset">
                                <FormLabel component="legend" style={{marginBottom : '1.5em'}}>
                                    {interest}
                                </FormLabel>
                                <RadioGroup 
                                    onChange = {event => {
                                        props.handleCheckboxChange(interest, event.target.value)
                                    }}
                                    row
                                >
                                    <FormControlLabel
                                        classes={{label : classes.controlLabel}} 
                                        label = "Interested"
                                        labelPlacement = 'top'
                                        control={
                                            <Radio 
                                                checked = {props.stateCheckboxes[interest] === "Interested"}
                                                classes = {{root : classes.radioRoot, checked : classes.radioChecked}}
                                            />
                                        }
                                        value="Interested"
                                    />
                                    <FormControlLabel 
                                        classes={{root : classes.controlLabelRoot}} 
                                        label = "Neutral"
                                        labelPlacement = 'top'
                                        control = {
                                            <Radio 
                                                checked = {props.stateCheckboxes[interest] === "Neutral"}
                                                classes = {{root : classes.radioRoot, checked : classes.radioChecked}}
                                            />
                                        }
                                        value="Neutral"
                                    />
                                    <FormControlLabel 
                                        classes={{root : classes.controlLabelRoot}}
                                        label = "Not Interested"
                                        labelPlacement = 'top'
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