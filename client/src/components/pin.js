import React from 'react';
import pinIcon from './images/pin-icon.png';



export default props =>{
    function handlePinMessage(){
			debugger;
        var updatedRoster = bulletinDummyData.splice(props.index,1);  
        console.log("This is the spliced info: ",updatedRoster);    
    }
    return(
        <div onClick={handlePinMessage} className="pin">
            <img  className="pin"src={pinIcon} alt=""/>
        </div>
    )
}