import React from 'react';
import Popup from 'reactjs-popup';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import ChangesInfo from '../../ChangesInfo';
import UserRate from '../../UserRate';

import { useUser } from '../../../contexts/UserProvider';

const Info = ({ id, rate, info, likes, getAnimeData }) => {

    const { status, authorization } = useUser();

    const showRate = () => {
        if (rate.length > 0) {
            let rateValue = 0;
            rate.forEach(r => rateValue += r.rate);
            const average = (rateValue / rate.length).toFixed(2);
            return average;
        }
        return 0;
    };

    const rateAmountText = () => {
        if (rate.length === 1) return 'głos';
        if (rate.length === 0 || rate.length > 4) return 'głosów';
        return 'głosy';
    };

    return ( 
        <div className="page__info">
            <div className="page__rate">
                {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                    <Popup modal nested closeOnDocumentClick={false} trigger={<SettingsRoundedIcon className="page__adminIcon" />} on="click">
                        {close => <ChangesInfo close={close} id={id} getAnimeData={getAnimeData}/>}
                    </Popup>
                </div> : null}
                <StarRateRoundedIcon className="page__infoRateIcon" />
                <p className="page__rateValue">{showRate()}</p>
                <p className="page__rateAmount">{rate.length} {rateAmountText()}</p>
            </div>
            <div className="page__properties">
                <p className="page__scenario page__inf">{info.scenario}</p>
                <p className="page__productionDate page__inf">{info.productionDate}</p>
                <p className="page__duration page__inf">{info.duration}</p>
                <div className="page__favoriteAnime">
                    <FavoriteBorderRoundedIcon className="page__favoriteAnimeIcon" />
                    <p className="page__favoriteAnimeText">{likes.length} Adoratorów!</p>
                    <FavoriteBorderRoundedIcon className="page__favoriteAnimeIcon" />
                </div>
            </div>
            {status ? <UserRate id={id} rate={rate} getAnimeData={getAnimeData}/> : null}
        </div>
     );
}
 
export default Info;