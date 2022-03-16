import { useEffect, useState } from 'react';
import axios from 'axios';
import { HOST_ADDRESS } from '../config';

export default function useSearch(collection, searchPhrase, page, changedData, wantTypes, dontWantTypes, sort, kind, minRate, maxRate) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [amount, setAmount] = useState(0);

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
                setLoading(false);
                setData(prev => [...prev, ...res.data.results]);
                setHasMore(res.data.results.length > 0);
                if (res.data.results.length === 0) {
                    if (data.length === 0) {
                        setError({ message: "Nie znalazłam nic co by pasowało..." });
                    } else {
                        setError({ message: "Niestety nie znalazłam nic więcej..." });
                    }
                }
                setAmount(res.data.amount);
            })
            .catch(e => {
                if (axios.isCancel(e)) return;
                setError({ message: 'O nie!@! Coś poszło nie tak!' });
            });
        return () => cancel();
    }, [changedData, searchPhrase, wantTypes, dontWantTypes, sort, kind, minRate, maxRate, page, collection]);

    return { loading, error, data, hasMore, amount };
}