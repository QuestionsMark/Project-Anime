import React from 'react';

const SingleSAOClickerResult = ({place, result, refference}) => {

    const {username, time, lvl, achievements, swords } = result;

    return ( 
        <li className="SAOCRanking__item" ref={refference ? refference : null}>
            <p className="SAOCRanking__stat SAOCRanking__stat-place">{place}</p>
            <p className="SAOCRanking__stat">{username}</p>
            <p className="SAOCRanking__stat">{time}</p>
            <p className="SAOCRanking__stat">{lvl}</p>
            <p className="SAOCRanking__stat">{achievements}</p>
            <p className="SAOCRanking__stat">{swords}</p>
        </li>
     );
}
 
export default SingleSAOClickerResult;