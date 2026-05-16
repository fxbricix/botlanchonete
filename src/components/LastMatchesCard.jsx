import React, { useMemo } from "react";
import { LastMatchesSection } from "./LastMatchesSection";
import { useLastMatchesData } from "../hooks/useLastMatchesData.js";

export function LastMatchesCard() {
  const { lastMatches, error } = useLastMatchesData();

  const hasData = useMemo(() => {
    return lastMatches && typeof lastMatches === "object" && Object.keys(lastMatches).length > 0 && !error;
  }, [lastMatches, error]);

  if (!hasData) {
    return null;
  }

  return (
    <div className="last-matches-card-wrapper">
      <div className="last-matches-card">
        <h2 className="last-matches-card-title">Últimas Partidas</h2>
        <LastMatchesSection />
      </div>
    </div>
  );
}
