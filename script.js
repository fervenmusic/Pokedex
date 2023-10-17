showLoadingScreen();
const typesColor = {
    "normal": [168, 168, 120],
    "fire": [240, 128, 48],
    "water": [104, 144, 240],
    "grass": [65, 190, 163], // 120, 200, 80
    "electric": [248, 208, 48],
    "ice": [152, 216, 216],
    "fighting": [192, 48, 40],
    "poison": [160, 64, 160],
    "ground": [224, 192, 104],
    "flying": [168, 144, 240],
    "psychic": [248, 88, 136],
    "bug": [168, 184, 32],
    "rock": [184, 160, 56],
    "ghost": [112, 88, 152],
    "dragon": [112, 56, 248],
    "dark": [112, 88, 72],
    "steel": [184, 184, 208],
    "fairy": [240, 182, 188],
};

let lastLoadedPokemonId = 20;
const pokemonsData = {};

async function loadPokemonEvolutionChainByUrl(url) {
    let response = await fetch(url);
    return response.json();
}

async function loadPokemonDetails(i) {
    let url = `https://pokeapi.co/api/v2/pokemon-species/${i}`;
    let response = await fetch(url);
    return response.json();
}

async function loadPokemon(start = 1, end = 20) {
    let content = document.getElementById('main-cards');

    // load first 20 Pokemon
    for (let i = start; i <= end; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        let currentPokemonDescription = await loadPokemonDetails(i); // fetch pokemon details (description)
        // https://pokeapi.co/api/v2/pokemon-species/${i}
        let evolutionChainUrl = currentPokemonDescription['evolution_chain']['url'];  // get correct evolution chain url
        // e.g. https://pokeapi.co/api/v2/evolution-chain/1/
        let currentPokemonEvolution = await loadPokemonEvolutionChainByUrl(evolutionChainUrl);  // fetch using the correct url

        pokemonsData[i] = {
            basicInfo: currentPokemon,
            description: currentPokemonDescription,
            evolution: currentPokemonEvolution
        };

        content.innerHTML += createPokemonHTML(i);
        renderPokemonInfoStartup(pokemonsData, i);
    }
    document.getElementById("loadingScreen").style.display = "none";
}

async function loadMorePokemon() {
    // pokeball disable
    const pokeballIcon = document.getElementById("load-pokeball");
    pokeballIcon.classList.add('disabled');

    // Disable the container of the Pokemon cards
    const content = document.getElementById('main-cards');
    content.classList.add('disabled-container');

    lastLoadedPokemonId += 1; // start from the next pokemon after last one loaded
    let endId = lastLoadedPokemonId + 19; // load next 20 pokemon
    await loadPokemon(lastLoadedPokemonId, endId);
    lastLoadedPokemonId = endId; // update last loaded pokemon ID

    // pokeball enable
    pokeballIcon.classList.remove('disabled');
    
    // Enable the container of the Pokemon cards
    content.classList.remove('disabled-container');
}



function showLoadingScreen() {
    document.getElementById("loadingScreen").style.display = "flex";
}

function renderPokemonInfoStartup(pokemonsData, i) {
    document.getElementById(`main-pokemon-name${i}`).innerHTML = (pokemonsData[i].basicInfo['name'].capitalize());
    document.getElementById(`main-pokemon-id${i}`).innerHTML = '#00' + pokemonsData[i].basicInfo['id'];
    document.getElementById(`main-pokemon-image${i}`).src = pokemonsData[i].basicInfo['sprites']['other']['home']['front_default'];
    renderPokemonTypesStartup(i);
    adjustBackgroundColor(i);
}

function renderPokemonStats(i) {
    document.getElementById(`hp${i}`).value = pokemonsData[i].basicInfo['stats'][0]['base_stat'];
    document.getElementById(`attack${i}`).value = pokemonsData[i].basicInfo['stats'][1]['base_stat'];
    document.getElementById(`defense${i}`).value = pokemonsData[i].basicInfo['stats'][2]['base_stat'];
    document.getElementById(`special-attack${i}`).value = pokemonsData[i].basicInfo['stats'][3]['base_stat'];
    document.getElementById(`special-defense${i}`).value = pokemonsData[i].basicInfo['stats'][4]['base_stat'];
    document.getElementById(`speed${i}`).value = pokemonsData[i].basicInfo['stats'][5]['base_stat'];
}

function renderPokemonEvolution(i) {
    const evolution = pokemonsData[i].evolution['chain'];
    // get first pokemon in evolution chain
    document.getElementById(`pokemon-evolution1${i}`).innerHTML = evolution['species']['name'].capitalize();
    // get second pokemon in evolution chain
    if (evolution['evolves_to'].length >= 1) {
        document.getElementById(`pokemon-evolution2${i}`).innerHTML = evolution['evolves_to'][0]['species']['name'].capitalize();
        document.getElementById(`pokemon-evolution2-level${i}`).innerHTML = evolution['evolves_to'][0]['evolution_details'][0]['min_level'];
        // get third pokemon in evolution chain
        if (evolution['evolves_to'][0]['evolves_to'].length >= 1) {
            document.getElementById(`pokemon-evolution3${i}`).innerHTML = evolution['evolves_to'][0]['evolves_to'][0]['species']['name'].capitalize();
            document.getElementById(`pokemon-evolution3-level${i}`).innerHTML = evolution['evolves_to'][0]['evolves_to'][0]['evolution_details'][0]['min_level'];
        } else { // no third pokemon in evolution chain innerHTML = '-'
            document.getElementById(`pokemon-evolution3${i}`).innerHTML = '-';
        }
    } else { // no second or third pokemon in evolution chain innerHTML = '-'
        document.getElementById(`pokemon-evolution2${i}`).innerHTML = '-';
        document.getElementById(`pokemon-evolution3${i}`).innerHTML = '-';
    }
}

function renderPokemonMoves(i) {
    let moves = pokemonsData[i].basicInfo['moves'];

    if (moves.length < 4) {
        console.error("This Pokémon has less than 4 moves!");
        return;
    }
    // Randomly pick 4 unique indices
    let randomIndices = [];
    while (randomIndices.length < 4) {
        let rnd = Math.floor(Math.random() * moves.length);
        if (!randomIndices.includes(rnd)) {
            randomIndices.push(rnd);
        }
    }
    document.getElementById(`pokemon-moves1${i}`).innerHTML = moves[randomIndices[0]]['move']['name'].capitalize();
    document.getElementById(`pokemon-moves2${i}`).innerHTML = moves[randomIndices[1]]['move']['name'].capitalize();
    document.getElementById(`pokemon-moves3${i}`).innerHTML = moves[randomIndices[2]]['move']['name'].capitalize();
    document.getElementById(`pokemon-moves4${i}`).innerHTML = moves[randomIndices[3]]['move']['name'].capitalize();
}

function renderPokemonTypesStartup(i) {
    const types = pokemonsData[i].basicInfo['types'];

    if (types.length >= 1) {
        document.getElementById(`main-pokemon-type1${i}`).innerHTML = (types[0]['type']['name'].capitalize());
    }
    if (types.length >= 2) {
        document.getElementById(`main-pokemon-type2${i}`).innerHTML = (types[1]['type']['name'].capitalize());
    }
}

function renderPokemonTypesCard(i) {
    const types = pokemonsData[i].basicInfo['types'];

    if (types.length >= 1) {
        document.getElementById(`pokemon-type1${i}`).innerHTML = (types[0]['type']['name'].capitalize());
    }
    if (types.length >= 2) {
        document.getElementById(`pokemon-type2${i}`).innerHTML = (types[1]['type']['name'].capitalize());
    }
}

function renderPokemonAbilities(i) {
    const abilities = pokemonsData[i].basicInfo['abilities'];

    if (abilities.length >= 1) { // Pokemon has an ability -> change innerHTML to the ability
        document.getElementById(`pokemon-abilities-1${i}`).innerHTML = abilities[0]['ability']['name'].capitalize();

        if (abilities.length >= 2) { // second ability
            document.getElementById(`pokemon-abilities-1${i}`).innerHTML += ',';
            document.getElementById(`pokemon-abilities-2${i}`).innerHTML = abilities[1]['ability']['name'].capitalize();
        } else { // no second ability - empty out
            document.getElementById(`pokemon-abilities-2${i}`).innerHTML = '';
        }

        if (abilities.length >= 3) { // third ability
            document.getElementById(`pokemon-abilities-2${i}`).innerHTML += ',';
            document.getElementById(`pokemon-abilities-3${i}`).innerHTML = abilities[2]['ability']['name'].capitalize();
        } else { // no third ability - empty out
            document.getElementById(`pokemon-abilities-3${i}`).innerHTML = '';
        }
    }
}


function renderPokemonDescription(i) {
    const pokemonDescription = pokemonsData[i].description;
    const flavorTextEntries = pokemonDescription['flavor_text_entries']; // description

    // go through flavor_text_entries, look for entries with language 'en' key and stop when found 
    for (let j = 0; j < flavorTextEntries.length; j++) {
        if (flavorTextEntries[j]['language']['name'] === 'en') {
            let cleanedText = flavorTextEntries[j]['flavor_text'].replace(/\u000c/g, '');  // replacing the form feed character with a space (bug in pokemon description)

            document.getElementById(`pokemon-description${i}`).innerHTML = cleanedText;
            break; // Stopping when language "en" is found
        }
    }
}

function renderPokemonDetails(i) {
    document.getElementById(`pokemon-name${i}`).innerHTML = (pokemonsData[i].basicInfo['name'].capitalize());
    document.getElementById(`pokemon-id${i}`).innerHTML = '#00' + pokemonsData[i].basicInfo['id'];
    document.getElementById(`pokemon-image${i}`).src = pokemonsData[i].basicInfo['sprites']['other']['home']['front_default'];
    document.getElementById(`pokemon-height${i}`).innerHTML = pokemonsData[i].basicInfo['height'] / 10 + 'm';
    document.getElementById(`pokemon-weight${i}`).innerHTML = pokemonsData[i].basicInfo['weight'] / 10 + 'kg';
}

function renderPokemonInfo(i) {
    renderPokemonDetails(i);
    renderPokemonAbilities(i);
    renderPokemonDescription(i)
    renderPokemonMoves(i);
    renderPokemonEvolution(i);
    renderPokemonStats(i);
    adjustBackgroundColor(i);
}

function openPokemonCard(i) {
    // open pokedex card
    document.getElementById('pokedex').innerHTML = createPokemonCardTopCardHTML(i) + createPokemonCardHTML(i);
    renderPokemonTypesCard(i);
    renderPokemonInfo(i);
    document.getElementById('main-container').classList.remove('hide');
    document.getElementById('popup').classList.remove('hide');
    document.body.classList.add('overflow');
}

function returnToMainPage() {
    document.getElementById('main-container').classList.add('hide');
    document.getElementById('popup').classList.add('hide');
    document.body.classList.remove('overflow');
}

function searchPokemon() { // only for rendered pokemons
    // input value field = searchValue
    let searchValue = document.getElementById("name_field").value.toLowerCase();
    // pokemon filter based on search value
    let results = Object.values(pokemonsData).filter(pokemon => pokemon.basicInfo.name.toLowerCase().includes(searchValue));
    displaySearchResults(results);
}

function displaySearchResults(results) {
    let content = document.getElementById('main-cards');
    content.innerHTML = "";  // Clear the previous display

    results.forEach(pokemon => {
        let id = pokemon.basicInfo.id;
        content.innerHTML += createPokemonHTML(id);
        renderPokemonInfoStartup(pokemonsData, id);
    });
}

function adjustBackgroundColor(i) {
    const mainCards = document.getElementsByClassName(`main-card${i}`);
    const pokedex = document.getElementById('pokedex');
    const pokemonType = pokemonsData[i].basicInfo['types'][0]['type']['name'];

    if (typesColor[pokemonType]) { // z.B. water[water]
        const [red, green, blue] = typesColor[pokemonType];
        const backgroundColor = `rgb(${red}, ${green}, ${blue})`;

        // Apply backgroundColor to all elements with the class main-card if pokemonType matches typesColor
        for (const mainCard of mainCards) {
            mainCard.style.backgroundColor = backgroundColor;
        }
        pokedex.style.backgroundColor = backgroundColor;
    }
}

function changeNavBarTab(tabName) {
    // Get all tab buttons and tab content elements
    const tabButtons = document.querySelectorAll('.nes-btn');
    const tabContents = document.querySelectorAll('.pokemon-info-about, .pokemon-info-stats, .pokemon-info-evolution, .pokemon-info-moves');

    // Remove 'is-primary' class from all tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('is-primary');
    });

    // Hide all tab content elements
    tabContents.forEach(content => {
        content.classList.add('hide');
    });

    if (tabName === 'about') {
        // Special handling for the about tab
        const aboutTabButton = document.getElementById('aboutTab');
        aboutTabButton.classList.add('is-primary');
        const aboutTabContent = document.querySelector('.pokemon-info-about');
        aboutTabContent.classList.remove('hide');
    } else {
        // Add 'is-primary' to the clicked tab button
        const selectedTabButton = document.getElementById(tabName + 'Tab');
        if (selectedTabButton) {
            selectedTabButton.classList.add('is-primary');
        }

        // Show the tab content
        const selectedTabContent = document.querySelector('.pokemon-info-' + tabName);
        if (selectedTabContent) {
            selectedTabContent.classList.remove('hide');
        }
    }
}

// Capitalize first letter .capitalize();
Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const loadPokemonContainer = document.querySelector(".load-pokemon-container");
const nameField = document.getElementById("name_field");
nameField.addEventListener("input", handleInput);

function handleInput() {
    let inputValue = nameField.value.trim();

    if (inputValue) { // If there's any input
        loadPokemonContainer.style.display = "none";
    } else {
        loadPokemonContainer.style.display = "";
    }
}

// Go by to main page by clicking the background
document.addEventListener('DOMContentLoaded', function () {
    // Grabbing the elements
    var popup = document.getElementById('popup');
    var mainContainer = document.getElementById('main-container');
    var popupBackground = document.querySelector('.popup-background');

    // Event listener to close the popup when the background is clicked
    popupBackground.addEventListener('click', function () {
        popup.classList.add('hide');
        mainContainer.classList.remove('hide');
        document.body.classList.remove('overflow');
    });

    // Prevent event from bubbling up when the popup content is clicked
    mainContainer.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});

let mybutton = document.getElementById("arrowButton");
document.getElementById("name_field").addEventListener("keyup", searchPokemon);