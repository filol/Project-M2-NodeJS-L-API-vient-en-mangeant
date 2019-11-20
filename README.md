# LIMBA



## Analyser

BASHAR est une application web qui a pour but d’améliorer son niveau de langue (plusieurs langues seront disponibles). L’idée est de faire écouter à l’utilisateur des mots et de lui demander ensuite de les écrire. 



Le workflow classique suivra cette logique :

1. L’utilisateur devra d’abord se connecter/s’inscrire
2. Une fois connecté, il aura accès aux fonctionnalités de l’application
3. Il pourra commencer un entraînement, en choisissant son mode
4. Il pourra également consulter ses statistiques (réussite, échecs, progression …)
5. Il pourra consulter ses infos personnelles et les modifier (espace mon compte)



Il y a donc plusieurs sous-buts :



#### Compréhension orale 

Pour entraîner sa compréhension orale, l’utilisateur pourra écouter des mots, voire des phrases complètes. Nous utiliserons des voix différentes, pour éviter d’habituer un utilisateur à écouter toujours la même voix. Idéalement, les accents/origines des bots changeront. Après écoute, il écrira le mot qu’il pense avoir entendu.



#### Orthographe

L’entraînement de l’orthographe viendra compléter la compréhension orale.

En écrivant ce que l’utilisateur a entendu, il entraînera d’un côté son orthographe, mais aussi sa compréhension orale, étant donné qu’il devra transcrire ce qu’il comprend.



#### Comment attiser l’intérêt :

Il faut trouver des moyens d’attirer l’utilisateur une première fois, mais surtout ensuite de garder son attention et lui donner envie de continuer de s’entraîner. Ainsi, nous proposerons des modes de jeu différents, nous laisserons le choix de la langue et de la difficulté à l’utilisateur … 



## Concevoir

Plusieurs solutions sont possibles pour résoudre ces problèmes.



#### Authentification

Nous mettrons en place une authentification sécurisée, qui aura pour but principal de sauvegarder les scores et la progression d’un joueur. Il y aura 2 accès à l’application:

- un mode non connecté, où l’utilisateur aura uniquement accès à un mode de jeu
- un mode connecté, où l’utilisateur aura accès à l’application complète

Après cette étape, l’entraînement devient accessible. Il pourra réaliser ces actions.



#### Jouer une partie

L’utilisateur pourra jouer une partie. Le principe est simple :

1. Avant une partie, les choix de difficulté, modes, langues … sont laissés ouverts (changeables dans les réglages). Si l’utilisateur n’est pas connecté, il pourra choisir uniquement la langue sur laquelle il veut jouer.
2. Une série de mots/phrases est ensuite générée.
3. L’un après l’autre, chaque mot sera épelé, et l’utilisateur devra écrire le mot qu’il pense avoir entendu.
4. En fonction des modes, on affiche si le mot est bon ou pas, et on passe au suivant.
5. Quand tous les mots sont passés, on affiche le score final.



#### Attirer l'utilisateur

Pour garder l’intérêt de l’utilisateur, nous avons décidé d’implémenter plusieurs modes de jeu, plusieurs difficultés ainsi que plusieurs langues.

Liste des modes :

- bac à sable
- entrainement
- examen

Difficultés : 

- débutant 
- intermédiaire
- avancé



#### Scoring

Un système de scoring sera mis en place. Il sera basé sur le taux de réussite (par exemple nombre de mots réussis / nombre total de mots pour commencer).

Ces scores seront enregistrés et consultables à posteriori.



## Planifier

Pour notre projet, nous avons décidé de partir sur des sprints d’une semaine.

Voici la liste des tâches à accomplir dans le but d'obtenir une application fonctionnelle:

1. Design, architecture du site, choix des technologies pour le front, sitemap + wireframe des pages principales.
2. POC assez simple : un seul mode de jeu disponible (mode bac à sable), les joueurs ne peuvent pas créer de compte, les scores sont stockés en mémoire sur le front. Une seule difficulté. Possibilité de changer de langue. Un utilisateur ne peut pas créer de compte, il peut donc seulement jouer à notre appli.

Le POC a pour but avant tout de faire le lien entre notre BDD, notre back end et notre front end, ainsi que de tester la fonctionnalité principale de notre projet.

1. Mise en place des comptes utilisateurs, ajout d'une vue login/register. Les scores seront retenus dans la BDD. On conserve donc une trace des parties des joueurs connectés. Ajout d'un onglet profil qui permet de voir les historiques de parties ainsi que la progression. Ajout d'un onglet classement montrant les meilleurs joueurs suivant la langue (et par la suite suivant la difficulté)
2. Mise en place des différents modes de jeux
3. Mise en place des différentes difficultés



La première étape prendra une semaine. La seconde une semaine et demi. Idem pour la 3ème. Les deux dernières étapes prendront une semaine chacune. Donc un total de 6 semaines.

Une réunion sera faite à chaque fin de sprint pour voir ce qui a été fait, les points bloquants ou non, et revoir en conséquence notre planning pour ainsi donner de nouvelle tâche à chaque membre.

## Prototype

Notre prototype va contenir 2 fonctionnalités globales:

- Un espace membre (avec les différents paramètres du compte)
- Un espace apprentissage (pour apprendre des langues)



#### Espace membre

- Un utilisateur doit pouvoir s'inscrire ou se connecter sur le site internet avec un email et un mot de passe
- Un utilisateur doit pouvoir modifier son mot de passe (ou le récupérer)
- Un utilisateur doit pouvoir supprimer son compte
- Un utilisateur doit pouvoir sélectionner une langue à apprendre
- Un utilisateur doit pouvoir sélectionner son niveau dans la langue (parmi débutant - intermédiaire - avancé)



#### Espace apprentissage

- Un mode “bac à sable” : un mot d’un dictionnaire complet est choisi de façon aléatoire à chaque fois (pas de difficulté pour chaque mot). Ce mode sera potentiellement disponible sans inscription sur le site (afin d'appâter le visiteur). 
- Un mode entraînement: une série de 10 mots dans la langue et difficulté souhaitée va devoir être devinée et orthographiée correctement par l’utilisateur. Si l’utilisateur se trompe, l’application affichera le mot correct.
- Un mode examen: une série de 10 mots dans la langue et difficulté souhaitée va devoir être devinée et orthographiée correctement par l’utilisateur. A la fin de la session, la note sera sauvegardé.
