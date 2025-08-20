import { useState, useEffect } from 'react';
import { fetchRanksData } from '../services/apiService';

/**
 * Hook para gerenciar dados dos ranques
 */
export function useRanksData() {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRanksData()
      .then((data) => {
        setRanks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(`Erro ao buscar dados: ${err.message}`);
        setLoading(false);
      });
  }, []);

  return { ranks, loading, error };
}
