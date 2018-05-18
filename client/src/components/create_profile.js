import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Field from './profile_fields';
import ProfileData from './profile_data';
import "./styles.css";


class CreateProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            height: '',
            weight: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){

        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }        

    handleSubmit(event){
        event.preventDefault();
        console.log('This is the handleSubmit: ', this.state);
        this.props.addAthlete(this.state);
    }

    

    render(){
        const {firstName, lastName, age, height, weight} = this.state;

        return(
            <form onSubmit={this.handleSubmit}>
            <div>
                <h1>This is where user creates their profile</h1>
                <Field name="firstName" label="First Name" type="text" value={firstName} onChange={this.handleInputChange}/>
                <Field name="lastName" label="Last Name" type="text" value={lastName} onChange={this.handleInputChange}/>
                <Field name="age" label="age" type="text" value={age} onChange={this.handleInputChange}/>
                <Field name="height" label="Height" type="text" value={height} onChange={this.handleInputChange}/>
                <Field name="weight" label="Weight" type="text" value={weight} onChange={this.handleInputChange}/>
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