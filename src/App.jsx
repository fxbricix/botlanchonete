import React, { useState, useEffect } from "react";
import "./rankcard.css";
import c4Sound from "./c4.mp3"; // Importa o áudio

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

// Função para encontrar o mapa atual nos dados do status
function getCurrentMap(status) {
  if (!status || !Array.isArray(status)) return null;

  const mapStatus = status.find(
    (s) =>
      (s.key && s.key.toLowerCase().includes("map")) ||
      s.key === "Current Map" ||
      s.key === "Map"
  );

  return mapStatus ? mapStatus.value : null;
}

// Função para gerar a URL da imagem do mapa
function getMapImageUrl(mapName) {
  if (!mapName) return null;

  // Lista de mapas disponíveis na pasta imgs
  const availableMaps = [
    "de_ancient.png",
    "de_anubis.png",
    "de_cbble.png",
    "de_dust2.png",
    "de_inferno.png",
    "de_mirage.png",
    "de_nuke.png",
    "de_overpass.png",
    "de_train.png",
    "de_vertigo.png",
    "de_ancient_night.png",
    "de_cache.png",
  ];

  // Normaliza o nome do mapa
  const normalizedMapName = mapName.toLowerCase();

  // Primeiro tenta encontrar o mapa exato na lista
  const exactMatch = availableMaps.find(
    (map) =>
      map.toLowerCase().replace(".png", "") === normalizedMapName ||
      map.toLowerCase().replace(".png", "").replace("de_", "") ===
        normalizedMapName
  );

  if (exactMatch) {
    return `/botlanchonete/imgs/${exactMatch}`;
  }

  // Se não encontrar, tenta com prefixo de_
  const withPrefix = availableMaps.find(
    (map) => map.toLowerCase().replace(".png", "") === `de_${normalizedMapName}`
  );

  if (withPrefix) {
    return `/botlanchonete/imgs/${withPrefix}`;
  }

  return null;
}

function App() {
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [countdown, setCountdown] = useState(30); // Contador regressivo

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

      // URL para requisição (usa proxy em desenvolvimento e produção)
      const isDev = import.meta.env.DEV;

      let apiUrl;
      let headers;

      if (isDev) {
        // Desenvolvimento: usa proxy do Vite
        apiUrl = `/api/0.1/game-servers/${config.TRACK_SERVER_ID}`;
        headers = {
          Authorization: `Basic ${dhToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
      } else {
        // Produção: usar um proxy CORS diferente
        apiUrl = `https://corsproxy.io/?${encodeURIComponent(
          `https://dathost.net/api/0.1/game-servers/${config.TRACK_SERVER_ID}`
        )}`;
        headers = {
          Authorization: `Basic ${dhToken}`,
          Accept: "application/json",
        };
      }

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
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
      setCountdown(Number(config.TRACK_INTERVAL_SEC)); // Reseta countdown

      const interval = setInterval(() => {
        fetchServerData();
        setCountdown(Number(config.TRACK_INTERVAL_SEC)); // Reseta countdown a cada busca
      }, Number(config.TRACK_INTERVAL_SEC) * 1000);

      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [isConfigured]);

  // Efeito para countdown regressivo
  useEffect(() => {
    if (isConfigured && countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [isConfigured, countdown]);

  // Função para recarregar manualmente
  const handleRefresh = () => {
    setLoading(true);
    setCountdown(Number(config.TRACK_INTERVAL_SEC)); // Reseta countdown
    fetchServerData();
  };

  // Função para conectar via Steam
  const handleConnectSteam = () => {
    console.log("Botão CONECTAR STEAM clicado!"); // Debug

    // Toca o som c4.mp3 usando import (funciona em dev e produção)
    try {
      const audio = new Audio(c4Sound);
      audio.volume = 0.2; // Volume baixo (20%)

      console.log("Tentando reproduzir áudio importado..."); // Debug

      // Força a reprodução
      audio
        .play()
        .then(() => {
          console.log("✅ Áudio reproduzido com sucesso!");
        })
        .catch((error) => {
          console.log("❌ Erro ao reproduzir áudio importado:", error);

          // Fallback: tenta os caminhos considerando GitHub Pages
          console.log("Tentando fallback para GitHub Pages...");

          // Detecta se está em produção (GitHub Pages) ou desenvolvimento
          const isDev = import.meta.env.DEV;
          const basePath = isDev ? "" : "/botlanchonete";

          const audio2 = new Audio(`${basePath}/audio/c4.mp3`);
          audio2.volume = 0.2; // Mesmo volume no fallback

          audio2
            .play()
            .then(() => {
              console.log("✅ Fallback funcionou!");
            })
            .catch((error2) => {
              console.log("❌ Fallback também falhou:", error2);

              // Último fallback: tenta URL completa
              const audio3 = new Audio(
                `${window.location.origin}${basePath}/audio/c4.mp3`
              );
              audio3.volume = 0.2;

              audio3
                .play()
                .then(() => console.log("✅ URL completa funcionou!"))
                .catch((error3) =>
                  console.log("❌ Todos os métodos falharam:", error3)
                );
            });
        });
    } catch (error) {
      console.log("❌ Erro ao criar objeto Audio:", error);
    }

    // Pequeno delay antes de abrir o Steam
    setTimeout(() => {
      const steamUrl = `steam://run/730//+connect ${config.SERVER_IP}`;
      window.open(steamUrl, "_blank");
    }, 100);
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

  // Encontra o mapa atual
  const currentMap = getCurrentMap(status);
  const mapImageUrl = getMapImageUrl(currentMap);

  // Filtra status relevantes (igual ao bot original) - agora exclui também o mapa
  const relevantStatus =
    status?.filter(
      (s) =>
        s.key && // Garantir que existe uma key
        s.key !== "Players" &&
        s.value !== undefined &&
        s.value !== null &&
        s.value !== "" &&
        !s.key.toLowerCase().includes("map")
    ) || [];

  return (
    <div className="app">
      <div className={`server-card ${on ? "" : "server-card-offline"}`}>
        <h1 className="server-title">
          🖥️ {name}
          <span
            className={`status-indicator ${
              on ? "status-online" : "status-offline"
            }`}
          ></span>
        </h1>

        <div className="server-info">
          <div className={`info-item ${on ? "" : "info-item-grayed"}`}>
            <div className="info-label">Game</div>
            <div className="info-value">{String(game).toUpperCase()}</div>
          </div>

          <div className={`info-item ${on ? "" : "info-item-grayed"}`}>
            <div className="info-label">Local</div>
            <div className="info-value">{formatLocation(location)}</div>
          </div>

          <div className={`info-item ${on ? "" : "info-item-offline"}`}>
            <div className="info-label">Status</div>
            <div className="info-value">{on ? "Online" : "Offline"}</div>
          </div>

          {relevantStatus.map((s, index) => (
            <div
              key={index}
              className={`info-item ${on ? "" : "info-item-grayed"}`}
            >
              <div className="info-label">{s.key}</div>
              <div className="info-value">{s.value}</div>
            </div>
          ))}

          {/* Card de Contagem Regressiva */}
          <div className={`info-item ${on ? "" : "info-item-grayed"}`}>
            <div className="info-label">Atualiza em:</div>
            <div className="info-value">{countdown}s</div>
          </div>
        </div>

        {/* Seção do Mapa */}
        {currentMap && (
          <div className="map-section">
            <div className="info-item" style={{ marginBottom: "15px" }}>
              <div className="info-label">Mapa Atual</div>
              <div className="info-value">{currentMap}</div>
            </div>

            {mapImageUrl ? (
              <img
                src={mapImageUrl}
                alt={`Mapa ${currentMap}`}
                className="map-image"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}

            <div
              className="map-placeholder"
              style={{ display: mapImageUrl ? "none" : "flex" }}
            >
              🗺️ Imagem do mapa não disponível
            </div>
          </div>
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

        <div className="skins-button-container">
          <button
            className="discord-button"
            onClick={() =>
              window.open("https://discord.gg/tmyz4wp88W", "_blank")
            }
            title="Discord"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </button>

          <button
            className="skins-button"
            onClick={() =>
              window.open("https://lanchonetemix.ct.ws/", "_blank")
            }
            title="SKINS - CS Mix Lanches"
          >
            SKINS
          </button>

          <button
            className="linkedin-button"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/fabriciomoreirapedroso/",
                "_blank"
              )
            }
            title="LinkedIn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Card de ranques consultando a API PHP
function RankCard() {
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_PLAYER_API_URL;
    fetch(apiUrl, { method: "GET" })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText} - ${text}`);
        }
        // Remove caracteres inválidos antes do JSON
        const jsonStart = text.indexOf("[");
        const cleanText = jsonStart >= 0 ? text.slice(jsonStart) : text;
        try {
          return JSON.parse(cleanText);
        } catch (e) {
          throw new Error(
            `Resposta inválida da API: ${e.message} - ${cleanText}`
          );
        }
      })
      .then((data) => {
        setRanks(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((err) => {
        setError(`Erro ao buscar dados: ${err.message}`);
        setLoading(false);
      });
  }, []);

  return (
    <div className="rank-card">
      <h2>Tabela de Ranques</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Rank</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {ranks
              .sort((a, b) => Number(b.points) - Number(a.points))
              .slice(0, 10)
              .map((item, idx) => {
                const isGlobalEliteTop = Number(item.points) > 6000;
                return (
                  <tr key={item.steam_id || idx}>
                    <td>{item.name}</td>
                    <td>
                      {isGlobalEliteTop ? (
                        <img
                          src={"ranks/Global Elite Top.png"}
                          alt="Global Elite Top"
                          style={{ height: 32, verticalAlign: "middle" }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : item.rank ? (
                        <img
                          src={`ranks/${item.rank}.png`}
                          alt={item.rank}
                          style={{ height: 32, verticalAlign: "middle" }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : null}
                    </td>
                    <td>{item.points}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Adiciona o card de ranques ao App
function AppWithRank() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <div style={{ flex: 1 }}>
        <App />
      </div>
      <div style={{ width: 400 }}>
        <RankCard />
      </div>
    </div>
  );
}

export default AppWithRank;
