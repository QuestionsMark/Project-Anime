import React from 'react';

import { FormControl, RadioGroup, FormLabel, Checkbox, FormControlLabel } from '@material-ui/core';
import { DefaultArray } from '../../../utils/CustomClasses';
import Loading from '../../Loading';

const Types = ({ types, isChecked, handleTypesChange }) => {

    const labelTypesList = () => {
        return types
            .sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            })
            .map(t => <FormControlLabel key={t.id} checked={isChecked('type', t.name)} value={t.name} control={<Checkbox />} label={t.name} onChange={handleTypesChange}/>);
    };

    return ( 
        <div className="create__types create__section">
            {types instanceof DefaultArray ? <Loading /> : <FormControl component="fieldset">
                <FormLabel component="legend" className="create__title">Gatunki</FormLabel>
                <RadioGroup value={types}>
                    {labelTypesList()}
                </RadioGroup>
            </FormControl>}
        </div>
     );
}
 
export default Types;