import React from 'react';
import { Link } from 'react-router-dom';

const SingleSeason = ({title, background, link}) => {
    return ( 
        <Link to={link} className="page__season" style={{backgroundImage: `url(${background})`, backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="blockCurtain"></div>
            <p className="page__seasonLink">{title}</p>
        </Link>
     );
}
 
export default SingleSeason;