import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { HOST_ADDRESS, HOST_ADDRESS_PLANET_DEFENCE } from '../config';

export default function useGameSearch(game, collection, page, sort) {

    const getHost = useCallback(() => {
        switch (game) {
            case 'city-defence':
                return HOST_ADDRESS_PLANET_DEFENCE;

            case 'saoc':
                return HOST_ADDRESS;

            default:
                return;
        }
    }, [game]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setData([]);
    }, [sort]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        let cancel;
        axios({
            method: 'GET',
            url: `${getHost()}/${collection}`,
            params: {
                page,
                sort
            },
            cancelToken: new axios.CancelToken(c => cancel = c),
        })
            .then(res => {
                setData(prev => [...prev, ...res.data]);
                setHasMore(res.data.length > 0);
                if (res.data.length === 0) {
                    if (data.length === 0) {
                        setError({ message: "Nie znalazłam nic co by pasowało..." });
                    } else {
                        setError({ message: "Niestety nie znalazłam nic więcej..." });
                    }
                }
                setLoading(false);
            })
            .catch(e => {
                if (axios.isCancel(e)) return;
                setError({ message: e.message });
            });
        return () => cancel();
    }, [collection, getHost, page, sort]);

    return { loading, error, data, hasMore };
}