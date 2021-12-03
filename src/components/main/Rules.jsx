import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

import setMain from '../../utils/setMain';

const Rules = ({main, history, match}) => {

    const goUp = history.listen(() => {
        window.scrollTo(0, 0);
    });
    useEffect(() => {
        goUp();
        setMain(main, match);
    }, [match]);

    return ( 
        <div className="rules main__content">
            <h2 className="rules__title largeTitle scrollNav" data-id="4">Regulamin</h2>
            <p className="rules__content">
                <span className="rules__rule">1. Nie robić syfu, chyba że o to poproszę!</span>
                <span className="rules__rule">2. W sumie to tyle, bo mi się nie chcę pisać, a poza tym i tak nikt by tego nie przeczytał więc kekw.</span>
                <span className="rules__rule">3. A dalej to już wiadomo, nasz kochany "Lorem Ipsum".</span>
                <span className="rules__rule">4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
                <span className="rules__rule">5. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
                <span className="rules__rule">6. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
                <span className="rules__rule">7. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
                <span className="rules__rule">8. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
                <span className="rules__rule">9. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
                <span className="rules__rule">10. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
                <span className="rules__rule">11. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
                <span className="rules__rule">12. Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident modi, quis, nihil, possimus in sint iusto nulla repellendus praesentium adipisci cumque est vel eum quaerat illo ipsam dignissimos quasi dolore?</span>
            </p>
        </div>
     );
}
 
export default withRouter(Rules);