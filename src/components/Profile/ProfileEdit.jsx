import React from 'react';
import { withRouter } from 'react-router-dom';

import EditAvatar from './ProfileEdit/Avatar';
import EditUsername from './ProfileEdit/Username';
import EditIntroduction from './ProfileEdit/Introduction';
import EditBackground from './ProfileEdit/Background';
import EditFavoriteType from './ProfileEdit/FavoriteType';

const ProfileEdit = () => {
    return ( 
        <div className="profileEdit profile__content">
            <EditAvatar />
            <EditUsername />
            <EditIntroduction />
            <EditFavoriteType />
            <EditBackground />
        </div>
     );
}
 
export default withRouter(ProfileEdit);