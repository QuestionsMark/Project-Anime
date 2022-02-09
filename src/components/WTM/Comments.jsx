import React from 'react';

import SingleComment from './SingleComment';
import AddComment from './AddComment';

const Comments = ({id, whatsTheMelodyComments, getWTMComments}) => {

    const wTMCommentsList = () => {
        return whatsTheMelodyComments.map(c => <SingleComment key={c.id} comment={c} getWTMComments={getWTMComments} WTMID={id}/>);
    };

    return ( 
        <div className="WTMC">
            <h3 className="WTMC__title">Skomentuj wyniki!</h3>
            <div className="WTMC__comments">
                <ul className="WTMC__list">
                    {wTMCommentsList()}
                </ul>
                <AddComment id={id} getWTMComments={getWTMComments}/>
            </div>
        </div>
     );
}
 
export default Comments;