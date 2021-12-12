import React from 'react';

const LoadingSmall = () => {
    return ( 
        <div className="loading loading--small">
            <div className="loading__content loading__content--small">
                <div className="loading__gif"/>
                <p className="loading__text loading__text--small">Momencik...</p>
            </div>
        </div>
     );
}
 
export default LoadingSmall;