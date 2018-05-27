import React from 'react';

export default props => {

    const displayStats = props.statsArray.map( (item, index) => {

        return(
            <div key={index}>
                <span>{item.stat_name} : {item.stat_value}</span>
            </div>
        )
    });

    return(
        <div>
            {displayStats}
        </div>
    )
}