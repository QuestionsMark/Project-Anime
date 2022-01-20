import React from 'react';
import { Link } from 'react-router-dom';

import RemoveRedEyeRounded from '@material-ui/icons/RemoveRedEyeRounded';
import ForumRounded from '@material-ui/icons/ForumRounded';

import Notification from './Notification';

import { HOST_ADDRESS } from '../config';
import { useUser } from '../contexts/UserProvider';

const SingleNews = ({news, refference}) => {

    const { status, user } = useUser();

    const { id, title, intro, createdAt, image, comments, views, viewers } = news;

    const handleView = () => {
        fetch(`${HOST_ADDRESS}/news/${id}/view/${status ? user.id : 'null'}`, {
            method: 'PUT',
        });
    };

    const notificatorComponent = () => {
        if (status && JSON.stringify(user) !== '{}') {
            const isNew = viewers.findIndex(v => v === user.id) === -1;
            if (!isNew) return null;
            return <Notification />;
        }
        return null;
    };

    return ( 
        <div className="news__article" ref={refference ? refference : null}>
            {notificatorComponent()}
            <div className="news__article-image" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${image.id})`}}/>
            <div className="news__article-content">
                <Link to={`/news/${id}`} className="news__articleTitle" onClick={handleView}>{title}</Link>
                <p className="news__intro">{intro}</p>
                <div className="news__statistics">
                    <p className="news__stat"><RemoveRedEyeRounded className="news__stat-icon"/>{views}</p>
                    <p className="news__stat"><ForumRounded className="news__stat-icon"/>{comments}</p>
                    <p className="news__stat">{createdAt}</p>
                </div>
            </div>
        </div>
     );
}
 
export default SingleNews;