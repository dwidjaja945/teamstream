import React, { Component } from "react";
import Field from "./profile_fields";

export default props => {
	function renderCustomInputs() {
		const { customStatsArray } = props;

    function renderCustomInputs(){
        const {customStatsArray} = props;

        const inputs = customStatsArray.map( (item, index) => {
            if(item.stat_name==='null'){
                item.stat_name='';
            }
            if(item.stat_value==='null'){
                item.stat_value='';
            }
            return(
                <div key={index} className="customAthInputs">
                    <Field name={'inputName'} type="text"
                           value={item.stat_name} onChange={(e) => {props.inputChange(e, index)}} />
                    <Field name={'valueName'} type="text"
                           value={item.stat_value} onChange={(e) => {props.inputChange(e, index)}} />
                </div>
            )
        });
        return(inputs)
    }
    return renderCustomInputs();
}

