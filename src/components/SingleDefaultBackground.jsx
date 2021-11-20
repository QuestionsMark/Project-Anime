import React from 'react';

import { useUser } from '../contexts/UserProvider';

import { HOST_ADDRESS } from '../config';

const SingleDefaultBackground = ({b}) => {

    const [,,,, user, setUser] = useUser();
    const getUser = async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${user.id}`);
        if (response.ok) {
            const user = await response.json();
            setUser(user);
        }
    };

    const handleSave = async () => {
        await fetch(`${HOST_ADDRESS}/profile/background`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                id: user.id,
                background: b
            }),
        });
        getUser();
    };

    return ( 
        <div className="profileEdit__background-image-container">
            <img key={b} className={`profileEdit__backgroundImg ${b === user.background ? 'chosedBG' : ''}`} data-id={b} src={`${HOST_ADDRESS}/images/${b}`} alt="asd" onClick={handleSave}/>
        </div>
     );
}
 
export default SingleDefaultBackground;