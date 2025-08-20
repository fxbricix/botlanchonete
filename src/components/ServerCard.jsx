import React from "react";
import { isConfigured } from "../config/index";
import { useServerData } from "../hooks/useServerData";
import {
  LoadingState,
  ErrorState,
  ConfigurationNeeded,
  NoDataState,
} from "./StateComponents";
import { ServerInfo } from "./ServerInfo";
import { MapSection } from "./MapSection";
import { ConnectSection } from "./ConnectSection";
import { SocialButtons } from "./SocialButtons";

/**
 * Componente principal do servidor
 */
export function ServerCard() {
  const { serverData, loading, error, refresh } = useServerData();

  // Se não está configurado, mostrar instruções
  if (!isConfigured()) {
    return <ConfigurationNeeded />;
  }

  if (loading && !serverData) {
    return <LoadingState />;
  }

  if (error && !serverData) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  if (!serverData) {
    return <NoDataState />;
  }

  const { name, status, on } = serverData;
  const isOnline = Boolean(on);

  return (
    <div className="app">
      <div className={`server-card ${isOnline ? "" : "server-card-offline"}`}>
        <h1 className="server-title">
          🖥️ {name}
          <span
            className={`status-indicator ${
              isOnline ? "status-online" : "status-offline"
            }`}
          ></span>
        </h1>

        <ServerInfo serverData={serverData} isOnline={isOnline} />

        <MapSection status={status} />

        <ConnectSection
          serverData={serverData}
          loading={loading}
          onRefresh={refresh}
        />

        <SocialButtons />
      </div>
    </div>
  );
}
