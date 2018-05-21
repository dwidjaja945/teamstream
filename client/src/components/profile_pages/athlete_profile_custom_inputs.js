import React, {Component} from 'react';
import Field from './profile_fields';


export default props => {

    function renderCustomInputs(){
        const {customInputsArray} = props;

        const inputs = customInputsArray.map( (item, index) => {
            return(
                <div key={index}>
                    <Field name={item.inputName} type="text"
                           value={item.nameValue} onChange={(e) => {props.inputChange(e, index)}} />
                    <Field name={item.valueName} type="text"
                           value={item.inputValue} onChange={(e) => {props.inputChange(e, index)}} />
                </div>
            )
        });
        return(inputs)
    }
    return renderCustomInputs();
}
