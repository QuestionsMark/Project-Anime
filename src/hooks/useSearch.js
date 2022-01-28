import { useEffect, useState } from 'react';
import axios from 'axios';
import { HOST_ADDRESS } from '../config';

export default function useSearch(collection, searchPhrase, page, changedData, wantTypes, dontWantTypes, sort, kind, minRate, maxRate) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setData([]);
    }, [changedData, searchPhrase, wantTypes, dontWantTypes, sort, kind, minRate, maxRate]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        let cancel;
        axios({
            method: 'GET',
            url: `${HOST_ADDRESS}/${collection}`,
            params: {
                search: searchPhrase,
                page,
                wantTypes,
                dontWantTypes,
                sort,
                kind,
                minRate,
                maxRate,
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
    }, [changedData, searchPhrase, wantTypes, dontWantTypes, sort, kind, minRate, maxRate, page, collection]);

    return { loading, error, data, hasMore };
}