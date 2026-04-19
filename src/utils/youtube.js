/**
 * Utilitaires pour YouTube
 */

/**
 * Extrait l'ID YouTube de l'URL
 * @param {string} url - URL YouTube
 * @returns {string|null} ID de la vidéo ou null si invalide
 */
export function getYoutubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Valide une URL YouTube
 * @param {string} url - URL à valider
 * @returns {boolean} true si URL valide
 */
export function isValidYoutubeUrl(url) {
    return getYoutubeVideoId(url) !== null;
}
