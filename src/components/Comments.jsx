import React from 'react';

import AddComment from './AddComment';
import SingleComment from './SingleComment';

import img from '../media/img/sak6-spec.jpg';

const Comments = ({comments}) => {

    const commentsList = comments.map(c => <SingleComment key={c.id} id={c.id} username={c.username} img={c.img} date={c.date} text={c.text} likes={c.likes}/>)

    return ( 
        <div className="comments scrollNav" data-id="5">
            <h2 className="comments__title largeTitle">Komentarze</h2>
            <AddComment avatar={img}/>
            <div className="comments__container">
                <ul className="comments__list">
                    {commentsList}
                </ul>
            </div>
        </div>
     );
}
 
export default Comments;