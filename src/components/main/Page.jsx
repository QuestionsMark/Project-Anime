import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

import { useUser } from '../../contexts/UserProvider';

import Popup from 'reactjs-popup';

import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
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
import ServerResponse from '../ServerResponse';
import SingleGaleryImage from '../SingleGaleryImage';

const Page = ({match, history}) => {

    const [status,, authorization,, user] = useUser();

    const [open, setOpen] = useState(false);
    const closePopup = () => {
        setOpen(false);
    }
    const [response, setResponse] = useState('');

    const [animeData, setAnimeData] = useState(null);

    const getAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/${match.params.animeID}`);
        if (response.ok) {
            const anime = await response.json();
            setAnimeData(anime);
        }
    };

    const handleMouseEnter = () => {
        const effect = document.querySelector('.page__effect');
        const icons = document.querySelectorAll('.page__banerIcon');
        effect.style.backgroundColor = 'rgba(10, 10, 10, 0.7)';
        icons.forEach(i => {
            i.style.opacity = 1;
        })
    }
    const handleMouseLeave = () => {
        const effect = document.querySelector('.page__effect');
        const icons = document.querySelectorAll('.page__banerIcon');
        effect.style = '';
        icons.forEach(i => {
            i.style = '';
        })
    }

    const handleRemove = (type, e) => {
        let target = e.target;
        if (target.localName === "path") {
            target = target.parentElement;
        }
        if (type === "galery") {
            const id = target.getAttribute('data-id');
            const name = target.getAttribute('data-name');
            fetch(`${HOST_ADDRESS}/images/remove`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'DELETE',
                body: JSON.stringify({
                    name
                })
            })
                .then(res => res.json())
                .then(res => {
                    fetch(`${HOST_ADDRESS}/pages/change/remove-galery-image`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': localStorage.getItem('token')
                        },
                        method: 'DELETE',
                        body: JSON.stringify({
                            anime: match.params.anime,
                            id
                        })
                    })
                        .then(res => res.json())
                        .then(res => {
                            window.location.reload();
                        })
                })
        } else if (type === "soundtrack") {
            const id = target.getAttribute('data-id');
            console.log(id)
            const name = target.getAttribute('data-name');
            console.log(name)
            
        } else if (type === "seasons") {
            const id = target.getAttribute('data-id');
            fetch(`${HOST_ADDRESS}/pages/change/remove-season`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'DELETE',
                body: JSON.stringify({
                    anime: match.params.anime,
                    id
                })
            })
                .then(res => res.json())
                .then(res => {
                    window.location.reload();
                })
        } else if (type === "comment") {
            const id = target.getAttribute('data-id');
            fetch(`${HOST_ADDRESS}/pages/change/remove-comment`, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                method: 'DELETE',
                body: JSON.stringify({
                    anime: match.params.anime,
                    id
                })
            })
                .then(res => res.json())
                .then(res => {
                    window.location.reload();
                })
        }
    }

    const showRate = () => {
        if (animeData.rate.length > 0) {
            let rateValue = 0;
            animeData.rate.forEach(r => rateValue += r.rate);
            const average = (rateValue / animeData.rate.length).toFixed(2);
            return average;
        }
        return 0;
    }

    const typesList = () => {
        return animeData.types.map(t => <Link to={`/types/${t.link}`} key={t.id} className="page__type">{t.name}</Link>);
    }

    const imageGalery = () => {
        return animeData.images.galeryImages.map(i => <SingleGaleryImage key={i.id} image={i} animeData={animeData} getAnime={getAnime} setResponse={setResponse} setOpen={setOpen}/>);
    }

    const seasonsList = () => {
        return animeData.seasons.map(s => <SingleSeason key={s.id} season={s} animeData={animeData} getAnime={getAnime} setOpen={setOpen} setResponse={setResponse}/>);
    }

    const audioList = () => {
        return animeData.soundtracks.map(s => <PageAudio key={s.id} soundtrack={s} animeData={animeData} getAnime={getAnime} setOpen={setOpen} setResponse={setResponse}/>);
    }

    const checkFavoriteType = () => (animeData.types.findIndex(t => t.name === user.favoriteType) !== -1);

    const rateAmountText = () => {
        if (animeData.rate.length === 1) return 'głos';
        if (animeData.rate.length === 0 || animeData.rate.length > 4) return 'głosów';
        return 'głosy';
    }

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });

    useEffect(() => {
        goUp();
        getAnime();
    },[match])

    return ( 
        <>
        {animeData ? <main className="main" style={{backgroundImage: animeData.images.background.id ? `url(${HOST_ADDRESS}/images/${animeData.images.background.id})` : '', backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="curtain"></div>
            <LeftSide />
            <div className="page main__content scrollNav" data-id="1">
                <h2 className="page__title largeTitle">{animeData.title}</h2>
                <div className="page__content">
                    <div className="page__left">
                        <div className="page__imgWrapper">
                            <img src={animeData.images.mini.id ? `${HOST_ADDRESS}/images/${animeData.images.mini.id}` : ''} alt="asdasd" className="img" />
                        </div>
                        <div className="page__info">
                            <div className="page__rate">
                                {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                                    <Popup modal nested trigger={<SettingsRoundedIcon className="page__adminIcon" />} on="click">
                                        {close => <ChangesInfo close={close} anime={animeData} getAnime={getAnime}/>}
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
                            {status ? <UserRate animeData={animeData}/> : null}
                        </div>
                        <div className="page__galery">
                            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                                <Popup modal nested trigger={<AddRoundedIcon className="page__adminIcon page__adminIcon--border" />} on="click">
                                    {close => <ChangesGalery animeData={animeData} getAnime={getAnime} close={close}/>}
                                </Popup>
                            </div> : null}
                            <h3 className="page__galeryTitle mediumTitle">Galeria</h3>
                            <SRLWrapper>
                                {imageGalery()}
                            </SRLWrapper>
                        </div>
                    </div>
                    <div className="page__right">
                        <div className="page__baner" style={{backgroundImage: animeData.images.baner.id ? `url(${HOST_ADDRESS}/images/${animeData.images.baner.id})` : '', backgroundPosition: "center", backgroundSize: "cover"}}>
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
                            <h3 className="page__typesTitle mediumTitle">Gatunek</h3>
                            <div className="page__typesList">
                                {typesList()}
                            </div>
                        </div>
                        <div className="page__description scrollNav" data-id="3">
                            {(status && animeData.description.description.includes('Lorem ipsum')) || (user.rank === '2' || user.rank === '3') ? <div className="page__adminChanges">
                                <Popup modal nested trigger={<SettingsRoundedIcon className="page__adminIcon" />} on="click">
                                    {close => <ChangesDescription close={close} anime={animeData} getAnime={getAnime}/>}
                                </Popup>
                            </div> : null}
                            <h3 className="page__descriptionTitle mediumTitle">Opis</h3>
                            <p className="page__descriptionText">
                                {animeData.description.description}
                                <span className="page__author">{animeData.description.author}</span>
                            </p>
                        </div>
                        <div className="page__audioInterface scrollNav" data-id="4">
                            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                                <Popup modal nested trigger={<AddRoundedIcon className="page__adminIcon page__adminIcon--border" />} on="click">
                                    {close => <ChangesSoundtrack animeData={animeData} getAnime={getAnime} close={close} />}
                                </Popup>
                            </div> : null}
                            <h3 className="page__soundtrackTitle mediumTitle">Posłuchaj Soundtracku!</h3>
                            {audioList()}
                        </div>
                        <div className="page__seasons scrollNav" data-id="5">
                            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                                <Popup modal nested trigger={<AddRoundedIcon className="page__adminIcon page__adminIcon--border" />} on="click">
                                    {close => <ChangesSeason close={close} animeData={animeData} getAnime={getAnime}/>}
                                </Popup>
                            </div> : null}
                            <h3 className="page__seasonsTitle mediumTitle">Powiązane Anime</h3>
                            {animeData.seasons.length !== 0 ? seasonsList() : 'Brak Sezonów lub innych powiązanych anime.'}
                        </div>
                    </div>
                </div>
                <Comments animeData={animeData} getAnime={getAnime} setOpen={setOpen} setResponse={setResponse}/>
            </div>
            <RightSide />
        </main> : null}
        <Popup modal onClose={() => setOpen(false)} open={open}>
            <ServerResponse close={closePopup} response={response}/>
        </Popup>
        </>
     );
}
 
export default withRouter(Page);