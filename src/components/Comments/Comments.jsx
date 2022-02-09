import React from 'react';

import AddComment from './AddComment';
import SingleComment from './SingleComment';

import { useUser } from '../../contexts/UserProvider';

const Comments = ({id, comments, getData, collection}) => {

    const { status } = useUser();

    const commentsList = () => {
        return [...comments]
            .reverse()
            .map(c => <SingleComment key={c.id} comment={c} collectionId={id} getData={getData} collection={collection}/>);
    };

    return ( 
        <div className="comments scrollNav" data-id="6">
            <h2 className="comments__title largeTitle">Komentarze</h2>
            {status ? <AddComment getData={getData} collectionId={id} collection={collection}/> : null}
            <div className="comments__container">
                <ul className="comments__list">
                    {commentsList()}
                </ul>
            </div>
        </div>
     );
}
 
export default Comments;