//This file is the javascript used for the questionnaire portion of the app

//import statements
import React from 'react';
import HeaderBar from '../higherordercomponents/headerbar.js';
import CheckboxGrid from '../higherordercomponents/checkboxgrid.js';
import NavButton from '../higherordercomponents/navbutton.js';
import QuestionsLayout from '../higherordercomponents/questionslayout.js';
import './questionnaire.css';



//interests array
const INTERESTS = ["Acting", "Bowling", "Chess", "Dancing", "Eating", "Fencing", "Guitar", "Hair Styling", "Ice Skating", "Jump Roping"];
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

    //initializes the state to previous entries if they exist
    componentDidMount(){
        if(Object.keys(this.props.chosenInterests).length !== 0){
            this.setState({checkboxes : this.props.chosenInterests})
        }
        if(Object.keys(this.props.chosenFilters).length !== 0){
            this.setState({filters : this.props.chosenFilters})
        }
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
    onSubmit(destination){
        //check to make sure they checked at least one thing as interested
        if(destination === 'Results' && !Object.values(this.state.checkboxes).includes("Interested")){
            this.setState({errorMessage : "You must select at least one interest."});
        }
        //hides error message and sets base.js's state to track interest & filter responses
        else{
            this.setState({errorMessage : ""});
            this.props.updateInterests(this.state.checkboxes);
            this.props.updateFilters(this.state.filters);
            this.props.gotoPage(destination);
        }
    }


    render(){
        return(
            <div>
                <HeaderBar showBackButton={true} gotoPage={this.onSubmit} destination='UniversitySelect'/>

                <h1 className='section-title'>INTERESTS</h1>
                <p style={{margin : '0% 12%'}}>
                    These answers will be used to match you to clubs that you may
                    be interested in. Please specify if each activity is particularly 
                    interesting or uninteresting to you, and leave the rest at neutral.
                    You will not be shown clubs that contain activities that you find
                    uninteresting.
                </p>

                <hr className='underline'></hr>

                <CheckboxGrid 
                    interests={INTERESTS} 
                    handleCheckboxChange={this.handleCheckboxChange}   
                    stateCheckboxes={this.state.checkboxes}
                />

                <h1 className='section-title'>QUESTIONS</h1>
                <p style={{margin : '0% 12%'}}>
                    Your answers for these questions will be used to filter out
                    clubs that you will likely not be interested in. If some of the
                    questions feel too personal or you would not like to have your 
                    clubs filtered this way, please use the "Prefer not to answer"
                    option.
                </p>

                <hr className='underline'></hr>

                <QuestionsLayout questions={QUESTIONS} answers={ANSWERS} onSelect={this.handleOptionSelect} stateFilters={this.state.filters}/>

                <NavButton text="See your matched clubs!" onClick={this.onSubmit}/>

                <p>{this.state.errorMessage}</p>
            </div>
        )
    }
}