import React from 'react';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const Search = ({handleSearch}) => {

    return ( 
        <div className="search scrollNav" data-id="1">
            <div className="search__title"><SearchRoundedIcon className="search__icon"/></div>
            <input type="text" className="search__input" placeholder="Szukaj" onChange={handleSearch}/>
        </div>
     );
}
 
export default Search;