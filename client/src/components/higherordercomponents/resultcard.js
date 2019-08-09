//this is a component that represents a result showing
//import statements
import React from 'react';
import {withStyles} from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';


const styles = {
    cardRoot : {
        margin : '0 18%'
    },
    cardHeaderRoot : {
        marginTop : '2%'
    },
}

function ResultCard(props){
    const {classes} = props;

    return (
        <Card raised = {true} classes={{root : classes.cardRoot}}>
            <h2 style={{float:'left', marginTop:'4%', marginLeft:'25%', fontSize:'calc(5px + 1.4vw'}}>{props.club.name}</h2>
            <img src={props.club.logoLink} alt="" style={{height:'7%', width:'7%', float:'right', marginTop:'2%', marginRight:'25%'}}></img>
            <hr style={{color : 'rgb(102, 101, 101)', margin : '12% 10% 2%', border: '1px solid'}}></hr>
            <CardContent>
                <p align = "start">
                    Match % : {props.club.matchPercent}
                </p>
                <p align = "start">
                    Matched Interests : {props.club.matchedInterests.toString()}
                </p>
                <a href={props.club.clubLink} target='_blank' rel="noopener noreferrer" align="end">More Info About This Club</a>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(ResultCard);