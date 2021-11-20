import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import { useUser } from '../contexts/UserProvider';
import { useResponsePopup } from '../contexts/ResponsePopupProvider';

import { Button } from '@material-ui/core';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import { HOST_ADDRESS } from '../config';

const SingleCustomBackground = ({background}) => {

    const { id } = background;

    const [, setOpen,, setResponse] = useResponsePopup();
    const [,,,, user, setUser] = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
    const handleCloseConfirmPopup = () => {
        setOpenConfirmPopup(false);
    };
    const handleOpenConfirmPopup = () => {
        setOpenConfirmPopup(true);
    };

    const handleRemoveCustomBackground = async () => {
        setOpenConfirmPopup(false);
        const response = await fetch(`${HOST_ADDRESS}/profile/custom-background`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            body: JSON.stringify({
                userID: user.id,
                imageID: id,
            }),
        });
        if (response.ok) {
            setResponse({status: response.ok, message: 'Usunięto customowe tło.'});
        } else {
            const error = await response.json();
            setResponse({status: response.ok, message: error.message});
        }
        getUser();
        setOpen(true);
    };

    const handleSave = async () => {
        await fetch(`${HOST_ADDRESS}/profile/background`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                background: id,
            }),
        });
        getUser();
    };

    return ( 
        <>
        <div className="profileEdit__background-image-container">
            <RemoveRoundedIcon className="profileEdit__background-remove-icon" onClick={() => {handleOpenConfirmPopup(id)}}/>
            <img key={id} className={`profileEdit__backgroundImg ${id === user.background ? 'chosedBG' : ''}`} data-id={id} src={`${HOST_ADDRESS}/images/${id}`} alt="asd" onClick={handleSave}/>
        </div>
        <Popup open={openConfirmPopup} modal closeOnDocumentClick onClose={handleCloseConfirmPopup}>
            <div className="profileEdit__confirm-popup">
                <h2 className="profileEdit__confirm-title">Czy na pewno chcesz usunąć tło?</h2>
                <Button className="button profileEdit__btn-confirm" onClick={handleCloseConfirmPopup}>Anuluj</Button>
                <Button className="button profileEdit__btn-confirm" onClick={handleRemoveCustomBackground}>Tak</Button>
            </div>
        </Popup>
        </>
     );
}
 
export default SingleCustomBackground;