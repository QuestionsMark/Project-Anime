import React, { useRef } from 'react';

import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import FullscreenRoundedIcon from '@material-ui/icons/FullscreenRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';

import { useUser } from '../../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../../config';

const Baner = ({ images, title, watchLink, info, types, rate }) => {

    const effectRef = useRef();
    const { user } = useUser();

    const isFavoriteType = () => types.findIndex(t => t.name === user.favoriteType) !== -1;

    const handleMouseEnter = () => {
        const icons = document.querySelectorAll('.page__banerIcon');
        effectRef.current.classList.add('page__effect--hover');
        icons.forEach(i => {
            i.classList.add('page__banerIcon--hover');
        })
    };
    const handleMouseLeave = () => {
        const icons = document.querySelectorAll('.page__banerIcon');
        effectRef.current.classList.remove('page__effect--hover');
        icons.forEach(i => {
            i.classList.remove('page__banerIcon--hover');
        })
    };

    const showRate = () => {
        if (rate.length > 0) {
            let rateValue = 0;
            rate.forEach(r => rateValue += r.rate);
            const average = (rateValue / rate.length).toFixed(2);
            return average;
        }
        return 0;
    };

    return ( 
        <div className="page__baner" style={{backgroundImage: `url(${HOST_ADDRESS}/images/${images.baner.id})`}}>
            <div className="page__effect" ref={effectRef}>
                <a href={watchLink} target="_blank" rel="noreferrer" className="page__banerIcon watchLink"><PlayCircleOutlineRoundedIcon className="watchIcon"/></a>
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
            {isFavoriteType() ? <p className="page__banerRecommend" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>To anime może Ci się spodobać!</p> : null}
            <h3 className="page__banerTitle" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{title}</h3>
            <p className="page__banerInfo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <span className="page__banerInf">{info.scenario}</span>
                <span className="page__banerInf">{info.productionDate}</span>
                <span className="page__banerInf">{info.duration}</span>
            </p>
            <div className="page__banerRate" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <StarRateRoundedIcon className="page__banerRateIcon" />
                <p className="page__banerRateValue">{showRate()}</p>
            </div>
        </div>
     );
}
 
export default Baner;