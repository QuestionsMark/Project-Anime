import React from 'react';
import Popup from 'reactjs-popup';

import NotificationImportantRoundedIcon from '@material-ui/icons/NotificationImportantRounded';

const Notification = () => {
    return ( 
        <Popup className="normal-popup" trigger={<div className="news__notification">
            <NotificationImportantRoundedIcon className="news__notification-icon"/>
        </div>} on="hover" position="top center">
            Mamy Nowego Niuuusa!
        </Popup>
     );
}
 
export default Notification;