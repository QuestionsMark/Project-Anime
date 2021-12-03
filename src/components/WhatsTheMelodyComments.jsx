import React from 'react';
import { withRouter } from 'react-router-dom';

import SingleWTMComment from './SingleWTMComment';
import AddWTMComment from './AddWTMComment';

const WhatsTheMelodyComments = ({id, whatsTheMelodyComments, getWTMComments}) => {

    const wTMCommentsList = () => {
        return whatsTheMelodyComments.map(c => <SingleWTMComment key={c.id} comment={c} getWTMComments={getWTMComments} WTMID={id}/>);
    };

    return ( 
        <div className="WTMC">
            <h3 className="WTMC__title">Skomentuj wyniki!</h3>
            <div className="WTMC__comments">
                <ul className="WTMC__list">
                    {wTMCommentsList()}
                </ul>
                <AddWTMComment id={id} getWTMComments={getWTMComments}/>
            </div>
        </div>
     );
}
 
export default withRouter(WhatsTheMelodyComments);