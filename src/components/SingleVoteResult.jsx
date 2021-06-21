import React from 'react'

const SigleVoteResult = ({percent, title, color = ''}) => {
    return ( 
        <div className="AOT__result">
            <span className="WTM__resultPercentCurtain" style={{width: percent}}></span>
            <p className="WTM__percent" style={{color: color}}>{percent}</p>
            <p className="WTM__resultTitle" style={{color: color}}>{title}</p>
        </div>
     );
}
 
export default SigleVoteResult;