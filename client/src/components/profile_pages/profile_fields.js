import React from 'react';

export default props => {
    const {addMoreButton} = props;
    return (
        <div>
            <label>{props.label}</label>
            <input {...props}/>
            {addMoreButton}
        </div>
    )
}

