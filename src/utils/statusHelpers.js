/**
 * Statuts finaux — toute action est irréversible une fois atteints.
 * Buttons de validation/refus doivent être disabled sur ces statuts.
 */
const FINAL_STATUSES = new Set([
  'VALIDEE',
  'REFUSEE',
  'CONFIRME',
  'REFUSE',
  'ACCEPTEE',
  'TERMINEE',
]);

/**
 * Retourne true si le statut est final (buttons disabled).
 * @param {string} statut
 * @returns {boolean}
 */
export function isFinalStatus(statut) {
  return FINAL_STATUSES.has(statut);
}
