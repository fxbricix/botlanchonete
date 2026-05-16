import React, { useMemo, useState } from "react";
import { useLastMatchesData } from "../hooks/useLastMatchesData.js";

function groupByTeam(records = []) {
  return records.reduce((acc, record) => {
    const team = record.team ?? "SEM_TIME";
    if (!acc[team]) {
      acc[team] = [];
    }
    acc[team].push(record);
    return acc;
  }, {});
}

function getMatchTitle(groups) {
  const teams = Object.keys(groups);
  if (teams.length === 0) {
    return "Partida";
  }
  if (teams.length === 1) {
    return formatTeamLabel(teams[0]);
  }
  return `${formatTeamLabel(teams[0])} X ${formatTeamLabel(teams[1])}`;
}

function formatTeamLabel(teamName) {
  return String(teamName)
    .replace(/team_/gi, "")
    .replace(/_/g, " ")
    .trim()
    .toUpperCase();
}

export function LastMatchesSection() {
  const { lastMatches, loading, error } = useLastMatchesData();
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  const matches = useMemo(() => {
    if (!lastMatches || typeof lastMatches !== "object") {
      return [];
    }

    return Object.entries(lastMatches).map(([matchId, payload]) => ({
      matchId,
      records: Array.isArray(payload?.records) ? payload.records : [],
    }));
  }, [lastMatches]);

  console.debug("LastMatchesSection state:", {
    loading,
    error,
    lastMatches,
    matchesCount: matches.length,
    matchesSample: matches.slice(0, 2),
  });

  const hasMatches = matches.length > 0 && !error;

  const selectedMatch = useMemo(
    () => matches.find((match) => match.matchId === selectedMatchId) ?? null,
    [matches, selectedMatchId]
  );

  const selectedMatchGroups = useMemo(
    () => (selectedMatch ? groupByTeam(selectedMatch.records) : {}),
    [selectedMatch]
  );

  if (loading) {
    return null;
  }

  return (
    <section className="last-matches-section">
      <div className="last-matches-grid">
        {matches.map((match) => {
          const groups = groupByTeam(match.records);
          return (
            <button
              key={match.matchId}
              type="button"
              className="last-match-list-item"
              onClick={() => setSelectedMatchId(match.matchId)}
            >
              {getMatchTitle(groups)}
            </button>
          );
        })}
      </div>

      {selectedMatch && (
        <div
          className="team-draw-overlay"
          onClick={() => setSelectedMatchId(null)}
        >
          <div
            className="team-draw-modal last-matches-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="team-draw-close"
              onClick={() => setSelectedMatchId(null)}
            >
              Fechar
            </button>

            <h2>{getMatchTitle(selectedMatchGroups)}</h2>

            {Object.entries(selectedMatchGroups).map(([teamName, records]) => (
              <div key={teamName} className="last-match-team-block">
                <h3>{formatTeamLabel(teamName)}</h3>
                <div className="last-match-table-wrapper">
                  <table className="last-match-table">
                    <thead>
                      <tr>
                        <th>Jogador</th>
                        <th>Kills</th>
                        <th>Deaths</th>
                        <th>Damage</th>
                        <th>Assists</th>
                        <th>Headshots</th>
                        <th>Utility</th>
                        <th>Flashes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((record, index) => (
                        <tr key={`${record.steamid64 || record.name}-${index}`}>
                          <td>{record.name || "—"}</td>
                          <td>{record.kills || "0"}</td>
                          <td>{record.deaths || "0"}</td>
                          <td>{record.damage || "0"}</td>
                          <td>{record.assists || "0"}</td>
                          <td>{record.head_shot_kills || "0"}</td>
                          <td>{record.utility_damage || "0"}</td>
                          <td>{record.enemies_flashed || "0"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
