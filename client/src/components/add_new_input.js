import React, {Component} from 'react';
import Field from './profile_fields';

class AddNewInput extends Component{
    constructor(props){
        super(props);

        this.addNewInput = this.addNewInput.bind(this);
    }
    addNewInput(event) {
        event.preventDefault();
        console.log("add button was clicked");
        const { customInput } = this.state;
        customInput.push({ name: 'stat' + customInput.length + 1, value: '' })
        customInput.push({ name: 'value' + customInput.length + 1, value: '' })

        const newCustomInputArr = customInput.map((item, index) => {
            return (
                <Field name={customInput[index].name} type="text" value={customInput[index].value} onChange={this.handleInputChange} />
            )

        })
        return newCustomInputArr;

    }
    render(){
        return(
        <button onClick={this.addNewInput}>+</button>
        )
    }
}
export default AddNewInput;