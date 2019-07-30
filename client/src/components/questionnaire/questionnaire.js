//This file is the javascript used for the questionnaire portion of the app
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormControl';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';



//interests array
const INTERESTS = ["Acting", "Dancing", "Chess", "Eating", "Fencing", "Guitar", "Hair Styling", "Ice Skating", "Jump Roping"];
//questions array
const QUESTIONS = ["What would you like to drink today?", "What would you like to eat today?"];
//answers arrays
const q1Answers = ["Prefer Not To Answer", "Dr. Pepper", "Lemonade", "Topo Chico", "Sweet Tea"];
const q2Answers = ["Prefer Not To Answer", "Spaghetti", "Burger", "Orange Chicken", "Tacos", "Fruit Salad"];
const ANSWERS = [q1Answers, q2Answers];


export default class Questionnaire extends React.Component{
    //there will be a prop with the name of the chosen university
    constructor(props){
        super(props);

        this.state = {
            checkboxes : INTERESTS.reduce(
                (interests, interest) => ({
                    ...interests, [interest] : "Neutral" 
                }), 
                {}
            ),
            
            filters : QUESTIONS.reduce(
                (questions, question) => ({
                    ...questions, [question] : "Prefer Not To Answer"
                }),
                {}
            ),

            errorMessage : ""
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleOptionSelect = this.handleOptionSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //checkbox change event handler, changes checkbox and updates the state
    handleCheckboxChange(checkboxName, newStatus){
        this.setState(prevState => ({
            checkboxes : {
                ...prevState.checkboxes, [checkboxName] : newStatus
            }
        }))        
    }

    //option select handler, updates the filters with the selected value
    handleOptionSelect(e, question){
        const selectedAnswer = e.target.value;
        this.setState(prevState => ({
            filters : {
                ...prevState.filters, [question] : selectedAnswer
            }
        }));
    }

    //handles submit
    onSubmit(){
        if(!Object.values(this.state.checkboxes).includes("Interested")){
            this.setState({errorMessage : "You must select at least one interest."});
        }
        else{
            this.setState({errorMessage : ""});
            this.props.gotoPage("Results");
        }
    }


    render(){
        return(
            <div>
                <div>
                    <h1>INTERESTS</h1>
                    <p>
                        These answers will be used to match you to clubs that you may
                        be interested in. Please specify if each activity is particularly 
                        interesting or disinteresting to you, and leave the rest at neutral.
                        You will not be shown clubs that contain activities that you find
                        disinteresting.
                    </p>
                    {INTERESTS.map(interest => {
                        return (
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">{interest}</FormLabel>
                                    <RadioGroup aria-label="position" name="position" 
                                        onChange = {event => {
                                            this.handleCheckboxChange(interest, event.target.value)
                                        }} row>
                                            <FormControlLabel 
                                                label = "Interested"
                                                labelPlacement = "Top"
                                                control={
                                                    <Radio 
                                                        checked = {this.state.checkboxes[interest] === "Interested"}
                                                    />
                                                }
                                                value="Interested"
                                            />
                                            <FormControlLabel 
                                                label = "Neutral"
                                                labelPlacement = "Top"
                                                control = {
                                                    <Radio 
                                                        checked = {this.state.checkboxes[interest] === "Neutral"}
                                                    />
                                                }
                                                value="Neutral"
                                            />
                                            <FormControlLabel 
                                                label = "Not Interested"
                                                labelPlacement = "Top"
                                                control={
                                                    <Radio 
                                                        checked = {this.state.checkboxes[interest] === "Not Interested"}
                                                    />
                                                }
                                                value="Not Interested"
                                            />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <h1>QUESTIONS</h1>
                    <p>
                        Your answers for these questions will be used to filter out
                        clubs that you will likely not be interested in. If some of the
                        questions feel too personal or you would not like to have your 
                        clubs filtered this way, please use the "Prefer not to answer"
                        option.
                    </p>
                    <div>
                        {QUESTIONS.map((question, index) => {
                            const answersToQuestion = ANSWERS[index];
                            return(
                                <div>
                                    <h2>{question}</h2>
                                    <NativeSelect 
                                        children = {answersToQuestion.map(answer => {
                                            return <option value={answer}>{answer}</option>
                                        })}
                                        onChange = {event => {this.handleOptionSelect(event, question)}}
                                        question = {question}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <Button variant="contained" onClick={this.onSubmit}>
                        View your matched clubs!
                    </Button>
                </div>

                <p>{this.state.errorMessage}</p>
            </div>
        )
    }
}