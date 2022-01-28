import React from 'react';

import { FormControl, RadioGroup, Radio, FormLabel, FormControlLabel } from '@material-ui/core';

const Kind = ({ kind, handleInfChange }) => {
    return ( 
        <div className="create__kind create__section">
            <FormControl component="fieldset">
                <FormLabel component="legend" className="create__title">Typ anime</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={kind} onChange={(e) => {handleInfChange("kind", e)}}>
                    <FormControlLabel value="series" control={<Radio />} label="Seria odcinków" className="create__radioLabel"/>
                    <FormControlLabel value="movie" control={<Radio />} label="Film" className="create__radioLabel"/>
                </RadioGroup>
            </FormControl>
        </div>
     );
}
 
export default Kind;