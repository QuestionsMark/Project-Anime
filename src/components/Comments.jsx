import React from 'react';

import { useUser } from '../contexts/UserProvider';

import AddComment from './AddComment';
import SingleComment from './SingleComment';

const Comments = ({data, getData, collection}) => {

    const { status } = useUser();

    const { comments } = data;

    const commentsList = () => {
        return [...comments]
            .reverse()
            .map(c => <SingleComment key={c.id} comment={c} data={data} getData={getData} collection={collection}/>);
    };

    return ( 
        <div className="comments scrollNav" data-id="6">
            <h2 className="comments__title largeTitle">Komentarze</h2>
            {status ? <AddComment getData={getData} data={data} collection={collection}/> : null}
            <div className="comments__container">
                <ul className="comments__list">
                    {commentsList()}
                </ul>
            </div>
        </div>
     );
}
 
export default Comments;