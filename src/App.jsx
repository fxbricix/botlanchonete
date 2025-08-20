import React, { useState } from "react";
import "./rankcard.css";
import { ServerCard } from "./components/ServerCard.jsx";
import { RankCard } from "./components/RankCard.jsx";
import { HitboxCard } from "./components/HitboxCard.jsx";

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
          height: 100vh;
          padding: 2rem;
          overflow: hidden;
        }
        
        @media (max-width: 1350px) {
          .app-container {
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
          }
          .app-container > div {
            width: 100% !important;
            max-width: 500px !important;
            min-width: auto !important;
          }
          .hitbox-section {
            order: -1 !important;
            max-width: 400px !important;
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
            width: "1300px",
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
              width: "500px",
              flex: "0 0 500px",
            }}
          >
            <ServerCard />
          </div>
          <div
            style={{
              width: "400px",
              flex: "0 0 400px",
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
