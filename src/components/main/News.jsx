import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import Popup from 'reactjs-popup';

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import SingleNews from '../SingleNews';

import setMain from '../../utils/setMain';
import AddNews from '../AddNews';
import { HOST_ADDRESS } from '../../config';

const News = ({main, history, match}) => {

    const [news, setNews] = useState([]);
    const getNews = async () => {
        const response = await fetch(`${HOST_ADDRESS}/news`);
        if (response.ok) {
            const news = await response.json();
            setNews(news);
        }
    };

    const newsList = () => {
        return news.map(news => <SingleNews key={news.id} news={news}/>);
    };

    useEffect(() => {
        getNews();
    }, [])

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <div className="news main__content scrollNav" data-id="4">
            <h2 className="news__title">Wiadomości ze Świata Anime!</h2>
            <Popup modal nested closeOnDocumentClick={false} trigger={<div className="news__add"><AddRoundedIcon className="news__add-new-news"/> Dodaj Nowość</div>} on="click">
                {close => <AddNews close={close} getNews={getNews}/>}
            </Popup>
            <div className="news__container">
                {newsList()}
            </div>
        </div>
     );
}
 
export default withRouter(News);