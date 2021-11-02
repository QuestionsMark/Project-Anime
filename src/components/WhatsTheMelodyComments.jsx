import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

import SingleWTMComment from './SingleWTMComment';
import AddWTMComment from './AddWTMComment';

import { HOST_ADDRESS } from '../config';

const WhatsTheMelodyComments = ({isUserLogged, match}) => {

    const [WTMComments, setWTMComments] = useState([
        {
            id: '',
            nick: '',
            link: '',
            img: '',
            message: '',
            likes: [],
            date: ''
        }
    ]);

    const callAPI = () => {
        fetch(`${HOST_ADDRESS}/wtm/comments`)
            .then(res => res.json())
            .then(res => setWTMComments(res))
    }

    const scrollDown = async() => {
        await fetch(`${HOST_ADDRESS}/wtm/comments`)
                .then(res => res.json())
                .then(res => setWTMComments(res))
        const scrollValue = document.querySelector('.main__rightSide').scrollHeight;
        document.querySelector('.main__rightSide').scroll({
            behavior: 'smooth',
            top: scrollValue
        });
        const scrollValue2 = document.querySelector('.WTMC__list').scrollHeight;
        document.querySelector('.WTMC__list').scroll({
            behavior: 'smooth',
            top: scrollValue2
        });
    }

    const WTMCommentsList = WTMComments.map(com => <SingleWTMComment key={com.id} id={com.id} nick={com.username} link={com.link} img={com.img} message={com.text} likes={com.likes} date={com.date} callAPI={callAPI}/>);

    useEffect(() => {
        callAPI();
    },[match])

    return ( 
        <div className="WTMC">
            <h3 className="WTMC__title">Skomentuj wyniki!</h3>
            <div className="WTMC__comments">
                <ul className="WTMC__list">
                    {WTMCommentsList}
                </ul>
                <AddWTMComment scrollDown={scrollDown}/>
            </div>
        </div>
     );
}
 
export default withRouter(WhatsTheMelodyComments);