import React, { Component } from "react";
import { Link } from "react-router-dom";
import Field from "./profile_fields";
import AddNewInputs from "./add_new_input";
import "../styles.css";
import axios from "axios/index";

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            age: '',
            bio:'',
            img_url:'',
            height: '',
            weight: '',
            customStatsArray: [],
        };

        this.initialNumberOfStats=null;
        this.pullAthleteProfileData();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addNewInput=this.addNewInput.bind(this);
    }

				this.setState({
					first_name: response.data.user[0].first_name,
					last_name: response.data.user[0].last_name,
					age: response.data.user[0].age,
					bio: response.data.user[0].bio,
					img_url: response.data.user[0].img_url,
					height: response.data.user[0].height,
					weight: response.data.user[0].weight
					// stats: {},
				});
			} else {
				//ERROR
				console.log(response.data.errors);
			}
		});
	}
	addNewInput(event) {
		event.preventDefault();

                const users = response.data.user;
                const userStatsArray=[];
                for(let userIndex=0; userIndex<users.length; userIndex++){
                    const {stat_id, stat_name, stat_value} = users[userIndex];
                    userStatsArray.push({stat_id, stat_name, stat_value});
                }

                this.setState({
                    first_name: response.data.user[0].first_name,
                    last_name: response.data.user[0].last_name,
                    age: response.data.user[0].age,
                    bio: response.data.user[0].bio,
                    img_url: response.data.user[0].img_url,
                    height: response.data.user[0].height,
                    weight: response.data.user[0].weight,
                    customStatsArray: userStatsArray,
                });

                this.initialNumberOfStats = response.data.user.length;
            } else {
                //ERROR
                console.log(response.data.errors);
                this.props.history.push(response.data.redirect);
            }
        });
    }
    addNewInput(event) {
        event.preventDefault();

        const newCustomInput={
            inputName:'inputName',
            stat_name:'',
            valueName:'valueName',
            stat_value:'',
        };

        this.setState({customStatsArray: [...this.state.customStatsArray, newCustomInput]});
    }

	handleSubmit(event) {
		event.preventDefault();
		console.log("This is the handleSubmit: ", this.state);
		this.props.addAthlete(this.state);
	}

	render() {
		const { first_name, last_name, age, height, bio, img_url, weight, customInputsArray } = this.state;

    addAthleteInput(){
        let redirect = '/athlete_profile';
        const {customStatsArray} = this.state;
        const numOfStatsToUpdate = customStatsArray.length - this.initialNumberOfStats;

        console.log('updating stat and profile information')
        //Axios call here for edited info and stats


        let statsToUpdate = [];
        //axios call for new stats
        if(numOfStatsToUpdate > 0){
            console.log('Adding extra stats')
            statsToUpdate = customStatsArray.slice(this.initialNumberOfStats);

            const path='/api/add_athlete_stats';
            axios.post(`${path}`, statsToUpdate).then(response => {
                console.log('adding new stats response: ', response)
                if (response.data.success) {
                    console.log("data for add-stat response: ", response);
                    const {insertStart, rowsAffected} = response.data.insertIds;
                    let count=0;
                    for (let countIndex=insertStart; countIndex<rowsAffected+insertStart; countIndex++){
                        statsToUpdate[count++].stat_id = countIndex;
                    }
                    redirect = response.data.redirect;
                } else {
                    //ERROR
                    console.log(response.data.errors);
                }
            });
        }


        this.setState({
            customStatsArray: [...this.state.customStatsArray, ...statsToUpdate],
        });
        this.props.history.push(redirect);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('This is the handleSubmit: ', this.state);

        this.addAthleteInput();
    }

    render() {
        const { first_name, last_name, age, height, bio, img_url, weight, customStatsArray } = this.state;
        console.log("edit profile current state: ", this.state)
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h1>This is where user creates their profile</h1>
                    <Field name="firstName" label="First Name" type="text" value={first_name} onChange={this.handleInputChange} />
                    <Field name="lastName" label="Last Name" type="text" value={last_name} onChange={this.handleInputChange} />
                    <Field name="age" label="Age" type="number" value={age} onChange={this.handleInputChange} />
                    <Field name="height" label="Height" type="text" value={height} onChange={this.handleInputChange} />
                    <Field name="weight" label="Weight" type="number" value={weight} onChange={this.handleInputChange} />
                    <Field name="bio" label="Bio" type="text" value={bio} onChange={this.handleInputChange} />
                    {/* <button onClick={this.addNewInput.bind(this)}>Add</button> */}
                    <AddNewInputs addNewInput={this.addNewInput} customStatsArray={customStatsArray}/>
                    {/* <Field name="statInput" type="text" value={statInput} onChange={this.handleInputChange} />
                    <Field name="statValue" type="text" value={statValue} onChange={this.handleInputChange} /> */}
                    <Link to={`/athlete_profile`} className="loginButtons">
                        <span className="btnLog">Confirm Changes</span>
                    </Link>
                </div>
                <button className="btnLog">Submit</button>
            </form>
            </div>
        )
    }
}
export default EditProfile;
