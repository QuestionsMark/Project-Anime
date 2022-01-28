import React from 'react';

const Info = ({ scenario, productionDate, kind, episodesAmount, episodeDuration, hours, minutes, handleInfChange }) => {
    return ( 
        <div className="create__info create__section">
            <h3 className="create__title">Informacje</h3>
            <input type="text" className="create__scenarioInp create__inputText" placeholder="scenariusz" value={scenario} onChange={(e) => {handleInfChange("scenario", e)}}/>
            <input type="text" className="create__productionDateInp create__inputText" placeholder="Rok produkcji" value={productionDate} onChange={(e) => {handleInfChange("productionDate", e)}}/>
            {kind === "series" ? 
            <div className="create__seriesKind">
                <input type="text" className="create__duration1Inp create__inputText" placeholder="Ilość odcinków" value={episodesAmount} onChange={(e) => {handleInfChange("episodesValue", e)}}/>
                <input type="text" className="create__duration2Inp create__inputText" placeholder="Czas trwania odcinka w min" value={episodeDuration} onChange={(e) => {handleInfChange("episodeDuration", e)}}/>
            </div>
            :
            <div className="create__seriesKind">
                <input type="text" className="create__duration1Inp create__inputText" placeholder="Ilość godzin" value={hours} onChange={(e) => {handleInfChange("hoursValue", e)}}/>
                <input type="text" className="create__duration2Inp create__inputText" placeholder="Ilość minut" value={minutes} onChange={(e) => {handleInfChange("minutesValue", e)}}/>
            </div> }
        </div>
     );
}
 
export default Info;