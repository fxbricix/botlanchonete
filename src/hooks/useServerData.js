import { useState, useEffect } from 'react';
import { fetchServerData } from '../services/apiService.js';
import { formatLastUpdate } from '../utils/formatters.js';
import { config } from '../config/index.js';

/**
 * Hook para gerenciar dados do servidor
 */
export function useServerData() {
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const loadServerData = async () => {
    try {
      setError(null);
      const data = await fetchServerData();
      setServerData(data);
      setLastUpdate(formatLastUpdate());
    } catch (err) {
      console.error("Erro ao buscar dados do servidor:", err);

      // Verificar se é erro de CORS
      if (err.message.includes("CORS") || err.message.includes("Failed to fetch")) {
        setError(
          "⚠️ Erro de CORS: A API do DatHost pode não permitir acesso direto do browser. Verifique se o servidor permite requisições de origem cruzada."
        );
      } else {
        setError(
          `${err.message} - Verifique suas credenciais e ID do servidor.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setLoading(true);
    loadServerData();
  };

  useEffect(() => {
    loadServerData();

    const interval = setInterval(() => {
      loadServerData();
    }, Number(config.TRACK_INTERVAL_SEC) * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    serverData,
    loading,
    error,
    lastUpdate,
    refresh
  };
}
