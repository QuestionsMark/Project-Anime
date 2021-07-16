import React, { useState } from 'react';
import $ from 'jquery';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

const AddWTMComment = ({scrollDown}) => {

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
                scrollDown();
            });
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleAddComment();
        }
    }

    const handleTextareaFocus = (e) => {
        const scrollValue = document.querySelector('.main__rightSide').scrollHeight;
        $('.main__rightSide').animate({
            scrollTop: `${scrollValue}`
        }, 1000);
    }

    return ( 
        <div className="WTMC__addComment">
            <textarea placeholder="Napisz komentarz..." className="WTMC__textarea" value={text} onChange={handleTextChange} onKeyDown={handleKeyDown} onFocus={handleTextareaFocus}></textarea>
            <div className="WTMC__send" onClick={handleAddComment}>
                <SendRoundedIcon className="WTMC__sendIcon" />
            </div>
        </div>
     );
}
 
export default AddWTMComment;