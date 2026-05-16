import React from "react";
import { LastMatchesSection } from "./LastMatchesSection";

export function LastMatchesCard() {
  return (
    <div className="last-matches-card-wrapper">
      <div className="last-matches-card">
        <h2 className="last-matches-card-title">Últimas Partidas</h2>
        <LastMatchesSection />
      </div>
    </div>
  );
}
