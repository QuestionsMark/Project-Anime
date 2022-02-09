import React from 'react';
import Popup from 'reactjs-popup';
import { SRLWrapper } from "simple-react-lightbox";

import RemoveRedEyeRounded from '@material-ui/icons/RemoveRedEyeRounded';
import ForumRounded from '@material-ui/icons/ForumRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import SingleVideo from '../SingleVideo';
import Comments from '../Comments/Comments';
import SingleNewsImage from './SingleNewsImage';
import UpdateNews from './UpdateNews';

import { textHelper } from '../../utils/textHelper';

const SingleNewsPage = ({newsData, getNewsData}) => {

    const { id, title, description, otherLinks, videos, images, views, comments, createdAt } = newsData;
    
    const otherLinksList = () => {
        return otherLinks.map(l => <a href={l.link} key={l.id} target="_blank" rel="noreferrer" className="news-page__link">{l.note ? l.note : 'Link'}</a>);
    };
    const videosList = () => {
        return videos.map(v => <SingleVideo key={v.id} video={v}/>);
    };
    const imagesList = () => {
        return images.map(i => <SingleNewsImage key={i.id} id={i.id} _id={i._id} newsID={id} title={title} getNewsData={getNewsData}/>);
    }; 

    return ( 
        <>
            <h2 className="news-page__title">{title}
                <Popup modal nested closeOnDocumentClick={false} trigger={<SettingsRoundedIcon className="news-page__update-icon"/>}>
                    {close => <UpdateNews close={close} getNews={getNewsData} id={id}/>}
                </Popup>
            </h2>
            <div className="text--indent news-page__section">
                {textHelper(description)}
            </div>
            {videos.length > 0 ? <div className="news-page__section news-page__section--margin-none">
                <h3 className="news-page__subtitle">Zobacz też:</h3>
                <ul className="news-page__list">
                    {videosList()}
                </ul>
            </div> : null}
            <SRLWrapper>
                <div className="news-page__section news-page__section--margin-none">
                    <h3 className="news-page__subtitle">Zobacz grafiki:</h3>
                    <ul className="news-page__list">
                        {imagesList()}
                    </ul>
                </div>
            </SRLWrapper>
            {otherLinks.length > 0 ? <div className="news-page__section">
                <h3 className="news-page__subtitle">Dodadkowe odnośniki:</h3>
                <ul className="news-page__list news-page__list--column news-page__list--start">
                    {otherLinksList()}
                </ul>
            </div> : null}
            <div className="news-page__section news-page__section--flex">
                <p className="news-page__stat"><RemoveRedEyeRounded className="news-page__stat-icon"/>{views}</p>
                <p className="news-page__stat"><ForumRounded className="news-page__stat-icon"/>{comments.length}</p>
                <p className="news-page__stat">{createdAt}</p>
            </div>
            <Comments id={newsData.id} comments={newsData.comments} collection="news" getData={getNewsData}/>
        </>
     );
}
 
export default SingleNewsPage;