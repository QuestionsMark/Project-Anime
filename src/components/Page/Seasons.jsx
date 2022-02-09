import React from 'react';
import Popup from 'reactjs-popup';
import { AddRounded } from '@material-ui/icons';

import EditSeason from './PageEdit/EditSeason';
import SingleSeason from './SingleSeason';

import { useUser } from '../../contexts/UserProvider';

const Seasons = ({ id, seasons, getAnimeData }) => {

    const { authorization } = useUser();

    const seasonsList = () => {
        return seasons.map(s => <SingleSeason key={s.id} season={s} animeId={id} getAnimeData={getAnimeData}/>);
    };

    return ( 
        <div className="page__seasons scrollNav" data-id="5">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                <Popup modal nested closeOnDocumentClick={false} trigger={<AddRounded className="page__adminIcon page__adminIcon--border" />} on="click">
                    {close => <EditSeason close={close} id={id} getAnimeData={getAnimeData}/>}
                </Popup>
            </div> : null}
            <h3 className="page__seasonsTitle mediumTitle">Powiązane Anime</h3>
            {seasons.length !== 0 ? seasonsList() : 'Brak Sezonów lub innych powiązanych anime.'}
        </div>
     );
}
 
export default Seasons;