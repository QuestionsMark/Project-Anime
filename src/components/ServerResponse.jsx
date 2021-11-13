import React from 'react';

import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { useResponsePopup } from '../contexts/ResponsePopupProvider';

const ServerResponse = () => {

    const [, setOpen, response] = useResponsePopup();
    const handleClose = () => {
        setOpen(false);
    };

    const { status, message } = response;

    return ( 
        <div className="server" style={{boxShadow: `inset 0 0 20px ${status ? '#5ec45e' : '#d14141'}`}}>
            <CloseRoundedIcon  className="changes__close-icon" onClick={handleClose}/>
            <h2 className="server__title" style={{color: status ? '#5ec45e' : 'red'}}>{status ? 'Sukces!' : 'Wystąpił Błąd!'}</h2>
            <p className="server__message">{message}</p>
        </div>
     );
}
 
export default ServerResponse;