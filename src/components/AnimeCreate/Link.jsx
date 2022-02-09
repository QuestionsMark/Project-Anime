import React from 'react';

const Link = ({ link, handleInfChange }) => {
    return ( 
        <div className="create__link create__section">
            <h3 className="create__title">Link</h3>
            <input type="text" className="create__linkInp create__inputText" placeholder="Link do oglądania" value={link} onChange={(e) => {handleInfChange("link", e)}}/>
        </div>
     );
}
 
export default Link;