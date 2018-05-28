import React, {Component} from 'react';
import EditProfile from './edit_profile';
import axios from "axios/index";
// import ProfileData from './profile_data';

//################################
// DEPRECIATED PAGE. DO NOT USE
//#################################
class EditAthlete extends Component{
    constructor(props){
        super(props);
        this.state = {
            profileData: {}
        };

        this.addAthleteInput= this.addAthleteInput.bind(this);
    }

    // submitAthleteInput(input, numberOfOriginalStats){
    //
    //     const numOfStatsToUpdate = input.customStatsArray.length - numberOfOriginalStats;
    //
    //     console.log('updating stat and profile information')
    //     //Axios call here for edited info and stats
    //
    //
    //     //axios call for new stats
    //     if(numOfStatsToUpdate > 0){
    //         console.log('Adding extra stats')
    //         const {customStatsArray} = input
    //         const statsToUpdate = customStatsArray.slice(numberOfOriginalStats)
    //
    //         const path='/api/add_athlete_stats';
    //         axios.post(`${path}`, statsToUpdate).then(response => {
    //             console.log('adding new stats response: ', response)
    //             if (response.data.success) {
    //                 console.log("data for add-stat response: ", response);
    //                 const {insertStart, rowsAffected} = response.data.insertIds;
    //                 let count=0;
    //                 for (let countIndex=insertStart; countIndex<rowsAffected+insertStart; countIndex++){
    //                     customStatsArray[numberOfOriginalStats + count++].stat_id = countIndex;
    //                 }
    //                 input.customStatsArray= customStatsArray;
    //             } else {
    //                 //ERROR
    //                 console.log(response.data.errors);
    //             }
    //         });
    //     }
    //
    //
    //     this.setState({
    //         profileData: {...this.state.profileData, ...input},
    //     });
    // }
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