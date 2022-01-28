import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router';
import { SRLWrapper } from "simple-react-lightbox";

import RemoveRedEyeRounded from '@material-ui/icons/RemoveRedEyeRounded';
import ForumRounded from '@material-ui/icons/ForumRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import SingleVideo from './SingleVideo';
import Comments from './Comments';
import SingleNewsImage from './SingleNewsImage';

import { HOST_ADDRESS } from '../config';
import Popup from 'reactjs-popup';
import UpdateNews from './UpdateNews';
import Loading from './Loading';

const NewsPage = ({match}) => {

    const componentRef = useRef();

    const [newsData, setNewsData] = useState({});
    const { id, title, intro, description, createdAt, images, videos, otherLinks, comments, views } = newsData;
    const getNewsData = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/news/${match.params.id}`);
        if (response.ok) {
            const news = await response.json();
            if (!componentRef.current) return;
            setNewsData(news);
        }
    }, [match]);

    const otherLinksList = () => {
        return otherLinks.map(l => <a href={l.link} key={l.id} target="_blank" rel="noreferrer" className="news-page__link">{l.note ? l.note : 'Link'}</a>);
    };
    const videosList = () => {
        return videos.map(v => <SingleVideo key={v.id} video={v}/>);
    };
    const imagesList = () => {
        return images.map(i => <SingleNewsImage key={i.id} id={i.id} _id={i._id} newsID={id} title={title} getNewsData={getNewsData}/>);
    };

    const newsPageComponent = () => {
        return JSON.stringify(newsData) === "{}" ?
            <Loading />
            :
            <>
            <h2 className="news-page__title">{title}
                <Popup modal nested closeOnDocumentClick={false} trigger={<SettingsRoundedIcon className="news-page__update-icon"/>}>
                    {close => <UpdateNews close={close} getNews={getNewsData} id={id}/>}
                </Popup>
            </h2>
            <div className="news-page__section">
                <p className="news-page__text">{intro}</p>
                <p className="news-page__text">{description}</p>
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
            <Comments data={newsData} getData={getNewsData} collection="news"/>
        </>;
    }   

    useEffect(() => {
        getNewsData();
    }, [getNewsData]);

    return ( 
        <div className="news-page main__content" ref={componentRef}>
            {newsPageComponent()}
        </div>
     );
}
 
export default withRouter(NewsPage);