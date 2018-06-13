import React from 'react';
import './bulletin_board.css';

export default (props) =>{
    console.log("this is the props in dropdown menu in bulletinBoard: ", props);
    return(
        <div className="dropdown">
            <button className="dropdownBtn">=</button>
            <div className="dropdownList">
                <div className="dropdownContent">{props.delete}</div>
                <div className="dropdownContent">{props.pinDrop}</div>
            </div>
        </div>
    )
}