//import statements
import React from 'react';
import Button from '@material-ui/core/Button';
import LargeFilledInput from '../higherordercomponents/largefilledinput.js';
import HeaderBar from '../higherordercomponents/headerbar.js'
import './universityselect.css';

//supported universities
const UNIVERSITIES = ["The University of Texas at Austin", "Texas A&M University", "Texas Christian University", "Rice University",
                        "Baylor University", "Texas Tech University", "Southern Methodist University", "University of Houston",
                        "Eastfield College", "Richland College", "Texas State University", "North Texas University"];

//this component is used to determine the user's university so clubs and colleges
//can be grabbed from the database for that particular university
export default class UniversitySelect extends React.Component{

    //initialize state and bind the onChangeHandler function
    constructor(props){
        super(props);

        this.state = {
            input : this.props.chosenUniversity,
            hideErrorMessage : true
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOptionClicked = this.handleOptionClicked.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    //each time the input bar is changed, update the state's current
    //input and current matching universities fields
    handleInputChange(e){
        this.setState({input : e.target.value});
    }

    //put clicked option into the search field
    handleOptionClicked(selectedUniversity){
        this.setState({input : selectedUniversity});
    }

    //gets colleges from this university and move to the next page
    onSubmit(){
        if(!UNIVERSITIES.includes(this.state.input)){
            this.setState({hideErrorMessage : false});
        }
        //continue on with submitting
        else{
            this.setState({hideErrorMessage : true})
            this.props.updateUniversity(this.state.input);
            this.props.gotoPage("Questionnaire");
        }
    }



    //render function
    render(){
        return(
            <div>
                <HeaderBar showBackButton={false}/>

                <LargeFilledInput 
                    onChange={this.handleInputChange}
                    onIconButtonClick={this.onSubmit} 
                    placeholder='Enter your university here...'
                    value={this.state.input}
                />

                <p className="error-message" hidden={this.state.hideErrorMessage}>
                    Sorry, we couldn't find any data on that university. 
                    Please check your spelling and make sure your university is on our list of supported
                    universities.
                </p>

                <h2 style={{marginBottom : '3%', marginTop : '3%'}}>OR</h2>

                <h4>select a university from the supported universities below:</h4>

                <p className="clublist">
                    {UNIVERSITIES.map((university, index) => {
                        const bullet = index !== UNIVERSITIES.length - 1 ? <span>&#8226;</span> : "";
                        return(
                            <>
                                <span  className="cluboption"
                                    onClick = {() => {this.handleOptionClicked(university)}}>
                                        {university} 
                                </span>
                                <span>&nbsp;{bullet}&nbsp;</span>
                            </>
                        )
                    })}
                </p>

                <Button 
                    variant = 'contained' 
                    onClick={this.onSubmit} 
                >
                        Take your university's club questionnaire!
                </Button>

            </div>
        )
    }
}



