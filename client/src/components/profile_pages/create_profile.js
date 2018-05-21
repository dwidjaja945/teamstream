import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Field from './profile_fields';
import ProfileData from './profile_data';
import AddNewInputs from './add_new_input';
import "../styles.css";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: '',
            height: '',
            weight: '',
            statInput: '',
            statValue: '',
            customInput: []

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
    // handleCustomInputChange(){
    //     const { statInput, statValue, customInput } = this.state;
    //     customInput.push({ name: statInput, value: statValue });
    //     this.setState({
    //         customInput: customInput
    //     });
    // }

    handleSubmit(event) {
        event.preventDefault();
        console.log('This is the handleSubmit: ', this.state);
        this.props.addAthlete(this.state);
    }

    addNewInput() {
        const { customInput } = this.state;
        customInput.push({ name: 'stat' + customInput.length + 1, value: '' })
        customInput.push({ name: 'value' + customInput.length + 1, value: '' })

        const newCustomInputArr = customInput.map((item, index) => {
            return (
                <Field name={customInput[index].name} type="text" value={customInput[index].value} onChange={this.handleInputChange} />
            )

        })
        return newCustomInputArr;

    }
    // mapThroughValues(customInputArr) {
    //     if (customInputArr.length > 0) {
    //         customInputArr.map((item, index) => {
    //             return (
    //                 <Field onChange={this.handleInputChange} name={item.name} value={item.value} key={index} />
    //             )
    //         })
    //     }
    // }



    render() {
        const { firstName, lastName, age, height, weight, customInput } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h1>This is where user creates their profile</h1>
                    <Field name="firstName" label="First Name" type="text" value={firstName} onChange={this.handleInputChange} />
                    <Field name="lastName" label="Last Name" type="text" value={lastName} onChange={this.handleInputChange} />
                    <Field name="age" label="Age" type="number" value={age} onChange={this.handleInputChange} />
                    <Field name="height" label="Height" type="text" value={height} onChange={this.handleInputChange} />
                    <Field name="weight" label="Weight" type="number" value={weight} onChange={this.handleInputChange} />
                    {/* <button onClick={this.addNewInput.bind(this)}>Add</button> */}
                    <AddNewInputs customData={customInput}/>
                    {/* <Field name="statInput" type="text" value={statInput} onChange={this.handleInputChange} />
                    <Field name="statValue" type="text" value={statValue} onChange={this.handleInputChange} /> */}
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