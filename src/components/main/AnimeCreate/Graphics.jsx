import React from 'react';

import { SRLWrapper } from "simple-react-lightbox";

const Graphics = ({ mini, miniPreview, background, backgroundPreview, baner, banerPreview, handleChangeMini, handleChangeBackground, handleChangeBaner }) => {
    return ( 
        <SRLWrapper>
            <form className="create__images create__section">
                <h3 className="create__title">Grafiki</h3>
                <input type="file" id="mini" className="create__imageInp" onChange={handleChangeMini}/>
                <label htmlFor="mini" className="create__imageLabel">Wybierz Miniaturę</label>
                {mini ? <div className="create__preview">
                    <p className="changes__size" style={{color: miniPreview.size < 0.524288 ? '#5ec45e' : '#d14141'}}>{miniPreview.size.toFixed(2)} MB {miniPreview.size < 0.524288 ? 'OK' : 'Plik jest za duży!'}</p>
                    <div className="create__preview-img create__preview-img--square" style={{ backgroundImage: `url(${miniPreview.url})` }}/>
                </div> : null}
                <input type="file" id="background" className="create__imageInp" onChange={handleChangeBackground}/>
                <label htmlFor="background" className="create__imageLabel">Wybierz Tło</label>
                {background ? <div className="create__preview">
                    <p className="changes__size" style={{color: backgroundPreview.size < 3.145728 ? '#5ec45e' : '#d14141'}}>{backgroundPreview.size.toFixed(2)} MB {backgroundPreview.size < 3.145728 ? 'OK' : 'Plik jest za duży!'}</p>
                    <div className="create__preview-img create__preview-img--background" style={{ backgroundImage: `url(${backgroundPreview.url})` }}/>
                </div> : null}
                <input type="file" id="baner" className="create__imageInp" onChange={handleChangeBaner}/>
                <label htmlFor="baner" className="create__imageLabel">Wybierz Baner</label>
                {baner ? <div className="create__preview">
                    <p className="changes__size" style={{color: banerPreview.size < 3.145728 ? '#5ec45e' : '#d14141'}}>{banerPreview.size.toFixed(2)} MB {banerPreview.size < 3.145728 ? 'OK' : 'Plik jest za duży!'}</p>
                    <div className="create__preview-img create__preview-img--background" style={{ backgroundImage: `url(${banerPreview.url})` }}/>
                </div> : null}
            </form>
        </SRLWrapper>
     );
}
 
export default Graphics;