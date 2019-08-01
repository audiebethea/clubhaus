//this is a higher order component to render a red button
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';


const styles = {
    root : {
        color : 'red'
    }
}

function RedButton(props){
    const {classes} = props;

    return (
        <Button className = {classes.root} onClick = {props.onClick} variant={props.variant}>
            Take your university's club questionnaire!
        </Button>)
}


RedButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RedButton);