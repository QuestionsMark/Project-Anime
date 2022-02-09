import React from 'react';

import { Image } from '../Image';

const PageImage = ({ image, title }) => {
    return ( 
        <div className="page__imgWrapper">
            <Image src={image} alt={`Tytułowa grafika do anime: ${title}`}/>
        </div>
     );
}
 
export default PageImage;