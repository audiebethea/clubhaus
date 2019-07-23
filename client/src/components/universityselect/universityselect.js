import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

//supported universities change?
const UNIVERSITIES = ["The University of Texas at Austin", "Texas A&M University", "Texas Christian University"];

//this component is used to determine the user's university so clubs and colleges
//can be grabbed from the database for that particular university
export default class UniversitySelect extends React.Component{

    //initialize state and bind the onChangeHandler function
    constructor(props){
        super(props);

        this.state = {
            input : ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectedUniversity = this.handleSelectedUniversity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //each time the input bar is changed, update the state's current
    //input and current matching universities fields
    handleInputChange(curInput){
        this.setState({input : curInput});
    }

    //updates university selected from dropdown
    handleSelectedUniversity(selectedUniversity){
        this.setState({input : selectedUniversity});
    }

    //gets colleges from this university and move to the next page
    onSubmit(){

    }

    render(){
        return(
            <div>
                <p>Search for your university using either the search bar or the dropdown menu!</p>
                <input onChange={this.handleChange} placeholder='Enter your university here'/>

                <Dropdown 
                    options={UNIVERSITIES}
                    onChange={this.handleSelectedUniversity}
                    placeholder='Browse through universities here...'
                />

                <button onClick={this.onSubmit}>
                    Take your university's club questionnaire!
                </button>

            </div>
        )
    }
}



