import React, { Component } from 'react';
import './screen_loader.css';

class Loader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="loader"></div>
            </div>

        )
    }
}
export default Loader;
