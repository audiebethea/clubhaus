//this is a component that represents a result showing
//import statements
import React from 'react';
import {withStyles} from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import '../results/results.css';


const styles = {
    cardRoot : {
        margin : '0 18%'
    },
    cardHeaderRoot : {
        marginTop : '2%'
    },
}

function ResultCard(props){

    return (
        <Card raised = {true} style={{margin : '0 20%'}}>
            <h2 className='card-title'>{props.club.name}</h2>
            <img src={props.club.logoLink} alt="" className='club-logo'></img>
            <hr className='underline-card'></hr>
            <CardContent>
            <p className='description'>
                Description : {props.club.description}
            </p>
            <p className="match-percent">
                Match % : {props.club.matchPercent}
            </p>
            <p className="matched-interests">
                Matched Interests : {props.club.matchedInterests.toString()}
            </p> 
            <a href={props.club.clubLink} target='_blank' rel="noopener noreferrer" className='learn-more'>
                <Button>Learn More About This Club!</Button>
            </a>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(ResultCard);