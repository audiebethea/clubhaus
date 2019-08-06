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
        marginTop : '5%',
    },
    input : {
        fontFamily : 'Verdana, Geneva, sans-serif',
        fontSize : '135%',
        padding : '2.5% 280px',
        width: '400px',
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
                            tooltip='Continue'
                        />
                    }
                />
            }
        />
    )
}

export default withStyles(styles)(LargeFilledInput);