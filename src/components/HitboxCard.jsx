import React from "react";

/**
 * Componente para exibir informações de hitbox do player selecionado
 */
export function HitboxCard({ selectedPlayer }) {
  if (!selectedPlayer) {
    return (
      <div className="hitbox-card">
        <h2>Hitbox Stats</h2>
        <div className="hitbox-placeholder">
          <p>
            Clique em um player na tabela de ranques para ver suas estatísticas
            de hitbox
          </p>
          <div className="body-diagram-placeholder">
            <div className="body-silhouette">
              <div className="head-area"></div>
              <div className="neck-area"></div>
              <div className="chest-area"></div>
              <div className="stomach-area"></div>
              <div className="arms-area">
                <div className="left-arm"></div>
                <div className="right-arm"></div>
              </div>
              <div className="legs-area">
                <div className="left-leg"></div>
                <div className="right-leg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    name: playerName,
    Headshots: headshots = 0,
    ChestHits: chest_hits = 0,
    StomachHits: stomach_hits = 0,
    LeftArmHits: left_arm_hits = 0,
    RightArmHits: right_arm_hits = 0,
    LeftLegHits: left_leg_hits = 0,
    RightLegHits: right_leg_hits = 0,
    NeckHits: neck_hits = 0,
    Kills: kills = 0,
    Deaths: deaths = 0,
    Assists: assists = 0,
    FirstBlood: firstblood = 0,
    RoundsOverall: rounds_overall = 0,
    RoundWin: round_win = 0,
    RoundLose: round_lose = 0,
    BombPlanted: bomb_planted = 0,
    BombDefused: bomb_defused = 0,
    Rank: rank,
    Points: points = 0,
  } = selectedPlayer;

  const name = playerName || "Jogador precisa logar";

  const totalHits =
    parseInt(headshots) +
    parseInt(chest_hits) +
    parseInt(stomach_hits) +
    parseInt(left_arm_hits) +
    parseInt(right_arm_hits) +
    parseInt(left_leg_hits) +
    parseInt(right_leg_hits) +
    parseInt(neck_hits);

  const getHitPercentage = (hits) => {
    if (totalHits === 0) return 0;
    return ((parseInt(hits) / totalHits) * 100).toFixed(1);
  };

  const getHitIntensity = (hits) => {
    if (totalHits === 0) return 0;
    const percentage = (parseInt(hits) / totalHits) * 100;
    return Math.min(percentage / 50, 1); // Normaliza para 0-1, onde 50% = intensidade máxima
  };

  const getRoundWinPercentage = () => {
    const totalRounds = parseInt(round_win) + parseInt(round_lose);
    if (totalRounds === 0) return "0.0";
    return ((parseInt(round_win) / totalRounds) * 100).toFixed(1);
  };

  const isGlobalEliteTop = Number(points) > 6000;
  const rankImageSrc = isGlobalEliteTop
    ? "ranks/Global Elite Top.png"
    : `ranks/${rank}.png`;

  return (
    <div className="hitbox-card">
      <h2>Hitbox Stats</h2>
      <div className="player-name">{name}</div>

      <div className="hitbox-content">
        <div className="body-diagram">
          <div className="body-silhouette">
            {/* Cabeça */}
            <div
              className="hit-area head-area"
              style={{
                backgroundColor: `rgba(255, 0, 0, ${
                  0.2 + getHitIntensity(headshots) * 0.6
                })`,
                border:
                  parseInt(headshots) > 0
                    ? "2px solid #ff4444"
                    : "1px solid #666",
              }}
              title={`Headshots: ${headshots} (${getHitPercentage(
                headshots
              )}%)`}
            >
              <span className="hit-count">{getHitPercentage(headshots)}%</span>
            </div>

            {/* Pescoço */}
            <div
              className="hit-area neck-area"
              style={{
                backgroundColor: `rgba(255, 165, 0, ${
                  0.2 + getHitIntensity(neck_hits) * 0.6
                })`,
                border:
                  parseInt(neck_hits) > 0
                    ? "2px solid #ffa500"
                    : "1px solid #666",
              }}
              title={`Neck hits: ${neck_hits} (${getHitPercentage(
                neck_hits
              )}%)`}
            >
              <span className="hit-count">{getHitPercentage(neck_hits)}%</span>
            </div>

            {/* Container do torso com braços */}
            <div className="torso-container">
              {/* Braços */}
              <div className="arms-container">
                <div
                  className="hit-area left-arm"
                  style={{
                    backgroundColor: `rgba(0, 255, 255, ${
                      0.2 + getHitIntensity(left_arm_hits) * 0.6
                    })`,
                    border:
                      parseInt(left_arm_hits) > 0
                        ? "2px solid #00ffff"
                        : "1px solid #666",
                  }}
                  title={`Left arm hits: ${left_arm_hits} (${getHitPercentage(
                    left_arm_hits
                  )}%)`}
                >
                  <span className="hit-count">
                    {getHitPercentage(left_arm_hits)}%
                  </span>
                </div>
                <div
                  className="hit-area right-arm"
                  style={{
                    backgroundColor: `rgba(0, 0, 255, ${
                      0.2 + getHitIntensity(right_arm_hits) * 0.6
                    })`,
                    border:
                      parseInt(right_arm_hits) > 0
                        ? "2px solid #0000ff"
                        : "1px solid #666",
                  }}
                  title={`Right arm hits: ${right_arm_hits} (${getHitPercentage(
                    right_arm_hits
                  )}%)`}
                >
                  <span className="hit-count">
                    {getHitPercentage(right_arm_hits)}%
                  </span>
                </div>
              </div>

              {/* Peito */}
              <div
                className="hit-area chest-area"
                style={{
                  backgroundColor: `rgba(255, 255, 0, ${
                    0.2 + getHitIntensity(chest_hits) * 0.6
                  })`,
                  border:
                    parseInt(chest_hits) > 0
                      ? "2px solid #ffff00"
                      : "1px solid #666",
                }}
                title={`Chest hits: ${chest_hits} (${getHitPercentage(
                  chest_hits
                )}%)`}
              >
                <span className="hit-count">
                  {getHitPercentage(chest_hits)}%
                </span>
              </div>
            </div>

            {/* Estômago */}
            <div
              className="hit-area stomach-area"
              style={{
                backgroundColor: `rgba(0, 255, 0, ${
                  0.2 + getHitIntensity(stomach_hits) * 0.6
                })`,
                border:
                  parseInt(stomach_hits) > 0
                    ? "2px solid #00ff00"
                    : "1px solid #666",
              }}
              title={`Stomach hits: ${stomach_hits} (${getHitPercentage(
                stomach_hits
              )}%)`}
            >
              <span className="hit-count">
                {getHitPercentage(stomach_hits)}%
              </span>
            </div>

            {/* Pernas */}
            <div className="legs-container">
              <div
                className="hit-area left-leg"
                style={{
                  backgroundColor: `rgba(255, 0, 255, ${
                    0.2 + getHitIntensity(left_leg_hits) * 0.6
                  })`,
                  border:
                    parseInt(left_leg_hits) > 0
                      ? "2px solid #ff00ff"
                      : "1px solid #666",
                }}
                title={`Left leg hits: ${left_leg_hits} (${getHitPercentage(
                  left_leg_hits
                )}%)`}
              >
                <span className="hit-count">
                  {getHitPercentage(left_leg_hits)}%
                </span>
              </div>
              <div
                className="hit-area right-leg"
                style={{
                  backgroundColor: `rgba(128, 0, 128, ${
                    0.2 + getHitIntensity(right_leg_hits) * 0.6
                  })`,
                  border:
                    parseInt(right_leg_hits) > 0
                      ? "2px solid #800080"
                      : "1px solid #666",
                }}
                title={`Right leg hits: ${right_leg_hits} (${getHitPercentage(
                  right_leg_hits
                )}%)`}
              >
                <span className="hit-count">
                  {getHitPercentage(right_leg_hits)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="player-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Kills</span>
              <span className="stat-value">{kills}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Deaths</span>
              <span className="stat-value">{deaths}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Assists</span>
              <span className="stat-value">{assists}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">First Blood</span>
              <span className="stat-value">{firstblood}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Rounds Total</span>
              <span className="stat-value">{rounds_overall}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Round Win %</span>
              <span className="stat-value">{getRoundWinPercentage()}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bomb Planted</span>
              <span className="stat-value">{bomb_planted}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Bomb Defused</span>
              <span className="stat-value">{bomb_defused}</span>
            </div>
            <div className="stat-item rank-item">
              <span className="stat-label">Rank</span>
              <div className="rank-image-container">
                {rank ? (
                  <img
                    src={rankImageSrc}
                    alt={isGlobalEliteTop ? "Global Elite Top" : rank}
                    className="rank-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="stat-value">N/A</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
