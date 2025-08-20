/**
 * Formata o local para exibição
 * @param {string} loc - Local a ser formatado
 * @returns {string} Local formatado
 */
export function formatLocation(loc) {
  if (!loc) return "";
  if (loc.toLowerCase() === "sao_paulo") return "São Paulo";
  return loc.charAt(0).toUpperCase() + loc.slice(1).toLowerCase();
}

/**
 * Formata o timestamp para exibição
 * @returns {string} Timestamp formatado
 */
export function formatLastUpdate() {
  return new Date().toLocaleString("pt-BR");
}

/**
 * Encontra o mapa atual nos dados do status
 * @param {Array} status - Array de status do servidor
 * @returns {string|null} Nome do mapa atual ou null
 */
export function getCurrentMap(status) {
  if (!status || !Array.isArray(status)) return null;

  const mapStatus = status.find(
    (s) =>
      (s.key && s.key.toLowerCase().includes("map")) ||
      s.key === "Current Map" ||
      s.key === "Map"
  );

  return mapStatus ? mapStatus.value : null;
}

/**
 * Filtra status relevantes para exibição
 * @param {Array} status - Array de status do servidor
 * @returns {Array} Status filtrados
 */
export function getRelevantStatus(status) {
  return status?.filter(
    (s) =>
      s.key && // Garantir que existe uma key
      s.key !== "Players" &&
      s.value !== undefined &&
      s.value !== null &&
      s.value !== "" &&
      !s.key.toLowerCase().includes("map")
  ) || [];
}
