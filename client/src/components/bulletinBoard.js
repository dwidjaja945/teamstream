import React from 'react';
import teamLogo from './images/team-logo.png';
import PinMessage from './pin';
import './bulletinBoard.css';

export default props => {
    
    console.log("Dummy Bulletin Data: ", props.data);
    console.log("This is the pins props",props.pin)

    const timeStamp = new Date().toLocaleTimeString();
    const bulletinMessages = props.data.map((item, index)=>{
        // function closure(){
        //     <div onClick={props.pin(index)} className="pin">
        //          <img  className="pin"src={pinIcon} alt=""/>
        //      </div>
        // }
        return (
                <div className="userMessages" key={index}>
                    <img className="teamLogo" src={teamLogo} alt=""/>
                    {item.firstName} 
                    {item.lastName} 
                    {timeStamp} 
                    <PinMessage index={index}/>
                    <p>{item.message}</p>
                </div>
        )
    });
    
    return (
        <div>
            <div className="pinnedMessage"></div>
            <div className="messageContainer">
                {bulletinMessages}
            </div>
        </div>
    )
}