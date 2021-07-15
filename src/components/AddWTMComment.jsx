import React, { useState } from 'react';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

const AddWTMComment = ({callAPI}) => {

    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleAddComment = () => {
        const date = new Date();
        fetch('https://question-mark-project-anime.herokuapp.com/wtm/add-comment', {
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                user: localStorage.getItem('UID'),
                text,
                date: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
            })
        })
            .then(res => res.json())
            .then(() => {
                setText('');
                callAPI();
            });
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleAddComment();
        }
    }

    return ( 
        <div className="WTMC__addComment">
            <textarea placeholder="Napisz komentarz..." className="WTMC__textarea" value={text} onChange={handleTextChange} onKeyDown={handleKeyDown}></textarea>
            <div className="WTMC__send" onClick={handleAddComment}>
                <SendRoundedIcon className="WTMC__sendIcon" />
            </div>
        </div>
     );
}
 
export default AddWTMComment;