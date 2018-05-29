import React, { Component } from "react";
import CustomInputs from "./athlete_profile_custom_inputs";

class AddNewInput extends Component {
	constructor(props) {
		super(props);
		// this.state={
		//     customStatsArray:this.props.customStatsArray,
		// };

		// this.addNewInput = this.addNewInput.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	// addNewInput(event) {
	//     event.preventDefault();
	//
	//     const newCustomInput={
	//         inputName:'inputName',
	//         nameValue:'',
	//         valueName:'valueName',
	//         inputValue:'',
	//     };
	//
	//     const {customStatsArray} = this.state;
	//
	//     customStatsArray.push(newCustomInput);
	//
	//     this.setState({customStatsArray});
	// }

	handleInputChange(event, index) {
		const { value, name } = event.target;
		const { customStatsArray } = this.props;

		if (name === "inputName") {
			customStatsArray[index]["stat_name"] = value;
		} else if (name === "valueName") {
			customStatsArray[index]["stat_value"] = value;
		}


        this.setState({
            customStatsArray
        });
    }
    render(){
        const {customStatsArray} = this.props;
        return(
            <div>
                <CustomInputs addNewInput={this.props.addNewInput} inputChange={this.handleInputChange} customStatsArray={customStatsArray}/>
            </div>
        )
    }

}
export default AddNewInput;
