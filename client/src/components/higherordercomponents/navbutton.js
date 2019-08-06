//button to move to next page
import React from 'react';
import {withStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const styles = {
    root : {
        fontSize : '1.3vmax',
        margin : '1% 0% 5%'
    }
}

function NavButton(props) {
    const {classes} = props;

    return(
        <>
            <Button 
                variant='contained' 
                classes={{root : classes.root}}
                onClick={props.onClick} 
            >
                {props.text}    
            </Button>
        </>
    )
}

export default withStyles(styles)(NavButton);