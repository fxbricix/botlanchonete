import { useState, useEffect } from "react";
import { fetchLastMatches } from "../services/apiService.js";

export function useLastMatchesData() {
  const [lastMatches, setLastMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLastMatches = async () => {
    try {
      setError(null);
      const data = await fetchLastMatches();
      console.debug("useLastMatchesData: resposta recebida:", data);
      setLastMatches(data);
    } catch (err) {
      console.error("Erro ao buscar last matches:", err);
      setError(err instanceof Error ? err.message : String(err));
      setLastMatches(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLastMatches();
  }, []);

  return {
    lastMatches,
    loading,
    error,
  };
}
