import React, { useState } from "react";
import { getMapImageUrl } from "@/utils/mapUtils.js";

const MAX_MAPS = 20;

function pickRandomItem(items) {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

/**
 * Modal de sorteio de mapa com limite interno de 20 nomes de mapa.
 */
export function MapDrawModal({ isOpen, onClose }) {
  const [mapInput, setMapInput] = useState("");
  const [maps, setMaps] = useState([]);
  const [drawnMap, setDrawnMap] = useState("");
  const [imageError, setImageError] = useState(false);

  const trimmedInput = mapInput.trim();
  const canAdd =
    trimmedInput.length > 0 &&
    maps.length < MAX_MAPS &&
    !maps.some((name) => name.toLowerCase() === trimmedInput.toLowerCase());

  if (!isOpen) {
    return null;
  }

  const addMap = () => {
    if (!canAdd) {
      return;
    }

    setMaps((prev) => [...prev, trimmedInput]);
    setMapInput("");
    setDrawnMap("");
    setImageError(false);
  };

  const removeMap = (indexToRemove) => {
    setMaps((prev) => prev.filter((_, index) => index !== indexToRemove));
    setDrawnMap("");
    setImageError(false);
  };

  const drawMap = () => {
    if (maps.length === 0) {
      return;
    }

    const selectedMap = pickRandomItem(maps);
    setDrawnMap(selectedMap);
    setImageError(false);
  };

  const mapImageUrl = drawnMap ? getMapImageUrl(drawnMap) : null;
  const hasDisplayableImage = Boolean(
    mapImageUrl && !mapImageUrl.includes("not_found.png") && !imageError
  );

  return (
    <div className="team-draw-overlay" onClick={onClose}>
      <div className="team-draw-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="team-draw-close" onClick={onClose}>
          Fechar
        </button>

        <h2>SORTEAR MAPA</h2>
        <p className="team-draw-subtitle">Adicione nomes de mapas e sorteie apenas um.</p>

        <div className="team-draw-input-row">
          <input
            type="text"
            value={mapInput}
            onChange={(event) => setMapInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addMap();
              }
            }}
            placeholder="Digite o nome do mapa"
            maxLength={40}
            className="team-draw-input"
          />
          <button
            type="button"
            className="team-draw-btn"
            onClick={addMap}
            disabled={!canAdd}
          >
            Adicionar
          </button>
        </div>

        <div className="team-draw-helper-row">
          <span>Mapas adicionados: {maps.length}</span>
          {!canAdd && trimmedInput.length > 0 && maps.length >= MAX_MAPS && (
            <span>Nao foi possivel adicionar mais mapas.</span>
          )}
          {!canAdd &&
            trimmedInput.length > 0 &&
            maps.some((name) => name.toLowerCase() === trimmedInput.toLowerCase()) && (
              <span>Mapa duplicado.</span>
            )}
        </div>

        <div className="team-draw-table-wrapper">
          <table className="team-draw-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Mapa</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {maps.length === 0 ? (
                <tr>
                  <td colSpan={3} className="team-draw-empty">
                    Nenhum mapa adicionado ainda.
                  </td>
                </tr>
              ) : (
                maps.map((mapName, index) => (
                  <tr key={`${mapName}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{mapName}</td>
                    <td>
                      <button
                        type="button"
                        className="team-draw-remove"
                        onClick={() => removeMap(index)}
                        aria-label={`Remover ${mapName}`}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="team-draw-footer">
          <p>Escolha aleatoria de 1 mapa entre os adicionados.</p>
          <button
            type="button"
            className="team-draw-btn team-draw-btn-primary"
            onClick={drawMap}
            disabled={maps.length === 0}
          >
            Sortear mapa
          </button>
        </div>

        {drawnMap && (
          <div className="map-draw-result">
            <h3>Mapa sorteado: {drawnMap}</h3>

            {hasDisplayableImage ? (
              <img
                src={mapImageUrl}
                alt={`Mapa ${drawnMap}`}
                className="map-draw-image"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="map-draw-no-image">Imagem do mapa nao disponivel.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
