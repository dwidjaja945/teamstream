import React, { Component } from 'react';

class ErrorModal extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const { errors, openModal, closeModal, onCloseModal } = this.props;
        const modalClass = openModal ? 'modal show-modal' : 'modal';

        function closeCurrentModal() {
            if(typeof closeModal === 'function') {
                closeModal();
            }
            if(typeof onCloseModal === 'function'){
                onCloseModal();
            }
        }

        return(
            <div className={modalClass} onClick={closeCurrentModal}>
                <div className="modal-content">
                    <span className="close-button" onClick= {closeCurrentModal}>&times;</span>
                    <h2 className="modal-header error-header">Error:</h2>
                    <h4 className="modal-body error-body">{errors} </h4>
                    <button className="cancel error-cancel" onClick={closeCurrentModal}>Close</button>
                </div>
            </div>
        )
    }
}
export default ErrorModal;
