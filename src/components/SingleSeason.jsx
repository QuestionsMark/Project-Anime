import React from 'react';
import { Link } from 'react-router-dom';

import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import { HOST_ADDRESS } from '../config';

const SingleSeason = ({id, title, background, link, isAuthorized, handleRemove}) => {
    return ( 
        <Link to={`/pages/${link}`} className="page__season" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${background})`, backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="blockCurtain"></div>
            {isAuthorized ? <div className="page__adminChanges">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" data-id={id} onClick={(e) => {handleRemove("seasons", e)}}/>
            </div> : null}
            <div className="page__seasonLink" >
                <p className="page__seasonLink">{title}</p>
            </div>
        </Link>
     );
}
 
export default SingleSeason;