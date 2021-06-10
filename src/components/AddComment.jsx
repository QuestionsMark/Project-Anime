import React from 'react';

import SendRoundedIcon from '@material-ui/icons/SendRounded';

const AddComment = ({avatar}) => {

    const handleSend = () => {
        console.log('dodajemy komentarz');
    }

    return ( 
        <div className="addComment">
            <div className="addComment__imgWrapper">
                <img src={avatar} alt="avatar" className="img" />
            </div>
            <form className="addComment__form">
                <textarea className="addComment__textarea" placeholder="Napisz komentarz..." />
                <SendRoundedIcon className="addComment__sendIcon" onClick={handleSend}/>
            </form>
        </div>
     );
}
 
export default AddComment;