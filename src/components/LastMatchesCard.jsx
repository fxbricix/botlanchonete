import React from "react";
import { LastMatchesSection } from "./LastMatchesSection";

export function LastMatchesCard({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="team-draw-overlay" onClick={onClose}>
      <div className="team-draw-modal last-matches-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="team-draw-close" onClick={onClose}>
          Fechar
        </button>
        <h2>PARTIDAS RECENTES</h2>
        <LastMatchesSection />
      </div>
    </div>
  );
}
