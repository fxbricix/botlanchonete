import React from "react";
import { getMapImageUrl } from "../utils/mapUtils.js";
import { getCurrentMap } from "../utils/formatters.js";

/**
 * Componente para exibir informações do mapa
 */
export function MapSection({ status }) {
  const currentMap = getCurrentMap(status);
  const mapImageUrl = getMapImageUrl(currentMap);

  if (!currentMap) return null;

  return (
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
  );
}
