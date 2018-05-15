import React, {Component} from 'react';
import './bulletinBoard.css';
import BulletinBoardMessages from './bulletinBoardMessage';
import bulletinDummyData from './bulletinDummyData';
import AddBulletinMessages from './addBulletinMessage';



class BulletinBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageArray: bulletinDummyData,
            hasPinned: false
        }

        console.log("Dummy Bulletin Data: ", bulletinDummyData);
        this.pinMessage = this.pinMessage.bind(this);
    }

    addMessage(message){
        const {hasPinned, messageArray} = this.state;
        if(hasPinned){
            const newMessageArray = messageArray.splice(1,0,message);
            this.setState({
                messageArray
            });
        }
        else{
            this.setState({
                messageArray: [message, ...this.state.messageArray]
            });
        }

	}

    pinMessage(index) {
        const {messageArray} = this.state;
        var {hasPinned} = this.state;
        var updatedRoster = messageArray.splice(index,1); 
        messageArray.unshift(updatedRoster[0]); 
        console.log("This is the index: ", index);

        hasPinned = true;

        this.setState({
            messageArray,
            hasPinned
        });
    }
    render() {
        const {messageArray} = this.state;
        return (
            <div>
                <div className="pinnedMessage"></div>
                <div className="messageContainer">
                    <BulletinBoardMessages pinCallBack={this.pinMessage} data={messageArray} />

            </div>
            <AddBulletinMessages add={this.addMessage.bind(this)}/>

            </div>
        )
    }
}
export default BulletinBoard;