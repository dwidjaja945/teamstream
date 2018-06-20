import React from 'react';
import dropdownIcon from '../images/dropdown-Icon.png';
import './bulletin_board.css';

export default (props) => {
    const { pinned } = props.pinDrop.props;

    console.log("this is the pinned attribute in props: ", props.pinDrop.props.pinned);
    return (
        <div className="dropdown">
            <img className="dropdownIcon" src={dropdownIcon} alt="" />
            <div className="dropdownList">
                <div className="dropdownContent">
                {props.pinDrop} 
                <br/>
                {props.delete}
                </div>
            </div>
        </div>
    )
}