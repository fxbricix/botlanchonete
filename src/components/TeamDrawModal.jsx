import React, { useMemo, useState } from "react";

const MAX_NAMES = 15;

function shuffleArray(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

/**
 * Modal de sorteio de times com até 15 nomes.
 */
export function TeamDrawModal({ isOpen, onClose }) {
  const [nameInput, setNameInput] = useState("");
  const [players, setPlayers] = useState([]);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);

  const trimmedInput = nameInput.trim();
  const canAdd =
    trimmedInput.length > 0 &&
    players.length < MAX_NAMES &&
    !players.some((name) => name.toLowerCase() === trimmedInput.toLowerCase());

  const drawMessage = useMemo(() => {
    if (players.length < 2) {
      return "Adicione pelo menos 2 nomes para sortear.";
    }

    if (players.length % 2 !== 0) {
      return "Com quantidade impar, um dos times ficara com 1 jogador a mais.";
    }

    return "Os times serao balanceados com a mesma quantidade de jogadores.";
  }, [players.length]);

  if (!isOpen) {
    return null;
  }

  const handleAddPlayer = () => {
    if (!canAdd) {
      return;
    }

    setPlayers((prev) => [...prev, trimmedInput]);
    setNameInput("");
    setTeamA([]);
    setTeamB([]);
  };

  const handleRemovePlayer = (indexToRemove) => {
    setPlayers((prev) => prev.filter((_, index) => index !== indexToRemove));
    setTeamA([]);
    setTeamB([]);
  };

  const handleDrawTeams = () => {
    if (players.length < 2) {
      return;
    }

    const shuffled = shuffleArray(players);
    const middle = Math.ceil(shuffled.length / 2);

    setTeamA(shuffled.slice(0, middle));
    setTeamB(shuffled.slice(middle));
  };

  return (
    <div className="team-draw-overlay" onClick={onClose}>
      <div className="team-draw-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="team-draw-close" onClick={onClose}>
          Fechar
        </button>

        <h2>SORTEAR TIME</h2>
        <p className="team-draw-subtitle">Insira ate 15 nomes para montar 2 times.</p>

        <div className="team-draw-input-row">
          <input
            type="text"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAddPlayer();
              }
            }}
            placeholder="Digite o nome do jogador"
            maxLength={32}
            className="team-draw-input"
          />
          <button
            type="button"
            className="team-draw-btn"
            onClick={handleAddPlayer}
            disabled={!canAdd}
          >
            Adicionar
          </button>
        </div>

        <div className="team-draw-helper-row">
          <span>
            Jogadores: {players.length}/{MAX_NAMES}
          </span>
          {!canAdd && trimmedInput.length > 0 && players.length >= MAX_NAMES && (
            <span>Limite maximo atingido.</span>
          )}
          {!canAdd &&
            trimmedInput.length > 0 &&
            players.some((name) => name.toLowerCase() === trimmedInput.toLowerCase()) && (
              <span>Nome duplicado.</span>
            )}
        </div>

        <div className="team-draw-table-wrapper">
          <table className="team-draw-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td colSpan={3} className="team-draw-empty">
                    Nenhum nome adicionado ainda.
                  </td>
                </tr>
              ) : (
                players.map((player, index) => (
                  <tr key={`${player}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{player}</td>
                    <td>
                      <button
                        type="button"
                        className="team-draw-remove"
                        onClick={() => handleRemovePlayer(index)}
                        aria-label={`Remover ${player}`}
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
          <p>{drawMessage}</p>
          <button
            type="button"
            className="team-draw-btn team-draw-btn-primary"
            onClick={handleDrawTeams}
            disabled={players.length < 2}
          >
            Sortear times
          </button>
        </div>

        {(teamA.length > 0 || teamB.length > 0) && (
          <div className="team-draw-results">
            <div className="team-draw-team-card">
              <h3>Time A</h3>
              <ul>
                {teamA.map((player) => (
                  <li key={`a-${player}`}>{player}</li>
                ))}
              </ul>
            </div>
            <div className="team-draw-team-card">
              <h3>Time B</h3>
              <ul>
                {teamB.map((player) => (
                  <li key={`b-${player}`}>{player}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
