import React, {Component} from 'react';

class AddNewInput extends Component{
    constructor(props){
        super(props);

    }
    render(){
        console.log("this is the props: ", this.props);
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
}
export default AddNewInput;