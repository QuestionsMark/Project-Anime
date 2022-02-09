import React from 'react';

import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

import Audio from '../Audio';

const Soundtrack = ({ soundtrack, soundtrackPreview, soundtrackTitle, composer, handleInfChange, handleChangeSoundtrack, handleRemoveSoundtrack }) => {
    return ( 
        <form className="create__soundtrack create__section">
            <h3 className="create__title">*Soundtrack</h3>
            <input type="file" id="music" className="create__soundtrackInp" onChange={handleChangeSoundtrack}/>
            <label htmlFor="music" className="create__imageLabel">Soundtrack</label>
            {soundtrack ? <div className="create__preview">
                <p className="changes__size" style={{color: soundtrackPreview.size < 8.388608 ? '#5ec45e' : '#d14141'}}>{soundtrackPreview.size.toFixed(2)} MB {soundtrackPreview.size < 8.388608 ? 'OK' : 'Plik jest za duży!'}</p>
                <Audio id={soundtrackPreview.url} isUrl={true}/>
                <RemoveRoundedIcon className="create__delete-icon" onClick={handleRemoveSoundtrack}/>
            </div> : null}
            <input type="text" className="create__composerInp create__inputText" placeholder="Kompozytor" value={composer} onChange={(e) => {handleInfChange("composer", e)}}/>
            <input type="text" className="create__soundtrackTitle create__inputText" placeholder="Tytuł utworu" value={soundtrackTitle} onChange={(e) => {handleInfChange("soundtrackTitle", e)}}/>
        </form>
     );
}
 
export default Soundtrack;