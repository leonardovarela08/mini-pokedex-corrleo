/**
 * Exercice : Mini Pokédex
 * @author Leonardo Varela <steve.fallet@dvitec.ch>
 * @since 2026-10-08
 */

'use strict';

// Couleur par défaut pour les types de Pokémon non définis
const DEFAULT_COLOR = '#ccc';

// Couleurs pour chaque type de Pokémon
const typeColors = {
    'Électrique': '#FFD700',
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Eau': '#6890F0',
    'Normal': '#A8A878',
    'Fée': '#EE99AC',
    'Spectre': '#705898',
    'Combat': '#C03028',
    'Vol': '#A890F0',
    'Glace': '#98D8D8',
    'Roche': '#B8A038',
    'Sol': '#E0C068',
    'Psy': '#F85888'
};

// Tableau d'objets représentant les Pokémon
const pokemons = [
    { name: 'Pikachu', type: 'Électrique', level: 35, img: 'pikachu.png' },
    { name: 'Bulbizarre', type: 'Plante,Poison', level: 15, img: 'bulbizarre.png' },
    { name: 'Salamèche', type: 'Feu', level: 20, img: 'salameche.png' },
    { name: 'Carapuce', type: 'Eau', level: 10, img: 'carapuce.png' },
    { name: 'Rondoudou', type: 'Normal,Fée', level: 25, img: 'rondoudou.png' },
    { name: 'Ectoplasma', type: 'Spectre,Poison', level: 45, img: 'ectoplasma.png' },
    { name: 'Évoli', type: 'Normal,Combat', level: 22, img: 'evoli.png' },
    { name: 'Dracaufeu', type: 'Feu,Vol', level: 50, img: 'dracaufeu.png' },
    { name: 'Florizarre', type: 'Plante,Poison', level: 55, img: 'florizarre.png' },
    { name: 'Tortank', type: 'Eau', level: 52, img: 'tortank.png' },
    { name: 'Mélofée', type: 'Fée', level: 18, img: 'melofee.png' },
    { name: 'Raichu', type: 'Électrique', level: 40, img: 'raichu.png' },
    { name: 'Magicarpe', type: 'Eau', level: 5, img: 'magicarpe.png' },
    { name: 'Lokhlass', type: 'Eau,Glace', level: 35, img: 'lokhlass.png' },
    { name: 'Onix', type: 'Roche,Sol', level: 30, img: 'onix.png' },
    { name: 'Ronflex', type: 'Normal', level: 45, img: 'ronflex.png' },
    { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' }
];


function displayPokemons (listePokemons = pokemons) {
    const pokemonCont = document.querySelector(".pokemon-container");
    pokemonCont.innerHTML = '';



    if (listePokemons.length === 0) {
        pokemonCont.innerHTML = '<p>Dracaufeu a tout brûlé, aucun Pokémon ne correspond à ta recherche !</p>';
    }

    for(const pokemon of listePokemons) {
        pokemonCont.innerHTML += generatePokemonCardHTML(pokemon);
    }
}

function generatePokemonCardHTML(pokemon) {
    const types = pokemon.type.split(",").map(type => type.trim());

    const color1 = typeColors[types[0]] || DEFAULT_COLOR;
    const color2 = typeColors[types[1]] || DEFAULT_COLOR;

    const bgColor = types.length === 2
        ? `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`
        : color1;

    return `
    <div class="pokemon-card" style="background: ${bgColor};">
      <img src="images/${pokemon.img}" alt="${pokemon.name}">
      <h2>${pokemon.name}</h2>
      <div>Type: ${types.join(", ")}</div>
      <div>Niveau: ${pokemon.level}</div>
    </div>
  `;
}


const searchBar = document.getElementById("search-bar");
const typeFilter = document.getElementById("type-filter");
const sortOrder = document.getElementById("sort-order");

function filterAndSortPokemons() {
    const recherche = searchBar.value.toLowerCase();
    const typeChoisi = typeFilter.value;
    const ordre = sortOrder.value;

    let pokemonFiltres = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(recherche)
    );

    if (typeChoisi !== "") {
        pokemonFiltres = pokemonFiltres.filter(pokemon =>
            pokemon.type
                .split(",")
                .map(type => type.trim())
                .includes(typeChoisi)
        );
    }

    // Trier les Pokémon déjà filtrés
    pokemonFiltres.sort((a, b) => {
        switch (ordre) {
            case "name-asc":
                return a.name.localeCompare(b.name);

            case "name-desc":
                return b.name.localeCompare(a.name);

            case "level-asc":
                return a.level - b.level;

            case "level-desc":
                return b.level - a.level;

            default:
                return 0;
        }
    });

    displayPokemons(pokemonFiltres);
}


searchBar.addEventListener('input', filterAndSortPokemons);
typeFilter.addEventListener('change', filterAndSortPokemons)
sortOrder.addEventListener('change', filterAndSortPokemons);

displayPokemons()

filterAndSortPokemons()