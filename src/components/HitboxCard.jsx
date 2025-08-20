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
    name,
    headshots = 0,
    chest_hits = 0,
    stomach_hits = 0,
    left_arm_hits = 0,
    right_arm_hits = 0,
    left_leg_hits = 0,
    right_leg_hits = 0,
    neck_hits = 0,
  } = selectedPlayer;

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
              <span className="hit-count">{headshots}</span>
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
              <span className="hit-count">{neck_hits}</span>
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
                  <span className="hit-count">{left_arm_hits}</span>
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
                  <span className="hit-count">{right_arm_hits}</span>
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
                <span className="hit-count">{chest_hits}</span>
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
              <span className="hit-count">{stomach_hits}</span>
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
                <span className="hit-count">{left_leg_hits}</span>
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
                <span className="hit-count">{right_leg_hits}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hitbox-stats">
          <div className="stat-item">
            <span className="stat-label">Total Hits:</span>
            <span className="stat-value">{totalHits}</span>
          </div>
          <div className="stat-item headshot">
            <span className="stat-label">Headshots:</span>
            <span className="stat-value">
              {headshots} ({getHitPercentage(headshots)}%)
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Chest:</span>
            <span className="stat-value">
              {chest_hits} ({getHitPercentage(chest_hits)}%)
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Stomach:</span>
            <span className="stat-value">
              {stomach_hits} ({getHitPercentage(stomach_hits)}%)
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Arms:</span>
            <span className="stat-value">
              {parseInt(left_arm_hits) + parseInt(right_arm_hits)} (
              {getHitPercentage(
                parseInt(left_arm_hits) + parseInt(right_arm_hits)
              )}
              %)
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Legs:</span>
            <span className="stat-value">
              {parseInt(left_leg_hits) + parseInt(right_leg_hits)} (
              {getHitPercentage(
                parseInt(left_leg_hits) + parseInt(right_leg_hits)
              )}
              %)
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Neck:</span>
            <span className="stat-value">
              {neck_hits} ({getHitPercentage(neck_hits)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
