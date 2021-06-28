import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

const AddComment = ({avatar, callAPI, match}) => {

    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleSend = () => {
        if (text.length > 1) {
            const date = new Date();

            fetch('https://question-mark-project-anime.herokuapp.com/pages/change/add-comment', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'POST',
                body: JSON.stringify({
                    anime: match.params.anime,
                    user: localStorage.getItem('UID'),
                    date: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
                    text
                })
            })
                .then(res => res.json())
                .then(res => {
                    callAPI();
                    setText('');
                })
        } else {
            setText('');
        }
    }

    return ( 
        <div className="addComment">
            <div className="addComment__imgWrapper">
                <img src={avatar} alt="avatar" className="img" />
            </div>
            <form className="addComment__form">
                <textarea className="addComment__textarea" placeholder="Napisz komentarz..." value={text} onChange={handleTextChange}/>
                <SendRoundedIcon className="addComment__sendIcon" onClick={handleSend}/>
            </form>
        </div>
     );
}
 
export default withRouter(AddComment);