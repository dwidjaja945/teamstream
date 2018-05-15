import React from 'react';
import teamLogo from './images/team-logo.png';
import pinIcon from './images/pin-icon.png';

export default props =>{
    const timeStamp = new Date().toLocaleTimeString();

    console.log("this is props from bulletinBoardMessage Component: ", props);
    const pinnedMessage = props.pin.map((item, index)=>{
        return(
            <div className="pinned userMessages" key={index}>
                <img className="teamLogo" src={teamLogo} alt="" />
                {item.firstName}
                {item.lastName}
                {timeStamp}

                <p >{item.message}</p>
            </div>
        )
    });
    return pinnedMessage;
}