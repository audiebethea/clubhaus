//in this implementation, there will be no dropdown menu, just a list of supported universities


import React from 'react';

//supported universities
const UNIVERSITIES = ["The University of Texas at Austin", "Texas A&M University", "Texas Christian University"];

//this component is used to determine the user's university so clubs and colleges
//can be grabbed from the database for that particular university
export default class UniversitySelect extends React.Component{

    //initialize state and bind the onChangeHandler functio
    constructor(props){
        super(props);

        this.state = {S
            input : "",
            errorMessage : ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //each time the input bar is changed, update the state's current
    //input and current matching universities fields
    handleInputChange(e){
        this.setState({input : e.target.value});
    }

    //gets colleges from this university and move to the next page
    onSubmit(){
        if(!UNIVERSITIES.includes(this.state.input)){
            this.setState({errorMessage : "Sorry, we couldn't find any data on that university. "
                + "Please check your spelling and make sure your university is on our list of supported "
                + "universities."});
        }
        //continue on with submitting
        else{
            
        }
    }

    render(){
        return(
            <div>
                <p className="input-directions">Search for your university using the search bar!</p>

                <input 
                    className="university-input" 
                    onChange={this.handleInputChange} 
                    placeholder='Enter your university here' 
                />

                <div>
                    <p>Supported Universities:</p>
                    <ul>
                        {UNIVERSITIES.map(university => {
                            return <li>{university}</li>
                        })}
                    </ul>
                </div>

                <button className="submit-button" onClick={this.onSubmit}>
                    Take your university's club questionnaire!
                </button>

                <p className="error-message">{this.state.errorMessage}</p>
            </div>
        )
    }
}



