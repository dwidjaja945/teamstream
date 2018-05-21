import React, {Component} from 'react';
import CreateProfile from './create_profile';
// import ProfileData from './profile_data';

class AddAthlete extends Component{
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
    }
    render(){
        console.log('add_Athlete state: ',this.state);
        return(
            <div>
                <CreateProfile addAthlete={this.addAthleteInput}/>
            </div>
        )
    }

}
export default AddAthlete;