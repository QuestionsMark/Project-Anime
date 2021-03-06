import React, { useEffect, useRef, useState } from 'react';

import { FormControl, Select, MenuItem } from '@material-ui/core';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

import SingleTypeFilter from './SingleTypeFilter';
import { HOST_ADDRESS } from '../config';

const Filter = ({kindFilter, rateMinFilter, rateMaxFilter, sortFilter, handleFilterTypes, handleFilterKind, handleFilterRate, handleFilterSort}) => {

    const componentRef = useRef();

    const [types, setTypes] = useState([]);
    const getTypes = async () => {
        const response = await fetch(`${HOST_ADDRESS}/types`);
        if (response.ok) {
            const types = await response.json();
            if (!componentRef.current) return;
            setTypes(types);
        }
    };

    const typesList = () => {
        return types
            .sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            })
            .map(t => <SingleTypeFilter key={t.id} name={t.name} description={t.description} handleFilterTypes={handleFilterTypes}/>);
    };

    useEffect(() => {
        getTypes();
    }, []);

    return ( 
        <div className="filter scrollNav" ref={componentRef} data-id="2">
            <h3 className="filter__title">Filtry</h3>
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
                                    <MenuItem value="all">Wszystko</MenuItem>
                                    <MenuItem value="series">Seria odcink??w</MenuItem>
                                    <MenuItem value="movies">Film</MenuItem>
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
                        <h3 className="filter__filtersTitle filter__filtersTitle--center">Sortowanie</h3>
                        <div className="filter__kind">
                            <FormControl>
                                <Select
                                value={sortFilter}
                                onChange={handleFilterSort}
                                >
                                    <MenuItem value="best">Najlepsze</MenuItem>
                                    <MenuItem value="worst">Najgorsze</MenuItem>
                                    <MenuItem value="new">Najnowsze</MenuItem>
                                    <MenuItem value="old">Najstarsze</MenuItem>
                                    <MenuItem value="alphabetically">Alfabetycznie</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="filter__container">
                    <h3 className="filter__filtersTitle">Gatunki 
                        <div className="filter__legend-item">
                            <CheckBoxOutlinedIcon className="filter__instructionIcon" />
                            <p className="filter__instructionText">Chc??</p>
                        </div>
                        <div className="filter__legend-item">
                            <IndeterminateCheckBoxOutlinedIcon className="filter__instructionIcon" />
                            <p className="filter__instructionText">Nie chc??</p>
                        </div>
                        <div className="filter__legend-item">
                            <CheckBoxOutlineBlankOutlinedIcon className="filter__instructionIcon" />
                            <p className="filter__instructionText">Oboj??tne</p>
                        </div>
                    </h3>
                    <div className="filter__types">
                        {typesList()}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Filter;