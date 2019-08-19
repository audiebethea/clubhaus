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

export default class InterestResults extends React.Component{
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

    //this.props.chosenInterests is an object
    async getClubs(){
        //url-friendly string
        const university = this.props.chosenUniversity.replace(/\s/, '+');

        const query = '/interest/' + university;

        try{
            const response = await fetch(query, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(this.props.chosenInterests)
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
                                <Button onClick={() => this.props.gotoPage(page + "Results")} style={{textDecoration:'underline'}} variant='outlined'>{page + " Results"}</Button>
                            </div>)
                        }
                        else{
                            return (<div>
                                <Button onClick={() => this.props.gotoPage(page + "Results")} variant='outlined'>{page + " Results"}</Button>
                            </div>)
                        }
                    })}
                </div>

                {returnedClubs.length !== 0 ? (
                        returnedClubs.map(club => {
                            const matchedInterests = club.matchedInterests.toString().replace(/,/g, ', ');
                            const unrelatedInterests = club.unrelatedInterests.toString().replace(/,/g, ', ');

                            return (
                                <Card raised = {true} style={{margin : '0 20%'}}>
                                    <h2 className='card-title'>{club.name}</h2>
                                    <img src={club.logo} alt="" className='club-logo'></img>
                                    <hr className='underline-card'></hr>
                                    <CardContent>
                                    <h2>
                                        Match % : {club.matchPercent.toFixed(2)}
                                    </h2>
                                    <p className="matched-interests">
                                        Matched Interests : {matchedInterests}
                                    </p> 
                                    <p className="matched-interests">
                                        Unrelated Interests : {unrelatedInterests}
                                    </p> 
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
                        }
                    )) : <h3 style = {{color : 'red'}}>Sorry, we couldn't find any compatible clubs. Please try again.</h3>
                }
            </div>
        )
    }
}

