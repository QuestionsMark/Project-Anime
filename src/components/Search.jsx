import React from 'react';

import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

const Search = ({handleSearch, value}) => {

    return ( 
        <div className="search scrollNav" data-id="1">
            <div className="search__title"><SearchRoundedIcon className="search__icon"/></div>
            <input type="text" className="search__input" placeholder="Szukaj" value={value} onChange={handleSearch}/>
        </div>
     );
}
 
export default Search;