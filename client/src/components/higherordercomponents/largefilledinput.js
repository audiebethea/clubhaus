//this is a higher order component to render a customized filled input
import React from 'react';
import {withStyles} from '@material-ui/styles';
import FilledInput from '@material-ui/core/FilledInput';

const styles = {
    root : {
        color : 'black',
        marginTop : '6%',
    },
    input : {
        fontFamily : 'Verdana, Geneva, sans-serif',
        fontSize : '135%',
        padding : '2.5% 280px',
        width: '400px',
        textAlign : 'center',
    },
}

function LargeFilledInput(props){
    const {classes} = props;

    return(
        <FilledInput
            classes={{root : classes.root, input : classes.input, underline : classes.underline}}
            onChange={props.onChange} 
            placeholder={props.placeholder}
            value={props.value}
        />
    )
}

export default withStyles(styles)(LargeFilledInput);