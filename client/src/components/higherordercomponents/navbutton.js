//button to move to next page
import React from 'react';
import {withStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
    root : {
        fontSize : 'calc(4px + 1.3vw)',
        margin : '2% 0% 5%'
    }
}

function NavButton(props) {
    const {classes} = props;

    return(
        <>
            <Button 
                variant='contained' 
                classes={{root : classes.root}}
                onClick={() => props.onClick(props.destination)} 
            >
                {props.text}    
            </Button>
        </>
    )
}

export default withStyles(styles)(NavButton);