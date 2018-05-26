import React, {Component} from 'react';
import EditProfile from './edit_profile';
import axios from "axios/index";
// import ProfileData from './profile_data';

class EditAthlete extends Component{
    constructor(props){
        super(props);
        this.state = {
            profileData: {}
        };

        this.addAthleteInput= this.addAthleteInput.bind(this);
    }

    addAthleteInput(input, numberOfOriginalStats){
        this.setState({
            profileData: {...this.state.profileData, ...input},
        });

        const numOfStatsToUpdate = input.customStatsArray.length - numberOfOriginalStats;
        if(numOfStatsToUpdate > 0){
            console.log('Adding extra stats')

            const statsToUpdate = input.customStatsArray.slice(numberOfOriginalStats)


            const path='/api/add_athlete_stats';
            axios.post(`${path}`, statsToUpdate).then(response => {
                if (response.data.success) {
                    console.log("data for add-stat response: ", response);


                } else {
                    //ERROR
                    console.log(response.data.errors);
                }
            });
        }
        console.log('updating stat and profile information')
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