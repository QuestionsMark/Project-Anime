import React from 'react';

const Title = ({ title, handleChangeTitle }) => {
    return ( 
        <div className="create__animeTitle create__section">
            <h3 className="create__title">Tytuł</h3>
            <input type="text" className="create__titleInp create__inputText" placeholder="Tytuł" value={title} onChange={handleChangeTitle}/>
        </div>
     );
}
 
export default Title;