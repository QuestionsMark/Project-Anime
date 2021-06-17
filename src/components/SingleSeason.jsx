import React from 'react';
import { Link } from 'react-router-dom';

import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

const SingleSeason = ({title, background, link, isAuthorized, handleRemove, callAPI}) => {
    return ( 
        <Link to={`/pages/${link}`} className="page__season" style={{backgroundImage: `url(http://localhost:9000/images/${background})`, backgroundPosition: "center", backgroundSize: "cover"}} onClick={callAPI}>
            <div className="blockCurtain"></div>
            {isAuthorized ? <div className="page__adminChanges">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <p className="page__seasonLink">{title}</p>
        </Link>
     );
}
 
export default SingleSeason;