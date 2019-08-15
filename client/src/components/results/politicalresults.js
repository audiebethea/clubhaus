//this is the javascript file to describe the functions of the results page
//import statements
import React from 'react';
import HeaderBar from '../higherordercomponents/headerbar.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import '../results/results.css';

let returnedClubs = [];

export default class PoliticalResults extends React.Component{
    //data will come in as a prop array "clubs"
    constructor(props){
        super(props);

        this.getClubs = this.getClubs.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
    }

    //happens as soon as component is called
    //gets data from database based on university, selected interests, selected filters
    componentDidMount(){
        window.scrollTo(0,0);

        this.getClubs();
    }

    async getClubs(){
        const university = this.props.chosenUniversity.replace(/\s/, '+');

        const query = '/filter/political' + university;

        try{
            const response = await fetch(query, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(this.props.filters),
            });
            if(response.ok){
                const jsonResponse = await response.json();

                returnedClubs = jsonResponse;

                this.forceUpdate();
            }
            else{
                throw new Error('Request Failed!');
            }
        }
        catch (error){
            console.log(error);
        }
    }

    //displayed
    render(){
        return(
            <div>
                <HeaderBar showBackButton={true} gotoPage={this.props.gotoPage} destination='Questionnaire'/>

                <hr style={{margin : '0 0 6%'}}></hr>

                <p>{returnedClubs.toString()}</p>

                {returnedClubs.map(club => {
                    return (
                        <Card raised = {true} style={{margin : '0 20%'}}>
                            <h2 className='card-title'>{club.name}</h2>
                            <img src={club.logo} alt="" className='club-logo'></img>
                            <hr className='underline-card'></hr>
                            <CardContent>
                            <p className='description'>
                                Description : {club.description}
                            </p>
                            <a href={club.clubLink} target='_blank' rel="noopener noreferrer" className='learn-more'>
                                <Button style = {{fontSize : 'calc(6px + 1vw)', margin : '2% 0% 5%'}}>
                                    Learn More About This Club!
                                </Button>
                            </a>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

