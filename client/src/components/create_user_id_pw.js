import React, {Component} from "react";
import Field from "./field_inputs";
import backArrow from "./images/blue-chevron-left.png";
import Navbar from "./navbar";
import teamStream from "./images/asset_4_3x.png";
import "./styles.css";
import axios from "axios/index";
import ErrorModal from './error_modal';

class UserIdPw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            passwordCheck: "",
            errors:'',
            onCloseModal:null,
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
        if (this.checkPassword() && this.checkEmail()) {
            const { email, password } = this.state;
            const dataToSend = { email, password };
            let path = "/api/signup";

            axios.post(`${path}`, dataToSend).then(response => {
                //here is where we redirect
                if (response.data.success) {
                    this.props.history.push(response.data.redirect);
                } else {
                    if(response.data.errors === 'User already exists') {
                        const stateToSend = {
                            email: this.state.email,
                        };
                        this.setState({
                            errors: `User already exists, please log-in`,
                            onCloseModal: () => {
                                this.redirect(response.data.redirect, stateToSend)
                            }
                        })
                    }
                }
            });
        }
    }
    redirect(url, stateToSend){
        this.props.history.push(url, stateToSend)
    }

    checkPassword() {
        const { password, passwordCheck } = this.state;
        //Must be between 6 and 32 characters long
        //Must have at least one capital letter
        //Must have at least one lower -case letter
        //Must have at least one number
        //Must start with a letter(lower -case or upper -case)
        //Must have at least one special character
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])([a-z]+|[A-Z]+)(?=.*\d)[a-zA-Z\d](?=.*?[#?!@$%^&*-]).{6,32}$/;

        if (password === passwordCheck) {
            if(passwordValidation.test(password)) {
                return true;
            }else{
                console.log('here')
                this.setState({
                    password: "",
                    passwordCheck: "",
                    errors: `Password is incorrect: 
					Must be between 6 and 32 characters long 
					Must have at least one capital letter 
					Must have at least one lower -case letter 
					Must have at least one number 
					Must start with a letter(lower -case or upper -case) 
					Must have at least one special character`,
                })
                return false;
            }
        } else {
            this.setState({
                password: "",
                passwordCheck: "",
                errors: `Passwords do not match, please try again`,
            });
            return false;
        }
    }

    checkEmail() {
        const { email } = this.state;

        const emailValidification = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (emailValidification.test(email)) {
            // console.log("email validated!");
            return true;
        } else {
            this.setState({
                email:'',
                password: "",
                passwordCheck: "",
                errors: `Invalid Email, please try again`,
            });
            return false;
        }
    }

    reset() {
        this.setState({
            email: "",
            password: "",
            passwordCheck: "",
            errors: '',
        });
    }
    closeModal(){
        this.setState({
            errors:'',
        })
    }

    render() {
        const { email, password, passwordCheck, errors, onCloseModal } = this.state;
        let openModal = false;
        if(errors){
            openModal=true;
        }
        return (
            <div className="createCredentialsContainer">
                <ErrorModal onCloseModal={onCloseModal} errors={errors} openModal={openModal} closeModal={this.closeModal.bind(this)}/>
                <Navbar icon={backArrow} hamburgerMenu={false} url="/" />
                <div className="createLogo">
                    <img className="createLogoImg" src={teamStream} />
                </div>
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
                        type="password"
                        value={password}
                        onChange={this.handleInputChange}
                    />
                    <Field
                        className="signUpInput"
                        name="passwordCheck"
                        label="Re-Enter Password:"
                        type="password"
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
