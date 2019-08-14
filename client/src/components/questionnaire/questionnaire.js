//This file is the javascript used for the questionnaire portion of the app

//import statements
import React from 'react';
import Select from '@material-ui/core/NativeSelect';
import HeaderBar from '../higherordercomponents/headerbar.js';
import CheckboxGrid from '../higherordercomponents/checkboxgrid.js';
import NavButton from '../higherordercomponents/navbutton.js';
import './questionnaire.css';



//interests array
const INTERESTS = ["Acting", "Bowling", "Chess", "Dancing", "Eating", "Fencing", "Guitar", "Hair Styling", "Ice Skating", "Jump Roping"];
//questions array
const QUESTIONS = ["What political groups would you like to see?", "What religious groups would you like to see?", "What cultural groups would you like to see?"];
//answers arrays
const politicalAnswers = ["Not Interested", "Conservative", "Liberal",];
const religiousAnswers = ["Not Interested", "Christian", "Muslim", "Hindu",];
const culturalAnswers = ["Not Interested", "Asian", "European", "Latin"];
const ANSWERS = [politicalAnswers, religiousAnswers, culturalAnswers];


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
            
            politicalAnswers : ['Not Interested'],
            religiousAnswers : ['Not Interested'],
            culturalAnswers : ['Not Interested'],
            hideErrorMessage : true,

            eventTargetValue : []
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handlePoliticalUpdate = this.handlePoliticalUpdate.bind(this);
        this.handleReligiousUpdate = this.handleReligiousUpdate.bind(this);
        this.handleCulturalUpdate = this.handleCulturalUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.myRef = React.createRef();   // Create a ref object for scrolling

    }

    //initializes the state to previous entries if they exist
    componentDidMount(){
        if(Object.keys(this.props.chosenInterests).length !== 0){
            this.setState({checkboxes : this.props.chosenInterests})
        }
        if(Object.keys(this.props.politicalAnswers).length !== 0){
            this.setState({politicalAnswers : this.props.politicalAnswers})
        }
        if(Object.keys(this.props.religiousAnswers).length !== 0){
            this.setState({religiousAnswers : this.props.religiousAnswers})
        }
        if(Object.keys(this.props.culturalAnswers).length !== 0){
            this.setState({culturalAnswers : this.props.culturalAnswers})
        }
        window.scrollTo(0,0);
    }

    //checkbox change event handler, changes checkbox and updates the state
    handleCheckboxChange(checkboxName, newStatus){
        this.setState(prevState => ({
            checkboxes : {
                ...prevState.checkboxes, [checkboxName] : newStatus
            }
        }))        
    }

    handlePoliticalUpdate(event){
        const selectedValue = event.target.value;

        this.setState({eventTargetValue : selectedValue});

        if(selectedValue.length > 1){
            const index = this.state.politicalAnswers.findIndex(answerValue => answerValue === selectedValue);
            if(index === -1){
                const newState = this.state.politicalAnswers;
                newState.push(selectedValue);
                this.setState({politicalAnswers : newState});
            }
            else{
                const newState = this.state.politicalAnswers;
                newState.splice(index, 1);
                this.setState({politicalAnswers : newState});
            }
        }
        else{
            const newState = [selectedValue];
            this.setState({politicalAnswers : newState});
        }

        
    }

    handleReligiousUpdate(event){
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.setState({religiousAnswers : value});
    }

    handleCulturalUpdate(event){
        const { options } = event.target.value;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        this.setState({culturalAnswers : value}); 
    }

    //handles submit
    onSubmit(destination){
        //check to make sure they checked at least one thing as interested
        if(destination === 'Results' && !Object.values(this.state.checkboxes).includes("Interested")){
            this.setState({hideErrorMessage : false});
            window.scrollTo(0, this.myRef.current.offsetTop) 
        }
        //hides error message and sets base.js's state to track interest & filter responses
        else{
            this.setState({hideErrorMessage : true});
            this.props.updateInterests(this.state.checkboxes);
            this.props.updatePolitical(this.state.politicalAnswers);
            this.props.updateReligious(this.state.updateReligious);
            this.props.updateCultural(this.state.updateCultural);
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

                <p style={{color:'red', fontSize:'calc(10px + .5vw)'}} hidden={this.state.hideErrorMessage} ref={this.myRef}>
                    You must select at least one interest.
                    </p>

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
                    clubs filtered this way, please use the "Not Interested"
                    option.
                </p>

                <hr className='underline'></hr>


                <div className='questions-grid'>
                    {QUESTIONS.map((question, index) => {
                        const answersToQuestion = ANSWERS[index];
                        let relatedState;
                        let updateFunction;
                        if(index === 0){
                            relatedState = this.state.politicalAnswers;
                            updateFunction = this.handlePoliticalUpdate;
                        }
                        else if(index === 1){
                            relatedState = this.state.religiousAnswers;
                            updateFunction = this.handleReligiousUpdate;
                        }
                        else{
                            relatedState = this.state.culturalAnswers;
                            updateFunction = this.handleCulturalUpdate;
                        }
                        return(
                            <div style={{padding:'2.5%'}}>
                                <h3 className='question'>{question}</h3>
                                <Select 
                                    multiple
                                    className='native-select'
                                    children = {answersToQuestion.map(answer => {
                                        return <option value={answer}>{answer}</option>
                                    })}
                                    onChange = {event => updateFunction(event)}
                                    //value = {relatedState}
                                /> 
                            </div>
                        )
                    })}
                </div>

                <NavButton text="See your matched clubs!" onClick={this.onSubmit} destination='InterestResults'/>

                <p>{this.state.politicalAnswers.toString()} HELLO</p>

                <p>{this.state.eventTargetValue.toString()}HELLO2</p>

            </div>
        )
    }
}