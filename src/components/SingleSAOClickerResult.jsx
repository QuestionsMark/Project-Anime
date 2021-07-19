import React from 'react';

import { Icon } from '@material-ui/core';

const SingleSAOClickerResult = ({place, username, completionTime, lvl, achievements, swords}) => {
    return ( 
        <li className="SAOCRanking__item">
            <p className="SAOCRanking__place">{place <= 3 ? <Icon className="fas fa-trophy " /> : place}</p>
            <p className="SAOCRanking__info SAOCRanking__info--nick">{username}</p>
            <p className="SAOCRanking__info SAOCRanking__info--time">{completionTime}</p>
            <p className="SAOCRanking__info SAOCRanking__info--lvl">{lvl}</p>
            <p className="SAOCRanking__info SAOCRanking__info--achievements">{achievements}</p>
            <p className="SAOCRanking__info SAOCRanking__info--swords">{swords}</p>
        </li>
     );
}
 
export default SingleSAOClickerResult;