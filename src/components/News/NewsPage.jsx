import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Loading from '../Loading';
import SingleNewsPage from './SingleNewsPage';

import { callApi } from '../../utils/callApi';

const NewsPage = () => {

    const componentRef = useRef();
    const { params } = useRouteMatch();

    const [newsData, setNewsData] = useState(null);
    const getNewsData = useCallback(async () => {
        const newsData = await callApi(`news/${params.newsId}`, null);
        if (!componentRef.current) return;
        setNewsData(newsData);
    }, [params]);

    const newsPageComponent = useMemo(() => newsData ? <SingleNewsPage newsData={newsData} getNewsData={getNewsData}/> : <Loading />, [getNewsData, newsData]);

    useEffect(() => {
        if (!params.newsId) return;
        getNewsData();
    }, [params, getNewsData]);

    return ( 
        <div className="news-page main__content" ref={componentRef}>
            {newsPageComponent}
        </div>
        
     );
}
 
export default NewsPage;