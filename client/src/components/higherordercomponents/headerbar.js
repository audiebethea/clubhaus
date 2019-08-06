//import statements
import React from 'react';
import {withStyles} from '@material-ui/styles';
import AppBar  from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import clubhauslogo from '../../clubhauslogo.png';


const styles = {
    appbarRoot : {
        display : 'block',
        backgroundColor : 'rgb(90, 201, 238)',
        padding : '2vh 0%',
    },
    buttonRoot : {
        backgroundColor : 'white',
        color : 'black',
        padding : '.5vh 3vw'
    }
}

function HeaderBar(props) {
    const {classes} = props;

    return(
        <>
        <AppBar classes={{root : classes.appbarRoot}}>
            <Toolbar>
                {props.showBackButton ? 
                    <Button edge='start' classes={{root : classes.buttonRoot}} variant='contained' onClick={() => props.gotoPage(props.destination)}>
                        <ArrowBackRounded />
                        Back
                    </Button> 
                    : null
                }
                <img style={{height:'8.5vh', width:'8.5vw', left:'0', right:'0', margin:'0 auto'}} 
                    src={clubhauslogo} 
                    alt=''>
                </img>
            </Toolbar>
        </AppBar>
        <hr style={{marginTop : '12vh'}}></hr>
        </>
    )
}

export default withStyles(styles)(HeaderBar);