import React, { useEffect, useState } from 'react';

import CustomBackgrounds from './CustomBackgrounds';
import SingleCustomBackground from '../SingleCustomBackground';
import SingleDefaultBackground from '../SingleDefaultBackground';

import { useUser } from '../../../contexts/UserProvider';

const EditAvatar = () => {

    const { user } = useUser();
    
    const defaultBackgrounds = ["618809903502a02b5cd4aba2", "6188093e3502a02b5cd4ab9f", "618809443502a02b5cd4aba0", "618809483502a02b5cd4aba1", "618809953502a02b5cd4aba3"];
    const [customBackgrounds, setCustomBackgrounds] = useState([]);

    const defaultBackgroundList = () => {
        return defaultBackgrounds.map(b => <SingleDefaultBackground key={b} b={b}/>);
    };

    const customBackgroundList = () => {
        return customBackgrounds.map(b => <SingleCustomBackground key={b.id} background={b}/>);
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
                <CustomBackgrounds />
            </div>
        </div>
     );
}
 
export default EditAvatar;