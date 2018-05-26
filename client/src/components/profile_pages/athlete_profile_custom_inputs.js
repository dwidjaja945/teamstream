import React, {Component} from 'react';
import Field from './profile_fields';


export default props => {

    function renderCustomInputs(){
        const {customStatsArray} = props;

        const inputs = customStatsArray.map( (item, index) => {
            return(
                <div key={index}>
                    <Field name={item.inputName} type="text"
                           value={item.stat_name} onChange={(e) => {props.inputChange(e, index)}} />
                    <Field name={item.valueName} type="text"
                           value={item.stat_value} onChange={(e) => {props.inputChange(e, index)}} />
                </div>
            )
        });
        return(inputs)
    }
    return renderCustomInputs();
}
