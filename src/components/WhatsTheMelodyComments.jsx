import React from 'react';
import { withRouter } from 'react-router-dom';

import SingleWTMComment from './SingleWTMComment';
import AddWTMComment from './AddWTMComment';

import { useData } from '../contexts/DataProvider';

const WhatsTheMelodyComments = () => {

    const { whatsTheMelodyComments } = useData();

    const wTMCommentsList = () => {
        return whatsTheMelodyComments.map(com => <SingleWTMComment key={com.id} comment={com} />);
    };

    return ( 
        <div className="WTMC">
            <h3 className="WTMC__title">Skomentuj wyniki!</h3>
            <div className="WTMC__comments">
                <ul className="WTMC__list">
                    {wTMCommentsList()}
                </ul>
                <AddWTMComment />
            </div>
        </div>
     );
}
 
export default withRouter(WhatsTheMelodyComments);