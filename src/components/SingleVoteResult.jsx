import React from 'react';

const SigleVoteResult = ({votesAmount, percent, title, color = '', isFail}) => {
    return ( 
        <div className="AOT__result">
            <p className="WTM__resultPercentCurtain" style={{width: percent}}></p>
            <p className="WTM__percent" style={{color: isFail ? '#d14141' : color}}>{percent}</p>
            <p className="WTM__percent" style={{color: isFail ? '#d14141' : color}}>{votesAmount}</p>
            <p className="WTM__resultTitle" style={{color: isFail ? '#d14141' : color}}>{title}</p>
        </div>
     );
}
 
export default SigleVoteResult;