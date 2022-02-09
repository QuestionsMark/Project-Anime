import React from 'react';
import Popup from 'reactjs-popup';
import { SRLWrapper } from 'simple-react-lightbox';

import { AddRounded } from '@material-ui/icons';

import EditGalery from './PageEdit/EditGalery';
import SingleGaleryImage from './SingleGaleryImage';

import { useUser } from '../../contexts/UserProvider';

const Galery = ({ id, images, getAnimeData }) => {

    const { authorization } = useUser();

    const imagesList = () => {
        return images.galeryImages.map(i => <SingleGaleryImage key={i.id} image={i} animeId={id} getAnimeData={getAnimeData}/>);
    };

    return ( 
        <div className="page__galery">
            {authorization === '2' || authorization === '3' ? <div className="page__adminChanges">
                <Popup modal nested closeOnDocumentClick={false} trigger={<AddRounded className="page__adminIcon page__adminIcon--border" />} on="click">
                    {close => <EditGalery close={close} id={id} getAnimeData={getAnimeData}/>}
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