import React from 'react';
import Popup from 'reactjs-popup';

import { AddRounded } from '@material-ui/icons';

import PageAudio from './PageAudio';
import EditSoundtrack from './PageEdit/EditSoundtrack';

import { useUser } from '../../contexts/UserProvider';

const Soundtracks = ({ id, soundtracks, getAnimeData }) => {

    const { authorization } = useUser();

    const audioList = () => {
        return soundtracks.map(s => <PageAudio key={s.id} soundtrack={s} animeId={id} getAnimeData={getAnimeData}/>);
    };

    return ( 
        <div className="page__audioInterface scrollNav" data-id="4">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                <Popup modal nested closeOnDocumentClick={false} trigger={<AddRounded className="page__adminIcon page__adminIcon--border" />} on="click">
                    {close => <EditSoundtrack close={close} id={id} getAnimeData={getAnimeData}/>}
                </Popup>
            </div> : null}
            <h3 className="page__soundtrackTitle mediumTitle">Posłuchaj Soundtracku!</h3>
            {soundtracks.length > 0 ?  audioList() : <p className="page__text">Brak soundtrackó.</p>}
        </div>
     );
}
 
export default Soundtracks;