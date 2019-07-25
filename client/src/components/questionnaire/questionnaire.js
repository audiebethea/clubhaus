//This file is the javascript used for the questionnaire portion of the app
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NativeSelect from '@material-ui/core/NativeSelect';


//interests array
const INTERESTS = ["Acting", "Dancing", "Chess", "Eating", "Fencing", "Guitar", "Hair Styling", "Ice Skating", "Jump Roping"];
//questions and answers
const QUESTIONS = ["What would you like to drink today?", "What would you like to eat today?"];
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
                    ...interests, [interest] : false 
                }), 
                {}
            ),
            
            filters : QUESTIONS.reduce(
                (questions, question) => ({
                    ...questions, [question] : "Prefer Not To Answer"
                }),
                {}
            )
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleOptionSelect = this.handleOptionSelect.bind(this);
    }

    //checkbox change event handler, changes checkbox and updates the state
    handleCheckboxChange(e){
        const checkboxName = e.target.value;
        this.setState(prevState => ({
            checkboxes : {
                ...prevState.checkboxes, [checkboxName] : !prevState.checkboxes[checkboxName]
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


    render(){
        return(
            <div>
                <div>
                    <h1>INTERESTS</h1>
                    <p>
                        These answers will be used to match you to clubs that you may
                        be interested in. Please select every option that interests you.
                    </p>
                    {INTERESTS.map(interest => {
                        return <FormControlLabel 
                            control = {
                                <Checkbox 
                                    checked={this.state.checkboxes[interest]}
                                    onChange={this.handleCheckboxChange}
                                    value={interest}
                                />
                            }
                            label = {interest}
                        />
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
                                        onChange = {(event) => {this.handleOptionSelect(event, question)}}
                                        question = {question}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
        )
    }
}