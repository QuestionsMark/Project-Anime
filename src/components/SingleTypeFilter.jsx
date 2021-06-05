import React from 'react';

import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

const SingleTypeFilter = ({name, description, handleFilterTypes}) => {
    return ( 
        <div className="filter__filterElement">
            <p className="filter__name">{name}</p>
            <div className="filter__filter">
                <CheckBoxOutlinedIcon className="filter__filterIcon" data-type="w" data-type-name={name} onClick={handleFilterTypes}/>
                <IndeterminateCheckBoxOutlinedIcon className="filter__filterIcon" data-type="dw" data-type-name={name} onClick={handleFilterTypes}/>
                <CheckBoxOutlineBlankOutlinedIcon className="filter__filterIcon active" data-type="we" data-type-name={name} onClick={handleFilterTypes}/>
            </div>
            <span className="filter__typeDescription">{description}</span>
        </div>
     );
}
 
export default SingleTypeFilter;