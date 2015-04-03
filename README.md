# tupreferes
Tu preferes est une application nodejs permettant de jouer au jeu tu preferes

### API
* `POST /api/story/create` Permet de crée une story
    * `author` Le nom de l'auteur (optionel)
    * `theme` le thème de la story (optionel)
    * `prefere1` le tupreferes 1
    * `prefere2` le tupreferes 2
* `POST /api/story/vote/:id` Permet de voter pour une story
    * `prefer` La story préférée (1 || 2)
* `GET /api/story` Retourne toutes les story
* `GET /api/story/random` Retourne une story aléatoirement qui n'a pas encore été vu par la session
* `GET /api/story/:id` Retourne une story