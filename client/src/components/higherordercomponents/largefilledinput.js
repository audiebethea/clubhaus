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
        marginTop : '8vh'
    },
    input : {
        fontFamily : 'Verdana, Geneva, sans-serif',
        fontSize : '1.6vw',
        padding : '.85em',
        width: '42em',
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