import React, { useState } from "react";
import "./rankcard.css";
import { ServerCard } from "./components/ServerCard";
import { RankCard } from "./components/RankCard";
import { HitboxCard } from "./components/HitboxCard";
import { TeamDrawModal } from "./components/TeamDrawModal";

/**
 * Componente principal da aplicação
 */
function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isTeamDrawOpen, setIsTeamDrawOpen] = useState(false);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };
  return (
    <>
      <style>{`
        .team-draw-open-btn {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 1100;
          border: 2px solid #ffd700;
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          color: #ffd700;
          padding: 12px 18px;
          border-radius: 12px;
          font-family: "Poppins", sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(255, 215, 0, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .team-draw-open-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255, 215, 0, 0.35);
        }

        .team-draw-open-btn:active {
          transform: translateY(0);
        }

        .main-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 2rem;
          overflow-x: hidden;
          overflow-y: auto;
        }
        
        @media (max-width: 1350px) {
          .app-container {
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
            gap: 1rem !important;
          }
          .app-container > div {
            width: 100% !important;
            max-width: none !important; /* Remover limitação de largura */
            min-width: auto !important;
          }
          .hitbox-section {
            order: -1 !important;
            max-width: none !important; /* Remover limitação de largura */
          }
          .main-wrapper {
            padding: 1rem !important;
            height: auto !important;
            min-height: 100vh !important;
          }
        }
        
        @media (max-width: 768px) {
          .team-draw-open-btn {
            right: 10px;
            bottom: 10px;
            padding: 10px 14px;
            font-size: 0.82rem;
          }

          .main-wrapper {
            padding: 0.5rem !important;
          }
          .app-container {
            gap: 0.5rem !important;
          }
          .app-container > div {
            max-width: 100% !important;
            margin: 0 !important;
          }
        }
      `}</style>
      <div className="main-wrapper">
        <button
          type="button"
          className="team-draw-open-btn"
          onClick={() => setIsTeamDrawOpen(true)}
        >
          SORTEAR TIME
        </button>

        <div
          className="app-container"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "2rem",
            width: "auto" /* Permitir largura automática */,
            maxWidth: "100%",
          }}
        >
          <div
            className="hitbox-section"
            style={{
              width: "300px",
              flex: "0 0 300px",
            }}
          >
            <HitboxCard selectedPlayer={selectedPlayer} />
          </div>
          <div
            style={{
              width: "auto" /* Permitir largura automática */,
              flex: "1 1 auto" /* Permitir crescimento */,
              minWidth: "600px" /* Largura mínima para a tabela */,
            }}
          >
            <ServerCard />
          </div>
          <div
            style={{
              width: "auto" /* Permitir largura automática */,
              flex: "1 1 auto" /* Permitir crescimento */,
              minWidth: "600px" /* Largura mínima para a tabela */,
            }}
          >
            <RankCard
              onPlayerSelect={handlePlayerSelect}
              selectedPlayer={selectedPlayer}
            />
          </div>
        </div>
      </div>

      <TeamDrawModal
        isOpen={isTeamDrawOpen}
        onClose={() => setIsTeamDrawOpen(false)}
      />
    </>
  );
}

export default App;
