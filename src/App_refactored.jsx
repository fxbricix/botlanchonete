import React from "react";
import "./rankcard.css";
import { ServerCard } from "./components/ServerCard.jsx";
import { RankCard } from "./components/RankCard.jsx";

/**
 * Componente principal da aplicação
 */
function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <div style={{ flex: 1 }}>
        <ServerCard />
      </div>
      <div style={{ width: 400 }}>
        <RankCard />
      </div>
    </div>
  );
}

export default App;
