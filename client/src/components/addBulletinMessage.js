import React, {Component} from 'react';

class Bulletin extends Component{

    render(){
        return(
            <form className="bulletinContainer">
                <h1>This is going to be the bulletin section</h1>
                <input type="text"/>
                <button>Send</button>
            </form>
        )
    }
}
export default Bulletin;