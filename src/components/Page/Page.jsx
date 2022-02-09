import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Loading from '../Loading';
import PageImage from './PageImage';
import Info from './Info';
import Galery from './Galery';
import Baner from './Baner';
import Types from './Types';
import Description from './Description';
import Soundtracks from './Soundtracks';
import Seasons from './Seasons';
import Comments from '../Comments/Comments';

import { callApi } from '../../utils/callApi';

const Page = () => {

    const componentRef = useRef();
    const { params } = useRouteMatch();

    const [anime, setAnime] = useState(null);
    const getAnimeData = useCallback(async() => {
        const anime = await callApi(`anime/${params.animeID}`, null);
        if (!componentRef.current) return;
        setAnime(anime);
    }, [params.animeID]);

    const [author, setAuthor] = useState('');
    const getAuthor = useCallback(async () => {
        if (anime.description.authorID === '') return setAuthor('');
        const author = await callApi(`users/${anime.description.authorID}/author`, '');
        if (!componentRef.current) return;
        setAuthor(author);
    }, [anime]);

    const imageComponent = useMemo(() => anime ? <PageImage image={anime.images.mini.id} title={anime.title}/> : null, [anime]);
    const infoComponent = useMemo(() => anime ? <Info id={anime.id} rate={anime.rate} info={anime.info} likes={anime.likes} getAnimeData={getAnimeData}/> : null, [anime, getAnimeData]);
    const galeryComponent = useMemo(() => anime ? <Galery id={anime.id} images={anime.images} getAnimeData={getAnimeData}/> : null, [anime, getAnimeData]);
    const banerComponent = useMemo(() => anime ? <Baner id={anime.id} images={anime.images} title={anime.title} watchLink={anime.watchLink} info={anime.info} types={anime.types} rate={anime.rate}/> : null, [anime]);
    const typesComponent = useMemo(() => anime ? <Types types={anime.types}/> : null, [anime]);
    const descriptionComponent = useMemo(() => anime ? <Description id={anime.id} authorId={anime.description.authorID} author={author} description={anime.description.description} getAnimeData={getAnimeData}/> : null, [anime, author, getAnimeData]);
    const soundtracksComponent = useMemo(() => anime ? <Soundtracks id={anime.id} soundtracks={anime.soundtracks} getAnimeData={getAnimeData}/> : null, [anime, getAnimeData]);
    const seasonsComponent = useMemo(() => anime ? <Seasons id={anime.id} seasons={anime.seasons} getAnimeData={getAnimeData}/> : null, [anime, getAnimeData]);
    const commentsComponent = useMemo(() => anime ? <Comments id={anime.id} comments={anime.comments} collection="anime" getData={getAnimeData}/> : null, [anime, getAnimeData]);

    useEffect(() => {
        if (!anime) return;
        getAuthor();
    }, [anime, getAuthor]);

    useEffect(() => {
        getAnimeData();
    }, [getAnimeData]);

    return ( 
        <>
        {anime ? <div className="main__content scrollNav" data-id="1" ref={componentRef}>
            <h2 className="page__title largeTitle">{anime.title}</h2>
            <div className="page__content">
                <div className="page__left">
                    {imageComponent}
                    {infoComponent}
                    {galeryComponent}
                </div>
                <div className="page__right">
                    {banerComponent}
                    {typesComponent}
                    {descriptionComponent}
                    {soundtracksComponent}
                    {seasonsComponent}
                </div>
            </div>
            {commentsComponent}
        </div> : <div className="main__content scrollNav" data-id="1" ref={componentRef}><Loading /></div>}
        </>
     );
}
 
export default Page;