import React from 'react'

const SigleVoteResult = ({votesAmount, percent, title, color = ''}) => {
    return ( 
        <div className="AOT__result">
            <p className="WTM__resultPercentCurtain" style={{width: percent}}></p>
            <p className="WTM__percent" style={{color: color}}>{percent}</p>
            <p className="WTM__percent" style={{color: color}}>{votesAmount}</p>
            <p className="WTM__resultTitle" style={{color: color}}>{title}</p>
        </div>
     );
}
 
export default SigleVoteResult;