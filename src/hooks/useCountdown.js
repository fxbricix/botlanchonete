import { useState, useEffect } from 'react';
import { config } from '../config/index';

/**
 * Hook para gerenciar countdown de atualização
 */
export function useCountdown(resetTrigger) {
  const [countdown, setCountdown] = useState(Number(config.TRACK_INTERVAL_SEC));

  useEffect(() => {
    setCountdown(Number(config.TRACK_INTERVAL_SEC));
  }, [resetTrigger]);

  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : Number(config.TRACK_INTERVAL_SEC)));
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countdown]);

  return countdown;
}
