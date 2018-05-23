import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Field from './profile_fields';
import "../styles.css";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            age: '',
            height: '',
            weight: '',

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const { value, name } = event.target;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addAthlete(this.state);
    }

    render() {
        const { firstName, lastName, age, height, weight} = this.state;
        const numbers = /[0-9]/g

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h1>This is where user creates their profile</h1>
                    <Field name="firstName" label="First Name" type="text" value={firstName} onChange={this.handleInputChange} />
                    <Field name="lastName" label="Last Name" type="text" value={lastName} onChange={this.handleInputChange} />
                    <Field name="age" label="Age" type={numbers} value={age} onChange={this.handleInputChange} />
                    <Field name="height" label="Height" type="text" value={height} onChange={this.handleInputChange} />
                    <Field name="weight" label="Weight" type={numbers} value={weight} onChange={this.handleInputChange} />
                    <Link to={`/athlete_profile`} className="loginButtons">
                        <span className="btnLog">Create Profile</span>
                    </Link>
                </div>
                <button className="btnLog">Submit</button>
            </form>
        )
    }
}
export default CreateProfile;