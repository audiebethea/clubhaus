//this is the javascript file to describe the functions of the results page
//import statements
import React from 'react';
import HeaderBar from '../higherordercomponents/headerbar.js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import '../results/results.css';

let returnedClubs = [];

let pages = ["Interest", "Political", "Religious", "Cultural"];

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

        if(this.props.politicalAnswers[0] === "Not Interested"){
            returnedClubs = [];
            this.forceUpdate();
        }
        else{
            this.getClubs();
        }

    }

    async getClubs(){
        const university = this.props.chosenUniversity.replace(/\s/, '+');

        const query = '/filter/political/' + university;

        try{
            const response = await fetch(query, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(this.props.politicalAnswers)
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

                <hr style={{margin : '0 0 3%'}}></hr>

                <div className='nav-grid'>
                    {pages.map(page => {
                        if(page + "Results" === this.props.curPage){
                            return (<div>
                                <Button onClick={() => this.props.gotoPage(page + "Results")} style={{textDecoration:'underline'}}>{page + " Results"}</Button>
                            </div>)
                        }
                        else{
                            return (<div>
                                <Button onClick={() => this.props.gotoPage(page + "Results")}>{page + " Results"}</Button>
                            </div>)
                        }
                    })}
                </div>

                {returnedClubs.length !== 0 ? 
                    (returnedClubs.map(club => {
                        return (
                            <Card raised = {true} style={{margin : '0 20%'}}>
                                <h2 className='card-title'>{club.name}</h2>
                                <img src={club.logo} alt="" className='club-logo'></img>
                                <hr className='underline-card'></hr>
                                <CardContent>
                                <p className='description'>
                                    Description : {club.description}
                                </p>
                                <a href={club.clublink} target='_blank' rel="noopener noreferrer" style={{textDecoration:'none'}}>
                                    <Button style = {{fontSize : 'calc(6px + 1vw)', margin : '2% 0% 5%'}} variant='contained'>
                                        Learn More About This Club!
                                    </Button>
                                </a>
                                </CardContent>
                            </Card>
                        )
                    }))  : <h3 style = {{color : 'red'}}>Sorry, we couldn't find any compatible clubs. Please try again.</h3>  
                }
            </div>
        )
    }
}

