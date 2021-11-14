import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';

import SingleImage from './SingleImage';

import { HOST_ADDRESS } from '../config';

const GaleryImages = ({history, match}) => {

    const [columns, setColumns] = useState(null);
    const [animeData, setAnimeData] = useState(null);
    const getAnime = async () => {
        const response = await fetch(`${HOST_ADDRESS}/anime/${match.params.animeID}`);
        if (response.ok) {
            const anime = await response.json();
            setAnimeData(anime);
        }
    };
    const handleGoBack = () => {
        history.goBack();
    };

    const sortFolders = () => {
        const columns = { column1: [], column2: [], column3: [], column4: [] };
        let counter = 1;
        animeData.images.galeryImages
            .forEach(i => {
                if (counter === 1) {
                    columns.column1.push(i);
                    counter++;
                } else if (counter === 2) {
                    columns.column2.push(i);
                    counter++;
                } else if (counter === 3) {
                    columns.column3.push(i);
                    counter++;
                } else if (counter === 4) {
                    columns.column4.push(i);
                    counter = 1;
                }
            });
        setColumns(columns);
    };

    const folderList = (images) => {
        return images.map(f => <SingleImage key={f.id} id={f.id} fromAnime={f.fromAnime}/>);
    };

    useEffect(() => {
        if(animeData) {
            sortFolders();
        }
    }, [animeData]);

    useEffect(() => {
        getAnime();
    }, [match]);

    return ( 
        <>
            {animeData ? <><div className="galery__goBack">
                <KeyboardArrowLeftRoundedIcon className="galery__goBackIcon" onClick={handleGoBack}/>
            </div>
            <h2 className="galery__title">{animeData.title}</h2>
            <div className="galery__imagesContainer">
                <div className="galery__folderColumn">
                    {columns ? folderList(columns.column1) : null}
                </div>
                <div className="galery__folderColumn">
                    {columns ? folderList(columns.column2) : null}
                </div>
                <div className="galery__folderColumn">
                    {columns ? folderList(columns.column3) : null}
                </div>
                <div className="galery__folderColumn">
                    {columns ? folderList(columns.column4) : null}
                </div>
            </div></> : null}
        </>
     );
}
 
export default withRouter(GaleryImages);