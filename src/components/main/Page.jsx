import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";
import Popup from 'reactjs-popup';

import { useResponsePopup } from '../../contexts/ResponsePopupProvider';
import { useUser } from '../../contexts/UserProvider';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import UserRate from '../UserRate';
import Comments from '../Comments';
import SingleSeason from '../SingleSeason';
import PageAudio from '../PageAudio';
import ChangesInfo from '../ChangesInfo';

import { HOST_ADDRESS } from '../../config';
import ChangesGalery from '../ChangesGalery';
import ChangesSoundtrack from '../ChangesSoundtrack';
import ChangesSeason from '../ChangesSeason';
import ChangesDescription from '../ChangesDescription';
import SingleGaleryImage from '../SingleGaleryImage';
import setMain from '../../utils/setMain';
import Loading from '../Loading';

const Page = ({main, match, history}) => {

    const componentRef = useRef();

    const { setOpen, setResponse } = useResponsePopup();
    const { status, authorization, user } = useUser();

    const [animeData, setAnimeData] = useState(null);
    const getAnime = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/${match.params.animeID}`);
        if (response.ok) {
            const anime = await response.json();
            if (!componentRef.current) return;
            setAnimeData(anime);
        }
    }, [match]);
    const [author, setAuthor] = useState('');
    const getUser = useCallback(async () => {
        const response = await fetch(`${HOST_ADDRESS}/users/${animeData.description.authorID}`);
        if (response.ok) {
            const { username } = await response.json();
            if (!componentRef.current) return;
            setAuthor(username);
        }
    }, [animeData]);

    const showRate = () => {
        if (animeData.rate.length > 0) {
            let rateValue = 0;
            animeData.rate.forEach(r => rateValue += r.rate);
            const average = (rateValue / animeData.rate.length).toFixed(2);
            return average;
        }
        return 0;
    };

    const handleMouseEnter = () => {
        const effect = document.querySelector('.page__effect');
        const icons = document.querySelectorAll('.page__banerIcon');
        effect.style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
        icons.forEach(i => {
            i.style.opacity = 1;
        })
    };
    const handleMouseLeave = () => {
        const effect = document.querySelector('.page__effect');
        const icons = document.querySelectorAll('.page__banerIcon');
        effect.style = '';
        icons.forEach(i => {
            i.style = '';
        })
    };

    const typesList = () => {
        return animeData.types.map(t => <Link to={`/types/${t.name}`} key={t.id} className={`page__type ${JSON.stringify(user) !== "{}" ? `${user.favoriteType === t.name ? 'page__type--fav' : ''}` : ''}`}>{t.name}</Link>);
    };
    const imageGalery = () => {
        return animeData.images.galeryImages.map(i => <SingleGaleryImage key={i.id} image={i} animeData={animeData}/>);
    };
    const seasonsList = () => {
        return animeData.seasons.map(s => <SingleSeason key={s.id} season={s} animeData={animeData}/>);
    };
    const audioList = () => {
        return animeData.soundtracks.map(s => <PageAudio key={s.id} soundtrack={s} animeData={animeData} getAnime={getAnime}/>);
    };

    const checkFavoriteType = () => (animeData.types.findIndex(t => t.name === user.favoriteType) !== -1);

    const rateAmountText = () => {
        if (animeData.rate.length === 1) return 'głos';
        if (animeData.rate.length === 0 || animeData.rate.length > 4) return 'głosów';
        return 'głosy';
    };

    const handleResetDescription = async () => {
        setAuthor('');
        const response = await fetch(`${HOST_ADDRESS}/anime/description`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                animeID: animeData.id,
            }),
        });
        if (response.ok) {
            setResponse({status: response.ok, message: 'Usunięto opis anime.'});
        } else {
            const error = await response.json();
            setResponse({status: response.ok, message: error.message});
        }
        setOpen(true);
    };

    const goUp = useCallback(() => history.listen(() => {
        window.scrollTo(0, 0);
    }), [history]);
    useEffect(() => {
        if (animeData) {
            getUser();
        }
    }, [animeData, getUser]);

    useEffect(() => {
        goUp();
        setMain(main, match);
        getAnime();
    },[getAnime, goUp, main, match]);

    return ( 
        <div className="main__content scrollNav" data-id="1" ref={componentRef}>
            {animeData ?
            <>
                <h2 className="page__title largeTitle">{animeData.title}</h2>
                <div className="page__content">
                    <div className="page__left">
                        <div className="page__imgWrapper">
                            <img src={animeData.images.mini.id ? `${HOST_ADDRESS}/images/${animeData.images.mini.id}` : ''} alt="anime mini" className="img" />
                        </div>
                        <div className="page__info">
                            <div className="page__rate">
                                {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                                    <Popup modal nested closeOnDocumentClick={false} trigger={<SettingsRoundedIcon className="page__adminIcon" />} on="click">
                                        {close => <ChangesInfo close={close} anime={animeData}/>}
                                    </Popup>
                                </div> : null}
                                <StarRateRoundedIcon className="page__infoRateIcon" />
                                <p className="page__rateValue">{showRate()}</p>
                                <p className="page__rateAmount">{animeData.rate.length} {rateAmountText()}</p>
                            </div>
                            <div className="page__properties">
                                <p className="page__scenario page__inf">{animeData.info.scenario}</p>
                                <p className="page__productionDate page__inf">{animeData.info.productionDate}</p>
                                <p className="page__duration page__inf">{animeData.info.duration}</p>
                                <div className="page__favoriteAnime">
                                    <FavoriteBorderRoundedIcon className="page__favoriteAnimeIcon" />
                                    <p className="page__favoriteAnimeText">{animeData.likes.length} Adoratorów!</p>
                                    <FavoriteBorderRoundedIcon className="page__favoriteAnimeIcon" />
                                </div>
                            </div>
                            {status ? <UserRate animeData={animeData} getAnime={getAnime}/> : null}
                        </div>
                        <div className="page__galery">
                            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                                <Popup modal nested closeOnDocumentClick={false} trigger={<AddRoundedIcon className="page__adminIcon page__adminIcon--border" />} on="click">
                                    {close => <ChangesGalery animeData={animeData} close={close}/>}
                                </Popup>
                            </div> : null}
                            <h3 className="page__galeryTitle mediumTitle">Galeria</h3>
                            <SRLWrapper>
                                {imageGalery()}
                            </SRLWrapper>
                        </div>
                    </div>
                    <div className="page__right">
                        <div className="page__baner" style={{backgroundImage: animeData.images.baner.id ? `url(${HOST_ADDRESS}/images/${animeData.images.baner.id})` : ''}}>
                            <div className="page__effect">
                                <a href={animeData.watchLink} target="_blank" rel="noreferrer" className="page__banerIcon watchLink"><PlayCircleOutlineRoundedIcon className="watchIcon"/></a>
                                <ArrowBackIosRoundedIcon className="page__banerIcon corner1Icon"/>
                                <ArrowBackIosRoundedIcon className="page__banerIcon corner2Icon"/>
                                <ArrowBackIosRoundedIcon className="page__banerIcon corner3Icon"/>
                                <ArrowBackIosRoundedIcon className="page__banerIcon corner4Icon"/>
                                <PlayArrowRoundedIcon className="page__banerIcon playIcon"/>
                                <VolumeUpRoundedIcon className="page__banerIcon volumeIcon"/>
                                <div className="page__banerIcon lineIcon"></div>
                                <div className="page__banerIcon dotIcon"></div>
                                <FullscreenRoundedIcon className="page__banerIcon fullScreenIcon"/>
                            </div>
                            {checkFavoriteType() ? <p className="page__banerRecommend" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>To anime może Ci się spodobać!</p> : null}
                            <h3 className="page__banerTitle" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{animeData.title}</h3>
                            <p className="page__banerInfo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <span className="page__banerInf">{animeData.info.scenario}</span>
                                <span className="page__banerInf">{animeData.info.productionDate}</span>
                                <span className="page__banerInf">{animeData.info.duration}</span>
                            </p>
                            <div className="page__banerRate" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <StarRateRoundedIcon className="page__banerRateIcon" />
                                <p className="page__banerRateValue">{showRate()}</p>
                            </div>
                        </div>
                        <div className="page__types scrollNav" data-id="2">
                            <div className="page__typesList">
                                {typesList()}
                            </div>
                        </div>
                        <div className="page__description scrollNav" data-id="3">
                            {(status && animeData.description.description.includes('Lorem ipsum')) || (user.rank === '2' || user.rank === '3') ? <div className="page__adminChanges">
                                <Popup modal nested closeOnDocumentClick={false} trigger={<SettingsRoundedIcon className="page__adminIcon" />} on="click">
                                    {close => <ChangesDescription close={close} anime={animeData}/>}
                                </Popup>
                            </div> : null}
                            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges page__adminChanges--description">
                                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleResetDescription}/>
                            </div> : null}
                            <h3 className="page__descriptionTitle mediumTitle">Opis</h3>
                            <p className="page__descriptionText">
                                {animeData.description.description}
                                <Link to={`/users/${animeData.description.authorID}`} className="page__author">{author}</Link>
                            </p>
                        </div>
                        <div className="page__audioInterface scrollNav" data-id="4">
                            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                                <Popup modal nested closeOnDocumentClick={false} trigger={<AddRoundedIcon className="page__adminIcon page__adminIcon--border" />} on="click">
                                    {close => <ChangesSoundtrack animeData={animeData} close={close} />}
                                </Popup>
                            </div> : null}
                            <h3 className="page__soundtrackTitle mediumTitle">Posłuchaj Soundtracku!</h3>
                            {animeData.soundtracks.length > 0 ?  audioList() : <p className="page__text">Brak soundtracku do posłuchania.</p>}
                        </div>
                        <div className="page__seasons scrollNav" data-id="5">
                            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                                <Popup modal nested closeOnDocumentClick={false} trigger={<AddRoundedIcon className="page__adminIcon page__adminIcon--border" />} on="click">
                                    {close => <ChangesSeason close={close} animeData={animeData}/>}
                                </Popup>
                            </div> : null}
                            <h3 className="page__seasonsTitle mediumTitle">Powiązane Anime</h3>
                            {animeData.seasons.length !== 0 ? seasonsList() : 'Brak Sezonów lub innych powiązanych anime.'}
                        </div>
                    </div>
                </div>
                <Comments data={animeData} getData={getAnime} collection="anime"/>
                </>
                :
                <Loading />}
            </div>
     );
}
 
export default withRouter(Page);