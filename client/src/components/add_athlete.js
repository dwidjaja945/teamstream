import React, {Component} from 'react';
import CreateProfile from './create_profile';
import ProfileData from './profile_data';

class AddAthlete extends Component{
    constructor(props){
        super(props);
        this.state = {
            profileData: ProfileData
        }

        this.addAthleteInput= this.addAthleteInput.bind(this);
    }

    addAthleteInput(input){
        console.log("Input to add to array : ",input);
        console.log("current profile data: ", this.state.profileData);
        debugger;
        this.setState({
            profileData: [input, ...this.state.profileData]
        });
        console.log('updated profile data: ', this.state.profileData);

    }
    render(){
        return(
            <div>
                <CreateProfile addAthlete={this.addAthleteInput}/>
            </div>
        )
    }

}
export default AddAthlete;