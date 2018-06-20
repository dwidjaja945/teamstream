import React, { Component } from 'react';

class UnpinModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { post_id, pin_level, pinMessage, openModal, modalCallBack, hasPinned } = this.props;
        const modalClass = this.props.openModal ? 'modal show-modal' : 'modal';

        return (
            <div className={modalClass}>
                <div className="modal-content">
                    <span className="close-button" onClick={() => {
                        modalCallBack();

                    }}>&times;</span>
                    <h2 className="modal-header">Warning:</h2>
                    <h4 className="modal-body">Are you sure you want to unpin the current pinned post? </h4>
                    <button className="confirm" onClick={() => {
                        pinMessage(post_id, pin_level);
                        modalCallBack();
                    }}
                    >Confirm</button>
                    <button className="cancel" onClick={() => {
                        modalCallBack();
                    }}>Cancel</button>
                </div>
            </div>
        )
    }
}
export default UnpinModal;
