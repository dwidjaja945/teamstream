import React from "react";
import athleteRosterData from "./athleteRosterData";
import "./roster.css";


export default props=>{
    console.log("This is dummy data", athleteRosterData);
    for(var rosterIndex = 0; rosterIndex < athleteRosterData.length; rosterIndex++){
        if(athleteRosterData[rosterIndex].userLevel >= 1){
          var updatedRoster = athleteRosterData.splice(rosterIndex,1);  
          athleteRosterData.unshift(updatedRoster[0]);  
        }
      }
      console.log(updatedRoster);
    const listElements = athleteRosterData.map((item, index, arr)=>{
        if(item.userLevel >= 1){ 
            return <div key={index} className="coach">
                Coach: {item.firstName} {item.lastName}
            </div>
        }else{
        return <div key={index} className="name">
        <img src="" alt=""/>
        {item.firstName} {item.lastName}
        </div>
        }
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

