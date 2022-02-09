import React, { useRef } from 'react';

import {
    PlayCircleOutlineRounded,
    ArrowBackIosRounded,
    PlayArrowRounded,
    VolumeUpRounded,
    FullscreenRounded,
    StarRateRounded
} from '@material-ui/icons';

import { useUser } from '../../contexts/UserProvider';
import { HOST_ADDRESS } from '../../config';

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
                <a href={watchLink} target="_blank" rel="noreferrer" className="page__banerIcon watchLink"><PlayCircleOutlineRounded className="watchIcon"/></a>
                <ArrowBackIosRounded className="page__banerIcon corner1Icon"/>
                <ArrowBackIosRounded className="page__banerIcon corner2Icon"/>
                <ArrowBackIosRounded className="page__banerIcon corner3Icon"/>
                <ArrowBackIosRounded className="page__banerIcon corner4Icon"/>
                <PlayArrowRounded className="page__banerIcon playIcon"/>
                <VolumeUpRounded className="page__banerIcon volumeIcon"/>
                <div className="page__banerIcon lineIcon"></div>
                <div className="page__banerIcon dotIcon"></div>
                <FullscreenRounded className="page__banerIcon fullScreenIcon"/>
            </div>
            {isFavoriteType() ? <p className="page__banerRecommend" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>To anime może Ci się spodobać!</p> : null}
            <h3 className="page__banerTitle" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{title}</h3>
            <p className="page__banerInfo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <span className="page__banerInf">{info.scenario}</span>
                <span className="page__banerInf">{info.productionDate}</span>
                <span className="page__banerInf">{info.duration}</span>
            </p>
            <div className="page__banerRate" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <StarRateRounded className="page__banerRateIcon" />
                <p className="page__banerRateValue">{showRate()}</p>
            </div>
        </div>
     );
}
 
export default Baner;