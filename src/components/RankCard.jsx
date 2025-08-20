import React from "react";
import { useRanksData } from "../hooks/useRanksData.js";
import {
  calculateKD,
  calculateHeadshotPercentage,
  formatMVP,
} from "../utils/statsUtils.js";

/**
 * Componente para exibir tabela de ranques
 */
export function RankCard({ onPlayerSelect, selectedPlayer }) {
  const { ranks, loading, error } = useRanksData();

  const sortedRanks = ranks
    .sort((a, b) => Number(b.points) - Number(a.points))
    .slice(0, 25);

  return (
    <div className="rank-card">
      <h2>Tabela de Ranques</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Rank</th>
                <th>Pts</th>
                <th>K/D</th>
                <th>HS%</th>
                <th>MVP</th>
              </tr>
            </thead>
            <tbody>
              {sortedRanks.map((item, idx) => {
                const position = idx + 1;
                const isGlobalEliteTop = Number(item.points) > 6000;
                const kdRatio = calculateKD(item.kills, item.deaths);
                const hsPercentage = calculateHeadshotPercentage(
                  item.kills,
                  item.headshots
                );
                const mvpCount = formatMVP(item.mvp);

                // Função para determinar o estilo da posição
                const getPositionStyle = (pos) => {
                  if (pos === 1)
                    return { color: "#ffd700", fontWeight: "bold" }; // Ouro
                  if (pos === 2)
                    return { color: "#c0c0c0", fontWeight: "bold" }; // Prata
                  if (pos === 3)
                    return { color: "#cd7f32", fontWeight: "bold" }; // Bronze
                  return {}; // Cor padrão
                };

                // Função para obter o símbolo da posição
                const getPositionSymbol = (pos) => {
                  if (pos === 1) return "🥇";
                  if (pos === 2) return "🥈";
                  if (pos === 3) return "🥉";
                  return pos.toString();
                };

                return (
                  <tr
                    key={item.steam_id || idx}
                    className={`player-row ${
                      selectedPlayer?.steam_id === item.steam_id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => onPlayerSelect(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <td style={getPositionStyle(position)}>
                      {getPositionSymbol(position)}
                    </td>
                    <td className="player-name-cell">{item.name}</td>
                    <td>
                      {isGlobalEliteTop ? (
                        <img
                          src={"ranks/Global Elite Top.png"}
                          alt="Global Elite Top"
                          style={{ height: 24, verticalAlign: "middle" }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : item.rank ? (
                        <img
                          src={`ranks/${item.rank}.png`}
                          alt={item.rank}
                          style={{ height: 24, verticalAlign: "middle" }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : null}
                    </td>
                    <td>{item.points}</td>
                    <td>{kdRatio}</td>
                    <td>{hsPercentage}</td>
                    <td>{mvpCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Info SVG e mensagem */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
          gap: "0.5rem",
          color: "#555",
          fontSize: "0.95rem",
        }}
      ></div>
    </div>
  );
}
