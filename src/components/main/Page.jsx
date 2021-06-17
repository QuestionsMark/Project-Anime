import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import UserRate from '../UserRate';
import Comments from '../Comments';
import Changes from '../Changes';

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

import backgroundImg from '../../media/img/pla3-back20502.png';
import img from '../../media/img/sak6-spec.jpg';
import img2 from '../../media/img/ten5-back20502.jpg';
import mp3 from '../../media/mp3/sak.mp3';
import SingleSeason from '../SingleSeason';
import PageAudio from '../PageAudio';
import { useEffect } from 'react';

const Page = ({match, history}) => {

    const [isAuthorized, setIsAuthorized] = useState(true);
    // const [isUserLogged, setIsUserLogged] = useState(false);
    // żeby rozróżnić userPanel i adminChanges
    const [changes, setChanges] = useState('galery');
    const [animeData, setAnimeData] = useState({
        _id: 1,
        title: '',
        watchLink: '',
        seasons: [],
        images: {
            background: '',
            baner: '',
            mini: '',
            galeryImages: []
        },
        rate: [],
        likes: 0,
        info: {
            scenario: '',
            productionDate: '',
            duration: ''
        },
        soundtracks: [],
        types: [],
        description: {
            description: '',
            author: '',
        },
        comments: []
    });
    const [isFavoriteType, setIsFavoriteType] = useState(true);

    const handleMouseEnter = (e) => {
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

    const handleRemove = () => {
        console.log('usuwamy');
    }

    const handleChanges = (type) => {
        if (type === "galery") {
            setChanges('galery');
        } else if (type === "description") {
            setChanges('description');
        } else if (type === "soundtrack") {
            setChanges('soundtrack');
        } else if (type === "seasons") {
            setChanges('seasons');
        } else if (type === "info") {
            setChanges('info');
        }
        document.querySelector('.changes').classList.toggle('none');
    }

    const showRate = () => {
        if (animeData.rate.length > 0) {
            let rateValue = 0;
            animeData.rate.forEach(r => rateValue += r.value);
            const average = (rateValue / animeData.rate.length).toFixed(2);
            return average;
        } else {
            return 0;
        }
    }

    const callAPI = () => {
        fetch(`http://localhost:9000/anime/${match.params.anime}`)
            .then(res => res.json())
            .then(res => {
                setAnimeData(res);
            });
    }

    const seasonsList = animeData.seasons.map(s => <SingleSeason key={s.id} title={s.title} background={s.background} link={s.link} isAuthorized={isAuthorized} handleRemove={handleRemove} callAPI={callAPI}/>);

    const typesList = animeData.types.map(t => <Link to={`/types/${t.link}`} key={t.id} className="page__type">{t.name}</Link>);

    const imageGalery = animeData.images.galeryImages.map(i => (
        <div key={i.id} className="page__imageLink">
            {isAuthorized ? <div className="page__adminChanges">
                <RemoveRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={handleRemove}/>
            </div> : null}
            <div className="page__galeryImgWrapper">
                <img src={`http://localhost:9000/images/${i.img}`} alt={i.fromAnime} className="img" srl_gallery_image="true"/>
            </div>
        </div>
    ));

    const audioList = animeData.soundtracks.map(s => <PageAudio key={s.id} id={s.id} mp3={s.mp3} composer={s.composer} title={s.title} isAuthorized={isAuthorized} handleRemove={handleRemove}/>);

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
        window.location.reload();
    });

    useEffect(() => {
        callAPI();
        goUp();
    },[])

    return ( 
        <main className="main" style={{backgroundImage: `url(http://localhost:9000/images/${animeData.images.background.img})`, backgroundAttachment: "fixed", backgroundPosition: "center", backgroundSize: "cover"}}>
            <div className="curtain"></div>
            <LeftSide />
            <div className="page main__content scrollNav" data-id="1">
                <h2 className="page__title largeTitle">{animeData.title}</h2>
                <div className="page__content">
                    <div className="page__left">
                        <div className="page__imgWrapper">
                            <img src={`http://localhost:9000/images/${animeData.images.mini.img}`} alt="asdasd" className="img" />
                        </div>
                        <div className="page__info">
                            <div className="page__rate">
                                {isAuthorized ? <div className="page__adminChanges">
                                    <SettingsRoundedIcon className="page__adminIcon" onClick={() => {handleChanges("info")}}/>
                                </div> : null}
                                <StarRateRoundedIcon className="page__infoRateIcon" />
                                <p className="page__rateValue">{showRate()}</p>
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
                            {isAuthorized ? <UserRate /> : null}
                        </div>
                        <div className="page__galery">
                            {isAuthorized ? <div className="page__adminChanges">
                                <AddRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={() => {handleChanges("galery")}}/>
                            </div> : null}
                            <h3 className="page__galeryTitle mediumTitle">Galeria</h3>
                            <SRLWrapper>
                                {imageGalery}
                            </SRLWrapper>
                        </div>
                    </div>
                    <div className="page__right">
                        <div className="page__baner" style={{backgroundImage: `url(http://localhost:9000/images/${animeData.images.baner.img})`, backgroundPosition: "center", backgroundSize: "cover"}}>
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
                            {isFavoriteType ? <p className="page__banerRecommend" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>To anime może Ci się spodobać!</p> : null}
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
                                {typesList}
                            </div>
                        </div>
                        <div className="page__description scrollNav" data-id="3">
                            {animeData.description.description.includes('Lorem ipsum') ? <div className="page__adminChanges">
                                <SettingsRoundedIcon className="page__adminIcon" onClick={() => {handleChanges("description")}}/>
                            </div> : null}
                            <h3 className="page__descriptionTitle mediumTitle">Opis</h3>
                            <p className="page__descriptionText">
                                {animeData.description.description}
                                <span className="page__author">{animeData.description.author}</span>
                            </p>
                        </div>
                        <div className="page__audioInterface scrollNav" data-id="4">
                            {isAuthorized ? <div className="page__adminChanges">
                                <AddRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={() => {handleChanges("soundtrack")}}/>
                            </div> : null}
                            <h3 className="page__soundtrackTitle mediumTitle">Posłuchaj Soundtracku!</h3>
                            {audioList}
                        </div>
                        <div className="page__seasons scrollNav" data-id="5">
                            {isAuthorized ? <div className="page__adminChanges">
                                <AddRoundedIcon className="page__adminIcon page__adminIcon--border" onClick={() => {handleChanges("seasons")}}/>
                            </div> : null}
                            <h3 className="page__seasonsTitle mediumTitle">Powiązane Anime</h3>
                            {animeData.seasons.length > 0 ? seasonsList : null}
                        </div>
                    </div>
                </div>
                <Comments comments={animeData.comments} isAuthorized={isAuthorized} handleRemove={handleRemove}/>
                {isAuthorized || animeData.description.text.includes('Lorem ipsum') ? <Changes changes={changes}/> : null}
            </div>
            <RightSide />
        </main>
     );
}
 
export default withRouter(Page);