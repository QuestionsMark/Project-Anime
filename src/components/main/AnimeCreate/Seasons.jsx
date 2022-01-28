import React from 'react';

import Search from '../../Search';

import { FormControl, RadioGroup, FormLabel, Checkbox, FormControlLabel } from '@material-ui/core';

import Loading from '../../Loading';

import { DefaultArray } from '../../../utils/CustomClasses';

const Seasons = ({ anime, seasons, searchPhrase, handleSearch, isChecked, handleSeasonsChange }) => {

    const labelAnimeList =  () => {
        return anime
            .filter(a => a.title.toLowerCase().includes(searchPhrase.toLowerCase()))
            .sort((a, b) => {
                if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                return 0;
            })
            .map(a => <FormControlLabel key={a.id} checked={isChecked('season', a.id)} value={a.id} control={<Checkbox/>} label={a.title} onChange={handleSeasonsChange}/>);
    };

    return ( 
        <div className="create__seasons create__section">
            <Search handleSearch={handleSearch}/>
            {anime instanceof DefaultArray ? <Loading /> : <FormControl component="fieldset">
                <FormLabel component="legend" className="create__title">*Powiązane Anime</FormLabel>
                <RadioGroup value={seasons}>
                    {labelAnimeList()}
                </RadioGroup>
            </FormControl>}
        </div>
     );
}
 
export default Seasons;