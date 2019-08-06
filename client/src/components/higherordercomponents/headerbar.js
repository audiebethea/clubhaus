//import statements
import React from 'react';
import {withStyles} from '@material-ui/styles';
import AppBar  from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded'


const styles = {
    appbarRoot : {
        display : 'block',
        backgroundColor : 'rgb(90, 201, 238)',
        padding : '2%',
    },
    buttonRoot : {
        backgroundColor : 'white',
        color : 'black',
        padding : '.5% 3%'
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
                <img style={{height:'5%', width:'5%', marginLeft:'47%', marginRight:'50%'}} 
                    src='https://i.pinimg.com/originals/87/dc/47/87dc47b44d7bdf288fbdfaea95585b70.jpg' 
                    alt=''>
                </img>
            </Toolbar>
        </AppBar>
        <hr style={{marginTop : '8%'}}></hr>
        </>
    )
}

export default withStyles(styles)(HeaderBar);