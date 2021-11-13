import React from 'react';
import { withRouter } from 'react-router-dom';

import EditAvatar from './EditAvatar';
import EditUsername from './EditUsername';
import EditIntroduction from './EditIntroduction';
import EditFavoriteAnime from './EditFavoriteAnime';
import EditBackground from './EditBackground';

import EditFavoriteType from './EditFavoriteType';

const ProfileEdit = () => {
    return ( 
        <div className="profileEdit profile__content">
            <EditAvatar />
            <EditUsername />
            <EditIntroduction />
            <EditFavoriteAnime />
            <EditFavoriteType />
            <EditBackground />
        </div>
     );
}
 
export default withRouter(ProfileEdit);