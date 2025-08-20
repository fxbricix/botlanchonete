import React from "react";
import { playC4Sound } from "../services/audioService";
import { config } from "../config/index";

/**
 * Componente para seção de conexão
 */
export function ConnectSection({ serverData, loading, onRefresh }) {
  const handleConnectSteam = async () => {
    await playC4Sound();

    // Pequeno delay antes de abrir o Steam
    setTimeout(() => {
      const steamUrl = `steam://run/730//+connect ${config.SERVER_IP}`;
      window.open(steamUrl, "_blank");
    }, 100);
  };

  const handleCopyCommand = () => {
    const command = `connect ${serverData.custom_domain}:${serverData.ports.game}`;
    navigator.clipboard?.writeText(command);
  };

  return (
    <>
      <div className="connect-section">
        <div className="connect-title">Para conectar:</div>
        <div
          className="connect-command"
          onClick={handleCopyCommand}
          title="Clique para copiar"
        >
          connect {serverData.custom_domain}:{serverData.ports.game}
        </div>
      </div>

      <div className="button-container">
        <button
          className="connect-button"
          onClick={handleConnectSteam}
          title="Conectar diretamente via Steam"
        >
          🎮 Conectar via Steam
        </button>

        <button
          className="refresh-button"
          onClick={onRefresh}
          disabled={loading}
        >
          {loading ? "🔄 Atualizando..." : "🔄 Atualizar"}
        </button>
      </div>
    </>
  );
}
