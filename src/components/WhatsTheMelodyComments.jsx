import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import SingleWTMComment from './SingleWTMComment';
import AddWTMComment from './AddWTMComment';

import testImg from '../media/img/sak6-spec.jpg';

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
        fetch('http://localhost:9000/wtm/comments')
            .then(res => res.json())
            .then(res => setWTMComments(res));
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
                <AddWTMComment callAPI={callAPI}/>
            </div>
        </div>
     );
}
 
export default withRouter(WhatsTheMelodyComments);