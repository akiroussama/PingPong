Objectif: Implémenter le gestionnaire de connexions.
1. Préparation des Tests
Nous allons créer des fichier de tests  qui couvriront les éléments suivants :

Le gestionnaire de connexions est un Singleton.
La Factory crée des instances de connexions selon le type.
La connexion 'MySQL' peut être créée.
La connexion 'PostgreSQL' peut être créée.
Toutes les connexions créées par la Factory héritent de la classe de base 'Connection'.
Le gestionnaire de connexions stocke les connexions créées.
Le gestionnaire de connexions renvoie la même instance lorsqu'il est appelé plusieurs fois.
La méthode connect() est disponible sur les instances de connexion.
La méthode disconnect() est disponible sur les instances de connexion.
Les connexions peuvent être fermées via le gestionnaire.
Le gestionnaire peut fournir une liste des connexions actives.
Les connexions ont une propriété 'type' correspondant au type de base de données.
La Factory lève une exception pour un type de connexion inconnu.
Le gestionnaire empêche la création manuelle de nouvelles instances.
Les méthodes du gestionnaire sont correctement définies.
Les connexions peuvent exécuter des requêtes simulées.
La connexion 'SQLite' peut être créée via la Factory.
Les connexions gardent une trace de leur état (connecté/déconnecté).
Le comportement est conforme au pattern Singleton.
Le comportement est conforme au pattern Factory.