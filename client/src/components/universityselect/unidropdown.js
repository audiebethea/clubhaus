import React from 'react';

export default class UniDropdown extends React.Component{
    constructor(props){
        super(props);

        this.state = {

        }

        this.handleClick = this.handleClick.bind(this);
    }


    //onclick event handler
    handleClick(e){
        this.props.autoFill(e.target.value);
    }

    render(){
        //check if we don't have any matching universities
        let menuItems = [];
        if(!this.props.universities){
            menuItems[0] = "Sorry, we can't find anything.";
        }
        else{
            menuItems = this.props.universities;
        }

        
        return(
            <div>
                <menu>
                    {menuItems.map(item => {
                        return <menuitem label={item} onClick={this.handleClick}>
                        </menuitem>
                    })}
                </menu>
            </div>
        )

    }

}