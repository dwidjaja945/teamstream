import React, {Component} from 'react';
import CustomInputs from './athlete_profile_custom_inputs';

class AddNewInput extends Component{
    constructor(props){
        super(props);

        // this.state={
        //     customInputsArray:[],
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
    //     const {customInputsArray} = this.state;
    //
    //     customInputsArray.push(newCustomInput);
    //
    //     this.setState({customInputsArray});
    // }

    handleInputChange(event, index) {
        const { value, name } = event.target;
        const {customInputsArray} = this.props;

        if(name==='inputName') {
            customInputsArray[index]['nameValue'] = value;
        }else if(name==='valueName'){
            customInputsArray[index]['inputValue'] = value;
        }

        this.setState({
            customInputsArray
        });
    }
    render(){
        const {customInputsArray} = this.props;

        return(
            <div>
                <button type='button' onClick={this.props.addNewInput}>+</button>
                <CustomInputs inputChange={this.handleInputChange} customInputsArray={customInputsArray}/>
            </div>
        )
    }
}
export default AddNewInput;