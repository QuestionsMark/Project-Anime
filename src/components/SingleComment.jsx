import React from 'react';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

const SingleComment = ({id, img, username, date, text, likes, isAuthorized, handleRemove}) => {
    return ( 
        <div className="comments__item">
            {isAuthorized ? <div className="page__adminChanges page__adminChanges--com">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <div className="comments__imgWrapper">
                <img src={img} alt="avatar" className="img" />
            </div>
            <div className="comments__content">
                <div className="comments__info">
                    <h3 className="comments__nick">{username}</h3>
                    <p className="comments__date">{date}</p>
                </div>
                <p className="comments__text">{text}</p>
                <div className="comments__likes">
                    <p className="comments__likesValue">{likes}</p>
                    <FavoriteBorderRoundedIcon className="comments__likeIcon" data-id={id}/>
                </div>
            </div>
        </div>
     );
}
 
export default SingleComment;