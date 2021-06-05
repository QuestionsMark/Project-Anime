import React, { useState } from 'react';

import SingleTypeFilter from './SingleTypeFilter';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

const Filter = ({kindFilter, rateMinFilter, rateMaxFilter, handleFilterTypes, handleFilterKind, handleFilterRate}) => {

    const [types, setTypes] = useState([
        {
            id: 1,
            name: "Dramat",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste molestiae architecto dolorum suscipit alias. Tenetur adipisci nulla ipsa nihil, unde porro distinctio minima? Quas magnam accusamus corporis illo est delectus?"
        },
        {
            id: 2,
            name: "Romans",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste molestiae architecto dolorum suscipit alias. Tenetur adipisci nulla ipsa nihil, unde porro distinctio minima? Quas magnam accusamus corporis illo est delectus?"
        },
        {
            id: 3,
            name: "Okruchy Życia",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste molestiae architecto dolorum suscipit alias. Tenetur adipisci nulla ipsa nihil, unde porro distinctio minima? Quas magnam accusamus corporis illo est delectus?"
        },
        {
            id: 4,
            name: "Psychologiczne",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste molestiae architecto dolorum suscipit alias. Tenetur adipisci nulla ipsa nihil, unde porro distinctio minima? Quas magnam accusamus corporis illo est delectus?"
        },
        {
            id: 5,
            name: "Fantasy",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste molestiae architecto dolorum suscipit alias. Tenetur adipisci nulla ipsa nihil, unde porro distinctio minima? Quas magnam accusamus corporis illo est delectus?"
        },
        {
            id: 6,
            name: "Szkolne",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste molestiae architecto dolorum suscipit alias. Tenetur adipisci nulla ipsa nihil, unde porro distinctio minima? Quas magnam accusamus corporis illo est delectus?"
        },
        {
            id: 7,
            name: "Komedia",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste molestiae architecto dolorum suscipit alias. Tenetur adipisci nulla ipsa nihil, unde porro distinctio minima? Quas magnam accusamus corporis illo est delectus?"
        },
    ]);

    

    const typesList = types.map(t => <SingleTypeFilter key={t.id} name={t.name} description={t.description} handleFilterTypes={handleFilterTypes}/>)

    return ( 
        <div className="filter scrollNav" data-id="2">
            <h3 className="filter__title">Filtruj</h3>
            <div className="filter__instruction">
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
            </div>
            <div className="filter__filters">
                <div className="filter__container">
                    <h3 className="filter__filtersTitle">Gatunki</h3>
                    <div className="filter__types">
                        {typesList}
                    </div>
                </div>
                <div className="filter__container">
                    <h3 className="filter__filtersTitle">Rodzaj</h3>
                    <div className="filter__kind">
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Rodzaj</InputLabel>
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
                <div className="filter__container bottom">
                    <h3 className="filter__filtersTitle">Ocena</h3>
                    <div className="filter__rate">
                        <input type="number" className="filter__rateInput rateMin" value={rateMinFilter} placeholder="min" onChange={handleFilterRate}/>
                        <input type="number" className="filter__rateInput rateMax" value={rateMaxFilter} placeholder="max" onChange={handleFilterRate}/>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Filter;