//this is a higher order component to render a customized filled input
//import statements
import React from 'react';
import {withStyles} from '@material-ui/styles';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment  from '@material-ui/core/InputAdornment';
import IconButton  from '@material-ui/core/IconButton';
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';



//styles
const styles = {
    root : {
        color : 'black',
        margin : '8vh 8% 0'
    },
    input : {
        fontFamily : 'Verdana, Geneva, sans-serif',
        fontSize : 'calc(6px + 1.2vw)',
        padding : '.9em 10em',
        width: '30vw',
        textAlign : 'center',
    }
}

//function component
function LargeFilledInput(props){
    const {classes} = props;

    return(
        <FilledInput
            classes={{root : classes.root, input : classes.input}}
            onChange={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
            endAdornment={
                <InputAdornment
                    children={
                        <IconButton
                            onClick={props.onIconButtonClick}
                            style={{color : 'black'}}
                            children={<ArrowForwardRounded/>}
                        />
                    }
                />
            }
        />
    )
}

export default withStyles(styles)(LargeFilledInput);