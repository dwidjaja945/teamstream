import React from 'react';

export default props => {
    return (
        <div>
            <label>{props.label}</label>
            <input {...props}/>
        </div>
    )
}

