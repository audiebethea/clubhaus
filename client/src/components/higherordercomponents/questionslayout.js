//higher order component for questions
//import statements
import React from 'react';
import {withStyles} from '@material-ui/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../questionnaire/questionnaire.css';



//styles
const styles = {
    fclRoot : {
        margin : '2.5% 0'
    },
    fclLabel : {
        marginRight : '5%',
        fontSize : 'calc(8px + .8vw)'
    },
}

function QuestionsLayout(props){
    const {classes} = props;

    return(

        <div className='questions-grid'>
            {props.questions.map((question, index) => {
                const answersToQuestion = props.answers[index];
                return(
                    <div>
                        <FormControlLabel 
                            classes = {{root : classes.fclRoot, label : classes.fclLabel}}
                            label = {question}
                            labelPlacement = 'start'
                            control = {
                                <NativeSelect 
                                    children = {answersToQuestion.map(answer => {
                                        return <option value={answer}>{answer}</option>
                                    })}
                                    onChange = {event => {props.onSelect(event, question)}}
                                    value = {props.stateFilters[question]}
                                />
                            }
                        />                        
                    </div>
                )
            })}
        </div>

    )
}

export default withStyles(styles)(QuestionsLayout);