import React from "react";
import { useRanksData } from "../hooks/useRanksData.js";

/**
 * Componente para exibir tabela de ranques
 */
export function RankCard() {
  const { ranks, loading, error } = useRanksData();

  const sortedRanks = ranks
    .sort((a, b) => Number(b.points) - Number(a.points))
    .slice(0, 10);

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
            {sortedRanks.map((item, idx) => {
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
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#007bff"
            strokeWidth="2"
            fill="#eaf4ff"
          />
          <rect x="11" y="10" width="2" height="7" rx="1" fill="#007bff" />
          <rect x="11" y="7" width="2" height="2" rx="1" fill="#007bff" />
        </svg>
        <span>
          Os ranques são atualizados quando os players logam, devido a isso, a
          exibição pode estar diferente do esperado.
        </span>
      </div>
    </div>
  );
}
