import React, { useState, useEffect } from "react";
import "./index.css";

// Função para formatar o local (igual ao bot original)
function formatLocation(loc) {
  if (!loc) return "";
  if (loc.toLowerCase() === "sao_paulo") return "São Paulo";
  return loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();
}

// Função para formatar o timestamp
function formatLastUpdate() {
  return new Date().toLocaleString("pt-BR");
}

function App() {
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Configurações do ambiente (equivalente às variáveis do .env)
  const config = {
    DAT_HOST_EMAIL: import.meta.env.VITE_DAT_HOST_EMAIL,
    DAT_HOST_PASSWORD: import.meta.env.VITE_DAT_HOST_PASSWORD,
    TRACK_SERVER_ID: import.meta.env.VITE_TRACK_SERVER_ID,
    TRACK_INTERVAL_SEC: import.meta.env.VITE_TRACK_INTERVAL_SEC || 30,
    SERVER_IP: import.meta.env.VITE_SERVER_IP || "lanches.dat.gg:26088",
  };

  // Verificar se as configurações necessárias estão presentes
  const isConfigured =
    config.DAT_HOST_EMAIL && config.DAT_HOST_PASSWORD && config.TRACK_SERVER_ID;

  // Função para buscar dados do servidor
  const fetchServerData = async () => {
    if (!isConfigured) {
      setError("Configuração incompleta. Verifique as variáveis de ambiente.");
      setLoading(false);
      return;
    }

    try {
      setError(null);

      // Monta cabeçalho Basic Auth para DatHost
      const dhToken = btoa(
        `${config.DAT_HOST_EMAIL}:${config.DAT_HOST_PASSWORD}`
      );

      console.log("Fazendo requisição para DatHost...");

      // URL para requisição (usa proxy em desenvolvimento)
      const isDev = import.meta.env.DEV;
      const apiUrl = isDev
        ? `/api/0.1/game-servers/${config.TRACK_SERVER_ID}`
        : `https://dathost.net/api/0.1/game-servers/${config.TRACK_SERVER_ID}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Basic ${dhToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      console.log("Resposta recebida:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro na resposta:", errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      setServerData(data);
      setLastUpdate(formatLastUpdate());
    } catch (err) {
      console.error("Erro ao buscar dados do servidor:", err);

      // Verificar se é erro de CORS
      if (
        err.message.includes("CORS") ||
        err.message.includes("Failed to fetch")
      ) {
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

  // Efeito para buscar dados iniciais e configurar intervalo
  useEffect(() => {
    if (isConfigured) {
      fetchServerData();

      const interval = setInterval(
        fetchServerData,
        Number(config.TRACK_INTERVAL_SEC) * 1000
      );

      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [isConfigured]);

  // Função para recarregar manualmente
  const handleRefresh = () => {
    setLoading(true);
    fetchServerData();
  };

  // Função para conectar via Steam
  const handleConnectSteam = () => {
    const steamUrl = `steam://run/730//+${config.SERVER_IP}`;
    window.open(steamUrl, "_blank");
  };

  // Se não está configurado, mostrar instruções
  if (!isConfigured) {
    return (
      <div className="app">
        <div className="server-card">
          <h1 className="server-title">⚙️ Configuração Necessária</h1>
          <div className="error">
            <p>
              Para usar esta aplicação, você precisa configurar as variáveis de
              ambiente:
            </p>
            <ul style={{ textAlign: "left", marginTop: "15px" }}>
              <li>VITE_DAT_HOST_EMAIL</li>
              <li>VITE_DAT_HOST_PASSWORD</li>
              <li>VITE_TRACK_SERVER_ID</li>
            </ul>
            <p style={{ marginTop: "15px" }}>
              Consulte o README.md para instruções detalhadas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !serverData) {
    return (
      <div className="app">
        <div className="server-card">
          <div className="loading">
            🔄 Carregando informações do servidor...
          </div>
        </div>
      </div>
    );
  }

  if (error && !serverData) {
    return (
      <div className="app">
        <div className="server-card">
          <div className="error">
            ❌ Erro ao carregar dados: {error}
            <br />
            <button className="refresh-button" onClick={handleRefresh}>
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!serverData) {
    return (
      <div className="app">
        <div className="server-card">
          <div className="error">⚠️ Nenhum dado do servidor disponível</div>
        </div>
      </div>
    );
  }

  const { name, game, location, status, on } = serverData;

  // Filtra status relevantes (igual ao bot original)
  const relevantStatus =
    status?.filter(
      (s) => s.key !== "Players" && s.value !== "0" && s.value !== 0
    ) || [];

  return (
    <div className="app">
      <div className="server-card">
        <h1 className="server-title">
          🖥️ {name}
          <span
            className={`status-indicator ${
              on ? "status-online" : "status-offline"
            }`}
          ></span>
        </h1>

        <div className="server-info">
          <div className="info-item">
            <div className="info-label">Game</div>
            <div className="info-value">{String(game).toUpperCase()}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Local</div>
            <div className="info-value">{formatLocation(location)}</div>
          </div>

          <div className="info-item">
            <div className="info-label">Status</div>
            <div className="info-value">{on ? "Online" : "Offline"}</div>
          </div>

          {relevantStatus.map((s, index) => (
            <div key={index} className="info-item">
              <div className="info-label">{s.key}</div>
              <div className="info-value">{s.value}</div>
            </div>
          ))}
        </div>

        {lastUpdate && (
          <div className="last-update">Última atualização: {lastUpdate}</div>
        )}

        <div className="connect-section">
          <div className="connect-title">Para conectar:</div>
          <div
            className="connect-command"
            onClick={() =>
              navigator.clipboard?.writeText(`connect ${config.SERVER_IP}`)
            }
            title="Clique para copiar"
          >
            connect {config.SERVER_IP}
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
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? "🔄 Atualizando..." : "🔄 Atualizar Agora"}
          </button>
        </div>

        <div style={{ marginTop: "15px", fontSize: "0.8em", color: "#ffd700" }}>
          Atualiza automaticamente a cada {config.TRACK_INTERVAL_SEC}s
        </div>
      </div>
    </div>
  );
}

export default App;
