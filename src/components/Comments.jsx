import React from 'react';

import AddComment from './AddComment';
import SingleComment from './SingleComment';

import img from '../media/img/sak6-spec.jpg';

const Comments = ({comments, isAuthorized, handleRemove, callAPI}) => {

    const commentsList = () => {
        const sorted = [...comments].reverse();
        return sorted.map(c => <SingleComment key={c.id} id={c.id} username={c.username} img={c.img} date={c.date} text={c.text} likes={c.likes} isAuthorized={isAuthorized} handleRemove={handleRemove} callAPI={callAPI}/>)
    }

    return ( 
        <div className="comments scrollNav" data-id="6">
            <h2 className="comments__title largeTitle">Komentarze</h2>
            <AddComment avatar={img} callAPI={callAPI}/>
            <div className="comments__container">
                <ul className="comments__list">
                    {commentsList()}
                </ul>
            </div>
        </div>
     );
}
 
export default Comments;