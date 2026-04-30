import { useEffect, useState } from 'react';

export function useMint(id) {
  const [mint, setMint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setMint(null);

    fetch(`/data/${id}.json`)
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

    fetch('/data/index.json')
      .then((r) => r.json())
      .then((ids) =>
        Promise.all(
          ids.map((id) => fetch(`/data/${id}.json`).then((r) => r.json()))
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
