import React from 'react';

import { useData } from '../contexts/DataProvider';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

import SingleTypeFilter from './SingleTypeFilter';

const Filter = ({kindFilter, rateMinFilter, rateMaxFilter, handleFilterTypes, handleFilterKind, handleFilterRate}) => {

    const { types } = useData();

    const typesList = () => {
        return types
            .sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            })
            .map(t => <SingleTypeFilter key={t.id} name={t.name} description={t.description} handleFilterTypes={handleFilterTypes}/>);
    };

    return ( 
        <div className="filter scrollNav" data-id="2">
            <h3 className="filter__title">Filtry</h3>
            {/* <div className="filter__instruction">
                <h4 className="filter__legendTitle">Legenda</h4>
                <div className="filter__want">
                    <CheckBoxOutlinedIcon className="filter__instructionIcon" />
                    <p className="filter__instructionText">Chcę</p>
                </div>
                <div className="filter__dontWant">
                    <IndeterminateCheckBoxOutlinedIcon className="filter__instructionIcon" />
                    <p className="filter__instructionText">Nie chcę</p>
                </div>
                <div className="filter__indifferent">
                    <CheckBoxOutlineBlankOutlinedIcon className="filter__instructionIcon" />
                    <p className="filter__instructionText">Obojętne</p>
                </div>
            </div> */}
            
            <div className="filter__filters">
                <div className="filter__others">
                    <div className="filter__container filter__container--part">
                        <h3 className="filter__filtersTitle filter__filtersTitle--center">Rodzaj</h3>
                        <div className="filter__kind">
                            <FormControl>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={kindFilter}
                                onChange={handleFilterKind}
                                >
                                    <MenuItem value="series">Seria odcinków</MenuItem>
                                    <MenuItem value="movies">Film</MenuItem>
                                    <MenuItem value="all">Wszystko</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="filter__container filter__container--part">
                        <h3 className="filter__filtersTitle filter__filtersTitle--center">Ocena</h3>
                        <div className="filter__rate">
                            <input type="number" className="filter__rateInput rateMin" value={rateMinFilter} placeholder="min" onChange={handleFilterRate}/>
                            <input type="number" className="filter__rateInput rateMax" value={rateMaxFilter} placeholder="max" onChange={handleFilterRate}/>
                        </div>
                    </div>
                    <div className="filter__container filter__container--part">
                        <h3 className="filter__filtersTitle filter__filtersTitle--center">Legenda</h3>
                        <div className="filter__want">
                            <CheckBoxOutlinedIcon className="filter__instructionIcon" />
                            <p className="filter__instructionText">Chcę</p>
                        </div>
                        <div className="filter__dontWant">
                            <IndeterminateCheckBoxOutlinedIcon className="filter__instructionIcon" />
                            <p className="filter__instructionText">Nie chcę</p>
                        </div>
                        <div className="filter__indifferent">
                            <CheckBoxOutlineBlankOutlinedIcon className="filter__instructionIcon" />
                            <p className="filter__instructionText">Obojętne</p>
                        </div>
                    </div>
                </div>
                <div className="filter__container">
                    <h3 className="filter__filtersTitle">Gatunki</h3>
                    <div className="filter__types">
                        {typesList()}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Filter;