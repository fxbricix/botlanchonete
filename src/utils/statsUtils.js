/**
 * Calcula o K/D ratio
 * @param {number} kills - Número de kills
 * @param {number} deaths - Número de deaths
 * @returns {string} K/D ratio formatado
 */
export function calculateKD(kills, deaths) {
  if (!kills || !deaths || deaths === 0) {
    return kills ? kills.toString() : "0";
  }
  
  const kd = kills / deaths;
  return kd.toFixed(2);
}

/**
 * Calcula a porcentagem de headshots
 * @param {number} kills - Número total de kills
 * @param {number} headshots - Número de headshots
 * @returns {string} Porcentagem de headshots formatada
 */
export function calculateHeadshotPercentage(kills, headshots) {
  if (!kills || !headshots || kills === 0) {
    return "0%";
  }
  
  const percentage = (headshots / kills) * 100;
  return percentage.toFixed(1) + "%";
}

/**
 * Formata o valor de MVP
 * @param {number} mvp - Número de MVPs
 * @returns {string} MVP formatado
 */
export function formatMVP(mvp) {
  return mvp ? mvp.toString() : "0";
}
