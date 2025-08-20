import c4Sound from '../c4.mp3';

/**
 * Reproduz o som do C4
 */
export async function playC4Sound() {
  console.log("Botão CONECTAR STEAM clicado!"); // Debug

  try {
    const audio = new Audio(c4Sound);
    audio.volume = 0.2; // Volume baixo (20%)

    console.log("Tentando reproduzir áudio importado..."); // Debug

    try {
      await audio.play();
      console.log("✅ Áudio reproduzido com sucesso!");
      return;
    } catch (error) {
      console.log("❌ Erro ao reproduzir áudio importado:", error);
      await playFallbackSound();
    }
  } catch (error) {
    console.log("❌ Erro ao criar objeto Audio:", error);
  }
}

/**
 * Tenta reproduzir o som usando métodos de fallback
 */
async function playFallbackSound() {
  console.log("Tentando fallback para GitHub Pages...");

  // Detecta se está em produção (GitHub Pages) ou desenvolvimento
  const isDev = import.meta.env.DEV;
  const basePath = isDev ? "" : "/botlanchonete";

  const fallbackMethods = [
    `${basePath}/audio/c4.mp3`,
    `${window.location.origin}${basePath}/audio/c4.mp3`
  ];

  for (const [index, audioUrl] of fallbackMethods.entries()) {
    try {
      const audio = new Audio(audioUrl);
      audio.volume = 0.2;
      await audio.play();
      console.log(`✅ Fallback ${index + 1} funcionou!`);
      return;
    } catch (error) {
      console.log(`❌ Fallback ${index + 1} falhou:`, error);
    }
  }

  console.log("❌ Todos os métodos falharam");
}
