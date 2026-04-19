/**
 * Gestion des données de boucles
 */

/**
 * Crée une boucle
 * @param {string} name - Nom de la boucle
 * @param {number} start - Début en secondes
 * @param {number} end - Fin en secondes
 * @returns {object} Objet boucle
 */
export function createLoop(name, start, end) {
    if (!name || name.trim() === '') {
        throw new Error('Le nom de la boucle ne peut pas être vide');
    }
    if (typeof start !== 'number' || typeof end !== 'number') {
        throw new Error('Les temps doivent être des nombres');
    }
    if (start < 0 || end < 0) {
        throw new Error('Les temps ne peuvent pas être négatifs');
    }
    if (start >= end) {
        throw new Error('Le début doit être avant la fin');
    }
    return { name: name.trim(), start, end };
}

/**
 * Ajoute une boucle aux données
 * @param {object} loopData - Objet contenant url et loops
 * @param {object} loop - Boucle à ajouter
 * @returns {object} Données mises à jour
 */
export function addLoop(loopData, loop) {
    return {
        ...loopData,
        loops: [...loopData.loops, loop]
    };
}

/**
 * Supprime une boucle par index
 * @param {object} loopData - Objet contenant url et loops
 * @param {number} index - Index de la boucle à supprimer
 * @returns {object} Données mises à jour
 */
export function removeLoop(loopData, index) {
    if (index < 0 || index >= loopData.loops.length) {
        throw new Error('Index invalide');
    }
    return {
        ...loopData,
        loops: loopData.loops.filter((_, i) => i !== index)
    };
}

/**
 * Initialise les données de boucle
 * @param {string} url - URL YouTube
 * @returns {object} Données initiales
 */
export function initializeLoopData(url) {
    return {
        url: url || '',
        loops: []
    };
}
