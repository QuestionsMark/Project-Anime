import React from 'react';
import { Link } from 'react-router-dom';

import RemoveRedEyeRounded from '@material-ui/icons/RemoveRedEyeRounded';
import ForumRounded from '@material-ui/icons/ForumRounded';

import { HOST_ADDRESS } from '../config';

const SingleNews = ({news}) => {

    const { id, title, intro, createdAt, image, comments, views } = news;

    const handleView = () => {
        fetch(`${HOST_ADDRESS}/news/${id}/view`, {
            method: 'PUT',
        });
    };

    return ( 
        <div className="news__article">
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