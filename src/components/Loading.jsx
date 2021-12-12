import React from 'react';

const Loading = () => {
    return ( 
        <div className="loading">
            <div className="loading__content">
                <div className="loading__gif"/>
                <p className="loading__text">Jestem w drodze po Twoje dane. Daj mi chwilkę...</p>
                <div className="loading__gif"/>
            </div>
        </div>
     );
}
 
export default Loading;