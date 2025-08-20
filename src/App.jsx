import React from "react";
import "./rankcard.css";
import { ServerCard } from "./components/ServerCard.jsx";
import { RankCard } from "./components/RankCard.jsx";

/**
 * Componente principal da aplicação
 */
function App() {
  return (
    <>
      <style>{`
        .main-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          padding: 2rem;
        }
        
        @media (max-width: 900px) {
          .app-container {
            flex-direction: column !important;
            align-items: center !important;
          }
          .app-container > div {
            width: 100% !important;
            max-width: 500px !important;
            min-width: auto !important;
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
            width: "900px",
            maxWidth: "100%",
          }}
        >
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
            <RankCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
