import React from 'react';

import Search from '../Search';
import ProfileTopAnimeList from './ProfileTopAnimeList';

const ProfileTop = ({animeList, handleSearch}) => {
    return ( 
        <div className="profileTop profile__content">
            <Search handleSearch={handleSearch}/>
            <ProfileTopAnimeList anime={animeList}/>
        </div>
     );
}
 
export default ProfileTop;