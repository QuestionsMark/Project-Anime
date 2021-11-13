import React from 'react';

import { useUser } from '../contexts/UserProvider';

import AddComment from './AddComment';
import SingleComment from './SingleComment';

const Comments = ({animeData, getAnime}) => {

    const [status] = useUser();

    const { comments } = animeData;

    const commentsList = () => {
        return [...comments]
            .reverse()
            .map(c => <SingleComment key={c.id} comment={c} animeData={animeData} getAnime={getAnime}/>);
    };

    return ( 
        <div className="comments scrollNav" data-id="6">
            <h2 className="comments__title largeTitle">Komentarze</h2>
            {status ? <AddComment getAnime={getAnime} animeData={animeData}/> : null}
            <div className="comments__container">
                <ul className="comments__list">
                    {commentsList()}
                </ul>
            </div>
        </div>
     );
}
 
export default Comments;