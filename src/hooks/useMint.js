import { useEffect, useState } from 'react';

const BASE = import.meta.env.BASE_URL; // e.g. "/Mentholove/" in prod, "/" in dev
const dataUrl = (path) => `${BASE}data/${path}`.replace(/\/{2,}/g, '/');

export function useMint(id) {
  const [mint, setMint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setMint(null);

    fetch(dataUrl(`${id}.json`))
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to fetch mint ${id}`);
        return r.json();
      })
      .then((data) => {
        if (!cancelled) {
          setMint(data);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { mint, loading, error };
}

export function useMintList() {
  const [mints, setMints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(dataUrl('index.json'))
      .then((r) => r.json())
      .then((ids) =>
        Promise.all(
          ids.map((id) => fetch(dataUrl(`${id}.json`)).then((r) => r.json()))
        )
      )
      .then((all) => {
        if (!cancelled) {
          setMints(all);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { mints, loading, error };
}
