import { useEffect, useState } from "react";
import axios from "axios";
const currencyConverter = (...args) => {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(...args);
};

const nameConverter = (args) => {
  return Object.values(args.name[0]).slice(0, -1).join("");
};
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useUserSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://localhost:5000/api/posts`,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setUsers((prevUsers) => {
          return [
            ...new Set([...prevUsers, ...res.data.map((p) => p.postBody)]),
          ];
        });
        setHasMore(res.data > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  useEffect(() => {
    setUsers([]);
  });

  return { loading, error, users, hasMore };
};
export { currencyConverter, nameConverter, fetcher, useUserSearch };
