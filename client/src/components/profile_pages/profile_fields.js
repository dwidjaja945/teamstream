import React from 'react';

export default props => {
    const {addmorebutton} = props; 
    return (
        <div>
            <label>{props.label}</label>
            <input {...props}/>
            {addmorebutton}
        </div>
    )
}

