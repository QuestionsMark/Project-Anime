import React, { useEffect, useState } from 'react';

import { useUser } from '../contexts/UserProvider';

import EditCustomBackgrounds from './EditCustomBackgrounds';

import { HOST_ADDRESS } from '../config';

const EditAvatar = () => {

    const [,,,,user, setUser] = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const defaultBackgrounds = ["618809903502a02b5cd4aba2", "6188093e3502a02b5cd4ab9f", "618809443502a02b5cd4aba0", "618809483502a02b5cd4aba1", "618809953502a02b5cd4aba3"];
    const [customBackgrounds, setCustomBackgrounds] = useState([]);

    const defaultBackgroundList = () => {
        return defaultBackgrounds.map(b => {
            if (b === user.background) {
                return <img key={b} className="profileEdit__backgroundImg chosedBG" data-id={b} src={`${HOST_ADDRESS}/images/${b}`} alt="asd" onClick={handleSave}/>;
            } else {
                return <img key={b} className="profileEdit__backgroundImg" data-id={b} src={`${HOST_ADDRESS}/images/${b}`} alt="asd" onClick={handleSave}/>;
            } 
        });
    };

    const customBackgroundList = () => {
        return customBackgrounds.map(b => {
            if (b.id === user.background) {
                return <img key={b.id} className="profileEdit__backgroundImg chosedBG" data-id={b.id} src={`${HOST_ADDRESS}/images/${b.id}`} alt="asd" onClick={handleSave}/>;
            }  else {
                return <img key={b.id} className="profileEdit__backgroundImg" data-id={b.id} src={`${HOST_ADDRESS}/images/${b.id}`} alt="asd" onClick={handleSave}/>;
            }
        });
    };

    const handleSave = async e => {
        e.preventDefault();
        const background = e.target.getAttribute('data-id');
        await fetch(`${HOST_ADDRESS}/profile/background`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                background
            }),
        });
        getUser();
    };

    useEffect(() => {
        if (JSON.stringify(user) !== "{}"){
            const { customBackgrounds } = user;
            setCustomBackgrounds(customBackgrounds);
        }
    }, [user]);

    return ( 
        <div className="profileEdit__section">
            <h2 className="profileEdit__title mediumTitle">Zmień Tło Profilu</h2>
            <div className="profileEdit__changeBackground">
                <h3 className="profileEdit__backgroundsTitle">Tła standardowe:</h3>
                <div className="profileEdit__defaultBackgrounds" data-type="default">
                    {defaultBackgroundList()}
                </div>
                <h3 className="profileEdit__backgroundsTitle">Tła Własne (max 3):</h3>
                <div className="profileEdit__customBackgrounds" data-type="custom">
                    {customBackgroundList()}
                </div>
                <EditCustomBackgrounds />
            </div>
        </div>
     );
}
 
export default EditAvatar;