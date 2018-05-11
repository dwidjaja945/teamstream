import React from 'react';
import BulletinDummyData from './bulletinDummyData';
import teamLogo from './images/team-logo.png';
import './bulletinBoard.css';

export default props => {
    const timeStamp = new Date().toLocaleTimeString();
    const bulletinMessages = BulletinDummyData.map((item, index)=>{
        return (
                <div className="userMessages" key={index}>
                    <img className="teamLogo" src={teamLogo} alt=""/>{item.firstName} {item.lastName} {timeStamp}
                    <p>{item.message}</p>
                </div>
        )
    });
    return (
        <div>
            <h1>This is where the Bulletin Board Messages will display</h1>
            <div className="messageContainer">
                {bulletinMessages}
            </div>
        </div>
    )
}