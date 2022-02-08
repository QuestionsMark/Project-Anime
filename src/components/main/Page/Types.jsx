import React, { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../contexts/UserProvider';

const Types = ({ types }) => {

    const { user } = useUser();

    const typesList = useCallback(() => {
        const isFavoriteType = (type) => {
            if (!user) return '';
            return user.favoriteType === type.name ? 'page__type--fav' : '';
        };
        return types.map(t => <Link to={`/types/${t.name}`} key={t.id} className={`page__type ${isFavoriteType(t)}`}>{t.name}</Link>);
    }, [types, user]);

    const typesListComponent = useMemo(() => typesList(), [typesList]);

    return ( 
        <div className="page__types scrollNav" data-id="2">
            <div className="page__typesList">
                {typesListComponent}
            </div>
        </div>
     );
}
 
export default Types;