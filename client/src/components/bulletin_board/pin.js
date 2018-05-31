import React, { Component } from 'react';
import pinIcon from "../images/pin-icon.png";
import UnpinModal from "./unpin_modal";

class Pin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false
        }

        this.unpinWarning = this.unpinWarning.bind(this);
        this.removeModal = this.removeModal.bind(this);
    }

    unpinWarning(pin_level) {
        const {pinMessage, post_id, hasPinned } = this.props;

        if(!hasPinned){
            pinMessage(post_id, pin_level);
            this.removeModal();
            return;
        }

        if (pin_level >= 0) {
            this.setState({
                modalOpen: true
            });
        }
    }

    removeModal() {
        this.setState({
            modalOpen: false
        });
    }

    render() {
        const { pinMessage, pinned, post_id, hasPinned } = this.props;
        const { modalOpen } = this.state;

        return (
            <div className="pin">
                <div onClick={() => {
                    this.unpinWarning(pinned);
                }}>
                    <img className="pin" src={pinIcon} alt="" />

                </div>
                <UnpinModal modalCallBack={this.removeModal} hasPinned={hasPinned}
                    openModal={modalOpen} post_id={post_id}
                    pin_level={pinned} pinMessage={pinMessage} />
            </div>
        )
    }
}
export default Pin;
