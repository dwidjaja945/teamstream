import React, {Component} from 'react';
import EditProfile from './edit_profile';
// import ProfileData from './profile_data';

class EditAthlete extends Component{
    constructor(props){
        super(props);
        this.state = {
            profileData: {}
        };

        this.addAthleteInput= this.addAthleteInput.bind(this);
    }

    addAthleteInput(input){
        this.setState({
            profileData: {...this.state.profileData, ...input},
        });
        //Axios call here for stats and edit

    }
    render(){
        console.log('EditAthlete state: ',this.state);
        return(
            <div>
                <EditProfile addAthlete={this.addAthleteInput}/>
            </div>
        )
    }

}
export default EditAthlete;