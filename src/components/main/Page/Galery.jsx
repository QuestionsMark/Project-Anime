import React from 'react';
import Popup from 'reactjs-popup';
import { SRLWrapper } from 'simple-react-lightbox';

import AddRoundedIcon from '@material-ui/icons/AddRounded';

import ChangesGalery from '../../ChangesGalery';
import SingleGaleryImage from '../../SingleGaleryImage';

import { useUser } from '../../../contexts/UserProvider';

const Galery = ({ id, images, getAnimeData }) => {

    const { authorization } = useUser();

    const imagesList = () => {
        return images.galeryImages.map(i => <SingleGaleryImage key={i.id} image={i} animeId={id} getAnimeData={getAnimeData}/>);
    };

    return ( 
        <div className="page__galery">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                <Popup modal nested closeOnDocumentClick={false} trigger={<AddRoundedIcon className="page__adminIcon page__adminIcon--border" />} on="click">
                    {close => <ChangesGalery close={close} id={id} getAnimeData={getAnimeData}/>}
                </Popup>
            </div> : null}
            <h3 className="page__galeryTitle mediumTitle">Galeria</h3>
            <SRLWrapper>
                {imagesList()}
            </SRLWrapper>
        </div>
     );
}
 
export default Galery;