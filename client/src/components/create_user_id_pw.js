import React, { Component } from "react";
import { Link } from "react-router-dom";
import Field from "./field_inputs";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import hamburgerMenu from "./hamburger_menu";
import teamStream from "./images/tsLogo.png";
import "./styles.css";
import axios from "axios/index";

class UserIdPw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordCheck:"",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("this handleSubmit: ", this.state);

        if(this.checkPassword()){
            axios.post(`${path}`, dataToSend).then(response => {
                //here is where we redirect
                if (response.data.success) {
                    console.log("data from server response: ", response);
                    console.log("current props at this time: ", this.props);

                    //if success, log them in then take them to bulletin board
                    // this.props.history.push(response.data.redirect);
                    // this.props.history.push('/add_athlete');

                } else {
                    //ERROR
                    console.log(response.data.errors);
                }
            });
        }

        this.reset();
    }
    checkPassword(){
        const {password, passwordCheck} = this.state;
        if(password === passwordCheck){
            console.log('passwords match')
            return true;
        }else{
            //throw error about passwords
            return false;
        }
    }

    reset() {
        this.setState({
            email: "",
            password: "",
            passwordCheck: "",
        });
    }

    render() {
        const { email, password, passwordCheck } = this.state;

        return (
            <div className="createCredentialsContainer">
                <Navbar icon={backArrow} hamburgerMenu={false} url="/" />
                <img className="createLogo" src={teamStream} />
                <form className="userSignUpContainer" onSubmit={this.handleSubmit}>
                    <Field
                        className="signUpInput"
                        name="email"
                        label="Email:"
                        type="email"
                        value={email}
                        onChange={this.handleInputChange}
                    />
                    <Field
                        className="signUpInput"
                        name="password"
                        label="Password:"
                        type="text"
                        value={password}
                        onChange={this.handleInputChange}
                    />
                    <Field
                        className="signUpInput"
                        name="passwordCheck"
                        label="Re-Enter Password:"
                        type="text"
                        value={passwordCheck}
                        onChange={this.handleInputChange}
                    />
                    <button className="signUpButton">Submit</button>
                </form>
            </div>
        );
    }
}

export default UserIdPw;
