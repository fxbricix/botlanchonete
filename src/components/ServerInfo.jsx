import React from "react";
import { formatLocation, getRelevantStatus } from "../utils/formatters.js";

/**
 * Componente para exibir informações do servidor
 */
export function ServerInfo({ serverData, isOnline }) {
  const { game, location, status } = serverData;
  const relevantStatus = getRelevantStatus(status);

  return (
    <div className="server-info">
      <div className={`info-item ${isOnline ? "" : "info-item-grayed"}`}>
        <div className="info-label">Local</div>
        <div className="info-value">{formatLocation(location)}</div>
      </div>

      <div className={`info-item ${isOnline ? "" : "info-item-offline"}`}>
        <div className="info-label">Status</div>
        <div className="info-value">{isOnline ? "Online" : "Offline"}</div>
      </div>

      {relevantStatus.map((s, index) => (
        <div
          key={index}
          className={`info-item ${isOnline ? "" : "info-item-grayed"}`}
        >
          <div className="info-label">{s.key}</div>
          <div className="info-value">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
