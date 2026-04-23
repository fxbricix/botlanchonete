import React, { useState } from "react";
import { useRanksData } from "@/hooks/useRanksData.js";
import { calculateKD } from "@/utils/statsUtils.js";

/**
 * Componente para exibir tabela de ranques
 */
export function RankCard({ onPlayerSelect, selectedPlayer }) {
  const { ranks, loading, error } = useRanksData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const sortedRanks = ranks.sort((a, b) => Number(b.Points) - Number(a.Points));

  // Cálculos de paginação
  const totalPages = Math.ceil(sortedRanks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRanks = sortedRanks.slice(startIndex, endIndex);

  // Funções de navegação
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
                <th>Pts</th>
                <th>K/D</th>
              </tr> 
            </thead>
            <tbody>
              {currentRanks.map((item, idx) => {
                const position = startIndex + idx + 1; // Posição real considerando a página
                const kdRatio = calculateKD(item.Kills, item.Deaths);

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

                // Função para truncar o nome se necessário
                const truncateName = (name) => {
                  const displayName = name || "Jogador precisa logar";
                  return displayName.length > 25
                    ? displayName.substring(0, 25) + "..."
                    : displayName;
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
                    <td
                      className="player-name-cell"
                      title={
                        (item.name || "Jogador precisa logar").length > 20
                          ? item.name || "Jogador precisa logar"
                          : undefined
                      }
                    >
                      {truncateName(item.name)}
                    </td>
                    <td>{item.Points}</td>
                    <td>{kdRatio}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Controles de Paginação */}
      {!loading && !error && totalPages > 1 && (
        <div className="pagination-controls">
          <div className="pagination-info">
            Página {currentPage} de {totalPages} ({sortedRanks.length} jogadores
            total)
          </div>
          <div className="pagination-buttons">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ◀ Anterior
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`page-number-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Próxima ▶
            </button>
          </div>
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
