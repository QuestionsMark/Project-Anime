import React from 'react';
import { withRouter } from 'react-router-dom';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

const SingleComment = ({id, img, username, date, text, likes, isAuthorized, handleRemove, callAPI, match}) => {

    const handleLikeClick = (e) => {
        let target = e.target;
        if (target.localName === "path") {
            target = target.parentElement;
        }
        const id = target.getAttribute('data-id');
        fetch('http://localhost:9000/pages/change/comment-like', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                anime: match.params.anime,
                user: localStorage.getItem('UID'),
                id
            })
        })
            .then(res => res.json())
            .then(() => {
                callAPI();
            })
    }

    const isActive = () => {
        if (likes.findIndex(l => l === localStorage.getItem('UID')) !== -1) {
            return 'active';
        }
        return '';
    }

    return ( 
        <div className="comments__item">
            {isAuthorized ? <div className="page__adminChanges page__adminChanges--com">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" data-id={id} onClick={(e) => {handleRemove("comment", e)}}/>
            </div> : null}
            <div className="comments__imgWrapper">
                <img src={`http://localhost:9000/images/${img}`} alt="avatar" className="img" />
            </div>
            <div className="comments__content">
                <div className="comments__info">
                    <h3 className="comments__nick">{username}</h3>
                    <p className="comments__date">{date}</p>
                </div>
                <p className="comments__text">{text}</p>
                <div className="comments__likes">
                    <p className="comments__likesValue">{likes.length}</p>
                    <FavoriteBorderRoundedIcon className={`comments__likeIcon ${isActive()}`} data-id={id} onClick={(e) => {handleLikeClick(e)}}/>
                </div>
            </div>
        </div>
     );
}
 
export default withRouter(SingleComment);