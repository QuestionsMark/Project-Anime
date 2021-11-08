import React from 'react';

const SingleImagePreview = ({image}) => {

    const { url, size } = image;
    return ( 
        <li className="changes__preview-item">
            <p className="changes__size" style={{color: size < 2.62144 ? '#5ec45e' : '#d14141'}}>{size.toFixed(2)} MB {size < 2.62144 ? 'OK' : 'Plik jest za duży!'}</p>
            <div className="changes__preview">
                <img src={url} alt="galery" className="img" />
            </div>
        </li>
     );
}
 
export default SingleImagePreview;