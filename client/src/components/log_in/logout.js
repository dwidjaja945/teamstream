import React from "react";
import "../styles.css";
import axios from "axios/index";

export default props => {

    function logout(){
        console.log('clicked loggout');

        const path = '/api/logout';
        axios.get(path).then( (response) => {
            console.log('This is the response from logging out: ', response);

            if(response.data.success){
                //data was properly sent to server.
                props.history.push(response.data.redirect);
            }else{
                //data failed, need to handle it
            }

        })

    }
    logout();
    return (
        <div>
            <h2>Logging you out!</h2>
        </div>
    )
}
