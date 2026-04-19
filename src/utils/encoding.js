/**
 * Gestion de l'encodage/décodage des données en base64
 */

function encodeBase64Utf8(text) {
    if (typeof btoa === 'function') {
        return btoa(text);
    }
    return Buffer.from(text, 'utf8').toString('base64');
}

function decodeBase64Utf8(encoded) {
    if (typeof atob === 'function') {
        return atob(encoded);
    }

    const isValidBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(encoded) && encoded.length % 4 === 0;
    if (!isValidBase64) {
        throw new Error('Base64 invalide');
    }

    return Buffer.from(encoded, 'base64').toString('utf8');
}

/**
 * Encode les données en base64
 * @param {object} data - Données à encoder
 * @returns {string} Données encodées en base64
 */
export function encodeData(data) {
    try {
        const json = JSON.stringify(data);
        return encodeBase64Utf8(json);
    } catch (error) {
        throw new Error('Impossible d\'encoder les données');
    }
}

/**
 * Décode les données depuis base64
 * @param {string} encoded - Données encodées en base64
 * @returns {object} Données décodées
 */
export function decodeData(encoded) {
    try {
        if (!encoded || typeof encoded !== 'string') {
            throw new Error('Données invalides');
        }
        const json = decodeBase64Utf8(encoded);
        const data = JSON.parse(json);
        
        // Valider la structure
        if (!data.url || !Array.isArray(data.loops)) {
            throw new Error('Structure de données invalide');
        }
        
        return data;
    } catch (error) {
        throw new Error('Impossible de décoder les données: ' + error.message);
    }
}

/**
 * Génère une URL complète avec les données encodées
 * @param {object} data - Données à encoder
 * @param {string} baseUrl - URL de base (par défaut: window.location)
 * @returns {string} URL complète avec hash
 */
export function generateUrl(data, baseUrl = '') {
    const encoded = encodeData(data);
    const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    const pathname = baseUrl ? '' : (typeof window !== 'undefined' ? window.location.pathname : '');
    return `${origin}${pathname}#${encoded}`;
}

/**
 * Extrait les données du hash de l'URL
 * @param {string} hash - Hash de l'URL (sans le #)
 * @returns {object|null} Données décodées ou null
 */
export function extractDataFromHash(hash) {
    if (!hash) return null;
    try {
        return decodeData(hash);
    } catch (error) {
        return null;
    }
}
