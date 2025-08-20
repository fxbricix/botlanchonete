import React, { useState } from "react";
import "./rankcard.css";
import { ServerCard } from "./components/ServerCard";
import { RankCard } from "./components/RankCard";
import { HitboxCard } from "./components/HitboxCard";

/**
 * Componente principal da aplicação
 */
function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };
  return (
    <>
      <style>{`
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
    </>
  );
}

export default App;
