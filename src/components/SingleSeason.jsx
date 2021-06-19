import React from 'react';
import { Link } from 'react-router-dom';

import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

const SingleSeason = ({id, title, background, link, isAuthorized, handleRemove}) => {
    return ( 
        <div className="page__season">
            {isAuthorized ? <div className="page__adminChanges">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" data-id={id} onClick={(e) => {handleRemove("seasons", e)}}/>
            </div> : null}
            <Link to={`/pages/${link}`} className="page__season" style={{backgroundImage: `url(http://localhost:9000/images/${background})`, backgroundPosition: "center", backgroundSize: "cover"}}>
                <div className="blockCurtain"></div>
                <p className="page__seasonLink">{title}</p>
            </Link>
        </div>
     );
}
 
export default SingleSeason;