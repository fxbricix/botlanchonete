import React from "react";

/**
 * Componente para exibir estado de carregamento
 */
export function LoadingState() {
  return (
    <div className="app">
      <div className="server-card">
        <div className="loading">🔄 Carregando informações do servidor...</div>
      </div>
    </div>
  );
}

/**
 * Componente para exibir estado de erro
 */
export function ErrorState({ error, onRetry }) {
  return (
    <div className="app">
      <div className="server-card">
        <div className="error">
          ❌ Erro ao carregar dados: {error}
          <br />
          <button className="refresh-button" onClick={onRetry}>
            Tentar Novamente
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente para exibir estado de configuração necessária
 */
export function ConfigurationNeeded() {
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

/**
 * Componente para exibir quando não há dados
 */
export function NoDataState() {
  return (
    <div className="app">
      <div className="server-card">
        <div className="error">⚠️ Nenhum dado do servidor disponível</div>
      </div>
    </div>
  );
}
