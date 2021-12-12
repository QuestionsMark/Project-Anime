import React from 'react';

const Error = ({error}) => {
    return ( 
        <div className="error">
            <div className="error__content">
                <div className="error__gif"/>
                <p className="error__text">{error.message}</p>
                <div className="error__gif"/>
            </div>
        </div>
     );
}
 
export default Error;