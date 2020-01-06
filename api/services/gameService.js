var gameService = {}

/**
 * Retourne un mot aléatoire tiré d'un dictionnaire anglais
 * @returns {string} mot aléatoire tiré d'un dictionnaire anglais
 */
gameService.getRandomWord = function () {
  // Lecture du fichier JSON contenant les mots
  let jsonData = require('../ressources/words_dictionary.json')
  // Génération d'un nombre random en fct de la taille du fichier
  let random = Math.floor(Math.random() * Object.keys(jsonData).length)
  // On récupère la clé du json à l'aide du nombre random
  return Object.keys(jsonData)[random]
}

/**
 * Retourne le nombre d'essai selon la difficulté
 * @param difficulty difficulté
 * @param next callback
 */
gameService.getRemainingTrial = function (difficulty, next) {
  switch (difficulty) {
    case 'hard':
      next(null, 2)
      break
    case 'medium':
      next(null, 4)
      break
    case 'easy':
      next(null, 6)
      break
    case 'sandbox':
      next(null, -1)
      break
    default:
      next(new Error('Difficulté inconnu'))
  }
}

module.exports = gameService
