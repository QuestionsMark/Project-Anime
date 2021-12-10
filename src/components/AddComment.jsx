import React, { useEffect, useRef, useState } from 'react';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

import img from '../media/img/guest.png';

import { HOST_ADDRESS } from '../config.js';
import { useUser } from '../contexts/UserProvider';

const AddComment = ({data, getData, collection}) => {

    const addCommentDiv = useRef();
    const textarea = useRef();

    const { user } = useUser();

    const [validationErrors, setValidationErrors] = useState(
        ['Komentarz powinien zawierać od 1 do 3000 znaków.']
    );
    const [text, setText] = useState('');
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const checkValidation = () => {
        const errors = [];

        if (text.length === 0 || text.length > 3000) {
            errors.push('Komentarz powinien zawierać od 1 do 3000 znaków.');
        }

        return errors;
    };

    const handleShowValidate = () => {
        addCommentDiv.current.classList.add('show');
    };
    const handleHideValidate = () => {
        addCommentDiv.current.classList.remove('show');
    };

    const handleKeyDown = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            handleAddComment(e);
        }
    };

    const handleAddComment = async e => {
        e.preventDefault();
        if (validationErrors.length === 0) {
            const date = new Date();
            setText('');
            textarea.current.blur();
            await fetch(`${HOST_ADDRESS}/${collection}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    collectionID: data.id,
                    userID: user.id,
                    date: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
                    text,
                }),
            });
            getData();
        }
    };

    useEffect(() => {
        setValidationErrors(checkValidation());
    }, [text]);

    return ( 
        <div ref={addCommentDiv} className="addComment">
            <div className="addComment__content">
                <div className="addComment__image" style={{ backgroundImage: `url(${HOST_ADDRESS}/images/${user.avatar})` }}/>
                <form className="addComment__form" onSubmit={handleAddComment}>
                    <textarea ref={textarea} className="addComment__textarea" placeholder="Napisz komentarz..." value={text} onChange={handleTextChange} onKeyDown={handleKeyDown} onFocus={handleShowValidate} onBlur={handleHideValidate}/>
                    <button type="submit" className="addComment__btn-submit" onClick={handleAddComment}><SendRoundedIcon className="addComment__sendIcon"/></button>
                </form>
            </div>
            <p className="addComment__validation-text">* Komentarz powinien zawierać od 1 do 3000 znaków. ( <span style={{color: text.length === 0 || text.length > 3000 ? '#d14141' : '#5ec45e'}}>{text.length}</span> )</p>
        </div>
     );
}
 
export default AddComment;