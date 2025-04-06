# Poké Pocket Promos Backend

The backend for Poké Pocket Promos which contains data for promo cards in Pokémon TCG Pocket. This is part of my final project for CSCE 242 Web Applications at the University of South Carolina.

![A website show on different devices](./ppp-mockup.png)

## Frontend

🌐 [App](https://not-josue.github.io/poke-pocket-promos/)

📁 [Repo](https://github.com/not-josue/poke-pocket-promos)

## API

- Different JSONs for Pokémon, Items, Supporters, & Releases.
- "id" is relative to the entire promo list
- Uses a free deployment on [Render.com](https://render.com/) so may take up to 15 minutes to render.
- Updated up to Shining Revelry.

### Pokémon Resource

#### Cards with no Flavored Text

```js
{
    "id": 9,
    "type": "Pokemon",
    "name": "Pikachu",
    "stats": {
      "hp": "60",
      "type": "lightning",
      "stage": "Basic"
    },
    "attacks": [
      {
        "costs": [
          {
            "type": "lightning",
            "amount": 1
          }
        ],
        "name": "Gnaw",
        "value": "20"
      }
    ],
    "weakness": "fighting",
    "retreat": 1,
    "description": "When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.",
    "set": "Genetic Apex",
    "artist": "Atsushi Furusawa",
    "image": "/images/promos/promo09.webp"
  }
```

#### Cards with Flavored Text for Abilities, Status Conditions, Coin Flips, etc.

```js
{
    "id": 13,
    "type": "Pokemon",
    "name": "Butterfree",
    "stats": {
        "hp": "120",
        "type": "grass",
        "stage": "Stage 2"
    },
    "attacks": [
        {
        "name": "Ability: Powder Heal",
        "description": "Once during your turn, you may heal 20 damage from each of your Pokémon."
        },
        {
        "costs": [
            {
            "type": "grass",
            "amount": 1
            },
            {
            "type": "normal",
            "amount": 2
            }
        ],
        "name": "Gust",
        "value": "60"
        }
    ],
    "weakness": "fire",
    "retreat": 1,
    "description": "In battle, it flaps its wings at great speed to release highly toxic dust into the air.",
    "set": "Genetic Apex",
    "artist": "miki kudo",
    "image": "/images/promos/promo13.webp"
}
```

### Item Resource

The only ones released during the time of this are the ones you buy in the Shop.

```js
{
    "id": 1,
    "type": "Item",
    "name": "Potion",
    "action": "Heal 20 damage from 1 of your Pokémon.",
    "description": "You may play any number of item cards during your turn.",
    "set": "Genetic Apex",
    "artist": "5ban Graphics",
    "image": "/images/promos/promo01.webp"
}
```

### Supporter Resource

The only one released during the time of this is "Professor's Research."

```js
{
    "id": 7,
    "type": "Supporter",
    "name": "Professor's Research",
    "action": "Draw 2 cards.",
    "description": "You may play only 1 Supporter card during your turn",
    "set": "Genetic Apex",
    "artist": "Naoki Saito",
    "image": "/images/promos/promo07.webp"
}
```

### Releases Resource

Consists of the different sets that have been released. Gives the date in which the set was released, the total number of cards, a link to a YouTube embed. The promo videos from the Official Pokémon Channel weren't shareable? so used the ones from IGN.

```js
{
    "id": 1,
    "name": "Genetic Apex",
    "cards": 226,
    "date": "10/30/24",
    "description": "Genetic Apex is the base set released in Pokémon TCG Pocket. It features 3 themed booster packs: Charizard, Mewtwo, and Pikachu with each containing cards exclusive to their theme. The majority of the cards are from Generation 1, but the set also features some Pokémon from other Generations.",
    "url": "https://www.youtube.com/embed/ttIlVC9tKOs?si=3FUtQ9M64EAQQfOj"
}
```
