import React from 'react';
import athleteRosterData from './athleteRosterData';
import './roster.css';

export default props=>{
    console.log("This is dummy data", athleteRosterData);

    const listElements = athleteRosterData.map((item, index)=>{
        return <div key={index} className="name">
        <img src="" alt=""/>
        {item.firstName} {item.lastName}
        </div>
    });
    return (
        <div className="container">
            <h1 className="rosterHeader">Roster</h1>
            <div className="namesContainer">
            <ul className="list-group">
                {listElements}
            </ul>
            </div>
            
        </div>
    )
}