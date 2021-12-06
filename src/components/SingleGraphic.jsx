import React from 'react';
import { HOST_ADDRESS } from '../config';

const SingleGraphic = ({graphic, choosedGraphics, setChoosedGraphics}) => {

    const { id } = graphic;

    const handleGraphicChoose = () => {
        setChoosedGraphics(prev => {
            const isThere = prev.findIndex(g => g === id) !== -1;
            if (prev.length < 5) {
                if (isThere) return prev.filter(g => g !== id);
                return [...prev, id];
            } else {
                if (isThere) return prev.filter(g => g !== id);
                return prev;
            }
        });
    };

    const isActive = () => {
        return choosedGraphics.findIndex(g => g === id) !== -1 ? 'active' : '';
    };

    return ( 
        <li className={`news__popup-add-single-graphic ${isActive()}`} style={{backgroundImage: `url(${HOST_ADDRESS}/images/${id})`}} onClick={handleGraphicChoose}/>
     );
}
 
export default SingleGraphic;