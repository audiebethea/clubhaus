import React from 'react';
import UniDropdown from './unidropdown.js';
//import DropDownInput from 'react-dropdown-input';

//supported universities change? check this change please
const UNIVERSITIES = ["The University of Texas at Austin", "The Shit Tier Aggies"];

//this component is used to determine the user's university so clubs and colleges
//can be grabbed from the database for that particular university
export default class UniversitySelect extends React.Component{

    //initialize state and bind the onChangeHandler function
    constructor(props){
        super(props);

        this.state = {
            input : "",
            matchingUniversities: UNIVERSITIES
        }

        this.handleChange = this.handleChange.bind(this);
        this.scanInput = this.scanInput.bind(this);
        this.autoFill = this.autoFill.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //each time the input bar is changed, update the state's current
    //input and current matching universities fields
    handleChange(e){
        const curInput = e.target.value;
        const curUniversities = this.scanInput(curInput);

        this.setState({input : curInput, matchingUniversities : curUniversities});
    }

    //scans current input to filter out universities that the
    //user doesn't seem to be typing
    scanInput(curInput){
        return UNIVERSITIES.filter(uni => {
            return uni.includes(curInput);
        });
    }

    autoFill(selectedUniversity){
        const curUniversities = this.scanInput(selectedUniversity);
        this.setState({input : selectedUniversity, matchingUniversities : curUniversities});
    }

    //gets colleges from this university and move to the next page
    onSubmit(){

    }

    render(){
        return(
            <div>
                
                <input onChange={this.handleChange}/>

                <UniDropdown handleChange={this.handleChange}
                    autoFill={this.autoFill}
                    universities={this.state.matchingUniversities}
                />

                <button onClick={this.onSubmit}>
                    Take your university's club questionnaire!
                </button>

            </div>
        )
    }
}



