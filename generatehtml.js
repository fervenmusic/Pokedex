function createPokemonHTML(i) {
    return `<div class="main-card${i} nes-pointer main-card pokemon-card" onclick="openPokemonCard(${i})">
    <div class="pokemon-name-id-main">
        <h1 id="main-pokemon-name${i}"></h1>
        <h2 id="main-pokemon-id${i}"></h2>
    </div>
    <div class="pokemon-types-main">
        <a href="#" class="nes-badge">
            <span class="is-dark" id="main-pokemon-type1${i}"></span>
        </a>
        <a href="#" class="nes-badge">
            <span class="is-dark" id="main-pokemon-type2${i}"></span>
        </a>
    </div>
    <div class="pokemonImage-main">
        <img class="main-pokemon-image" id="main-pokemon-image${i}">
    </div>
</div>`;
}

function generatePokemonCardHTML(i) {
    let content = document.getElementById('pokedex');
    content.innerHTML = createPokemonCardTopCardHTML(i) + createPokemonCardHTML(i);
}

function createPokemonCardTopCardHTML(i) {
    return `
    <div class="top-card">
        <div class="header-card">
            <img src="icons/exit.svg" class="nes-pointer exit-img" onclick="returnToMainPage()">
            <img src="icons/heart.svg" class="nes-pointer">
        </div>
        <div class="pokemon-name-id">
            <h1 id="pokemon-name${i}"></h1>
            <h2 id="pokemon-id${i}"></h2>
        </div>
        <div class="pokemon-types">
            <a href="#" class="nes-badge">
             <span class="is-dark" id="pokemon-type1${i}"></span>
            </a>
         <a href="#" class="nes-badge">
             <span class="is-dark" id="pokemon-type2${i}"></span>
            </a>
        </div>
        <div class="pokemonImage">
            <img class="pokemon-image" id="pokemon-image${i}">
        </div>
    </div>`;
}

function createPokemonCardHTML(i) {
    return `
    <div class="bottom-card">

        <nav class="attribute-row">
            <button id="aboutTab" type="button" class="nes-btn is-primary nes-pointer"
                onclick="changeNavBarTab('about')">About</button>
            <button id="statsTab" type="button" class="nes-btn nes-pointer"
                onclick="changeNavBarTab('stats')">Stats</button>
            <button id="evolutionTab" type="button" class="nes-btn nes-pointer"
                onclick="changeNavBarTab('evolution')">Evolution</button>
            <button id="movesTab" type="button" class="nes-btn nes-pointer"
                onclick="changeNavBarTab('moves')">Moves</button>
        </nav>

        <div class="pokemon-info-about formatted">

            <div class="pokemon-description black">
                <span id="pokemon-description${i}"></span>
            </div>

            <div class="card-bottom-cont">
                <div class="height-weight-info-cont">
                    <span>Height</span>
                    <span>Weight</span>
                    <span>Abilities</span>
                </div>
                <div class="pokemon-api-block black">
                    <span id="pokemon-height${i}"></span>
                    <span id="pokemon-weight${i}"></span>
                    <div>
                        <span id="pokemon-abilities-1${i}"></span>
                        <span id="pokemon-abilities-2${i}"></span>
                        <span id="pokemon-abilities-3${i}"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="pokemon-info-stats hide formatted">
            <div class="card-bottom-cont-stats">
                <div class="stats-info-cont">
                    <span>HP</span>
                    <progress class="nes-progress" id="hp${i}" value="" max="255"></progress>
                </div>

                <div class="stats-info-cont">
                    <span>Attack</span>
                    <progress class="nes-progress" id="attack${i}" value="" max="255"></progress>
                </div>

                <div class="stats-info-cont">
                    <span>Defense</span>
                    <progress class="nes-progress" id="defense${i}" value="" max="255"></progress>
                </div>

                <div class="stats-info-cont">
                    <span>Special-Attack</span>
                    <progress class="nes-progress" id="special-attack${i}" value="" max="255"></progress>
                </div>

                <div class="stats-info-cont">
                    <span>Special-Defense</span>
                    <progress class="nes-progress" id="special-defense${i}" value="" max="255"></progress>
                </div>

                <div class="stats-info-cont">
                    <span>Speed</span>
                    <progress class="nes-progress" id="speed${i}" value="" max="255"></progress>
                </div>
            </div>
        </div>

        <div class="pokemon-info-evolution hide formatted">
            <div class="card-bottom-cont-evolution">
                <div class="height-weight-info-cont">
                    <div class="evolution-class">
                        <h3>Pokémon</h3>
                        <h3>Level-Up</h3>
                    </div>
                    <span id="pokemon-evolution1${i}">-</span>
                    <div class="evolution-class">
                        <span id="pokemon-evolution2${i}">-</span>
                        <span id="pokemon-evolution2-level${i}">-</span>
                    </div>
                    <div class="evolution-class">
                        <span id="pokemon-evolution3${i}">-</span>
                        <span id="pokemon-evolution3-level${i}">-</span>
                    </div>
                    <div class="evolution-class-text">
                    <span> If there's no level displayed, you'll have to find another way to evolve your Pokémon!</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="pokemon-info-moves hide formatted">
            <div class="card-bottom-cont-moves">
                <div class="height-weight-info-cont">
                    <span id="pokemon-moves1${i}">-</span>
                    <span id="pokemon-moves2${i}">-</span>
                    <span id="pokemon-moves3${i}">-</span>
                    <span id="pokemon-moves4${i}">-</span>
                </div>
            </div>
        </div>
    </div>
    `;
}