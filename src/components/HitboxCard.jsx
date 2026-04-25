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
    Points: points = 0,
    top_weapons = [],
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

  const getFaceitImageName = (playerPoints) => {
    const parsedPoints = Number(playerPoints);

    if (Number.isNaN(parsedPoints)) return "0";
    if (parsedPoints <= 1500) return "0";
    if (parsedPoints <= 2100) return "1";
    if (parsedPoints <= 2800) return "2";
    if (parsedPoints <= 3600) return "3";
    if (parsedPoints <= 4500) return "4";
    if (parsedPoints <= 5700) return "5";
    if (parsedPoints <= 7200) return "6";
    if (parsedPoints <= 9000) return "7";
    if (parsedPoints <= 11500) return "8";
    if (parsedPoints <= 15500) return "9";
    if (parsedPoints <= 23000) return "10";
    if (parsedPoints > 23000) return "challenger";

    return "0";
  };

  // Função para mapear nomes de armas da API para nomes dos arquivos SVG
  const getWeaponIcon = (weaponName) => {
    const weaponMap = {
      ak47: "weapon_ak47_sprite.svg",
      aug: "weapon_aug_sprite.svg",
      awp: "weapon_awp_sprite.svg",
      bizon: "weapon_bizon_sprite.svg",
      cz75a: "weapon_cz75a_sprite.svg",
      deagle: "weapon_deagle_sprite.svg",
      elite: "weapon_elite_sprite.svg",
      famas: "weapon_famas_sprite.svg",
      fiveseven: "weapon_fiveseven_sprite.svg",
      g3sg1: "weapon_g3sg1_sprite.svg",
      galilar: "weapon_galilar_sprite.svg",
      glock: "weapon_glock_sprite.svg",
      hkp2000: "weapon_hkp2000_sprite.svg",
      knife: "weapon_knife_sprite.svg",
      m249: "weapon_m249_sprite.svg",
      m4a1: "weapon_m4a1_sprite.svg",
      m4a1_silencer: "weapon_m4a1_silencer_sprite.svg",
      mac10: "weapon_mac10_sprite.svg",
      mag7: "weapon_mag7_sprite.svg",
      mp5sd: "weapon_mp5sd_sprite.svg",
      mp7: "weapon_mp7_sprite.svg",
      mp9: "weapon_mp9_sprite.svg",
      negev: "weapon_negev_sprite.svg",
      nova: "weapon_nova_sprite.svg",
      p250: "weapon_p250_sprite.svg",
      p90: "weapon_p90_sprite.svg",
      revolver: "weapon_revolver_sprite.svg",
      sawedoff: "weapon_sawedoff_sprite.svg",
      scar20: "weapon_scar20_sprite.svg",
      sg556: "weapon_sg556_sprite.svg",
      ssg08: "weapon_ssg08_sprite.svg",
      tec9: "weapon_tec9_sprite.svg",
      ump45: "weapon_ump45_sprite.svg",
      usp_silencer: "weapon_usp_silencer_sprite.svg",
      "usp-s": "weapon_usp_silencer_sprite.svg",
      xm1014: "weapon_xm1014_sprite.svg",
    };

    return weaponMap[weaponName] || null;
  };

  // Função para obter nome amigável da arma
  const getWeaponDisplayName = (weaponName) => {
    const nameMap = {
      ak47: "AK-47",
      aug: "AUG",
      awp: "AWP",
      bizon: "PP-Bizon",
      cz75a: "CZ75-Auto",
      deagle: "Desert Eagle",
      elite: "Dual Berettas",
      famas: "FAMAS",
      fiveseven: "Five-SeveN",
      g3sg1: "G3SG1",
      galilar: "Galil AR",
      glock: "Glock-18",
      hkp2000: "P2000",
      knife: "Knife",
      m249: "M249",
      m4a1: "M4A4",
      m4a1_silencer: "M4A1-S",
      mac10: "MAC-10",
      mag7: "MAG-7",
      mp5sd: "MP5-SD",
      mp7: "MP7",
      mp9: "MP9",
      negev: "Negev",
      nova: "Nova",
      p250: "P250",
      p90: "P90",
      revolver: "R8 Revolver",
      sawedoff: "Sawed-Off",
      scar20: "SCAR-20",
      sg556: "SG 553",
      ssg08: "SSG 08",
      tec9: "Tec-9",
      ump45: "UMP-45",
      usp_silencer: "USP-S",
      "usp-s": "USP-S",
      xm1014: "XM1014",
    };

    return nameMap[weaponName] || weaponName.toUpperCase();
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
            <div className="stat-item rank-item">
              <span className="stat-label">Faceit</span>
              <div className="rank-image-container">
                <img
                  src={`faceit/${getFaceitImageName(points)}.png`}
                  alt={`Faceit ${getFaceitImageName(points)}`}
                  className="rank-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
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
              <span className="stat-label">Points</span>
              <span className="stat-value">{points}</span>
            </div>
          </div>

          {/* Top Weapons Section */}
          <div className="top-weapons-section">
            <h3 className="weapons-title">Armas Favoritas</h3>
            <div className="weapons-grid">
              {Array.from({ length: 3 }, (_, index) => {
                const weapon = top_weapons[index];

                if (!weapon) {
                  return (
                    <div key={index} className="weapon-card weapon-card-empty">
                      <div className="weapon-icon-placeholder">
                        <span>N/A</span>
                      </div>
                      <div className="weapon-info">
                        <span className="weapon-name">-</span>
                        <span className="weapon-kills">0 kills</span>
                      </div>
                    </div>
                  );
                }

                const iconSrc = getWeaponIcon(weapon.weapon);
                const displayName = getWeaponDisplayName(weapon.weapon);

                return (
                  <div key={index} className="weapon-card">
                    <div className="weapon-icon">
                      {iconSrc ? (
                        <img
                          src={`weaponicons/${iconSrc}`}
                          alt={displayName}
                          className="weapon-svg"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                      ) : null}
                      <span
                        className="weapon-fallback"
                        style={{ display: iconSrc ? "none" : "block" }}
                      >
                        {weapon.weapon.toUpperCase()}
                      </span>
                    </div>
                    <div className="weapon-info">
                      <span className="weapon-name">{displayName}</span>
                      <span className="weapon-kills">{weapon.kills} kills</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
