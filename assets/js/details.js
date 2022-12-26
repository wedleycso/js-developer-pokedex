const pokeDetail = {}
const pokemonId = new URLSearchParams(window.location.search).get("id");
const pokemonDescription = document.getElementById('paginaDetalhes')

function convertPokeApiDetailPokemonMoreInfo(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.base_experience = pokeDetail.base_experience
    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    pokemon.hp = stats[0]
    pokemon.attack = stats[1]
    pokemon.defense = stats[2]
    pokemon.special_attack = stats[3]
    pokemon.special_defense = stats[4]
    pokemon.speed = stats[5]
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.abilities = abilities
    return pokemon
}


pokeDetail.getPokemonDetail = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailPokemonMoreInfo)
        .catch((error) => console.log(error))
}

function convertPokemonToHTML(pokemon) {
    return `
    <div class="parteDeCima ${pokemon.type}" >
                <header>
                    <a href="index.html"><img src="./assets/images/left-arrow-svgrepo-com.svg" alt="voltar" id="flecha"></a>
                </header>
                <div class="infoGeral">
                <span class="number">#${pokemon.number}</span>
                <h1 class="nome">${pokemon.name}</h1>
                
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(``)} 
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.number}.svg" alt="${pokemon.name}">
                </div>
            </div>
            <div class="parteDeBaixo">
            <div class="about">
            <h3>Abilities</h3>
                <ol class="abilities">
                    ${pokemon.abilities.map((ability) => `<li class="ability">${ability}</li>`).join(``)} 
                </ol>
                <h3>About</h3>
                <table>
                <tr>
                    <th class="caracteristica">Height</th>
                    <th>${pokemon.height}</th>
                </tr>
                <tr>
                    <th class="caracteristica">Weight</th>
                    <th>${pokemon.weight}</th>
                </tr> 
                <tr>
                    <th class="caracteristica">Base experience</th>
                    <th>${pokemon.base_experience}</th>
                </tr> 
                </table>
                <h3>Stats</h3>
                <table>
                    <tr>
                        <th class="caracteristica">HP</th>
                        <th>${pokemon.hp}</th>
                        <th><div class="statsBar" style="width: calc((${pokemon.hp}/100)*6.25rem);" ></div></th>
                        
                    </tr>
                    <tr>
                        <th class="caracteristica">Attack</th>
                        <th>${pokemon.attack}</th>
                        <th><div class="statsBar" style="width: calc((${pokemon.attack}/100)*6.25rem);" ></div></th>
                    </tr>
                    <tr>
                        <th class="caracteristica">Defense</th>
                        <th>${pokemon.defense}</th>
                        <th><div class="statsBar" style="width: calc((${pokemon.defense}/100)*6.25rem);" ></div></th>
                    </tr>
                    <tr>
                        <th class="caracteristica">Special-attack</th>
                        <th>${pokemon.special_attack}</th>
                        <th><div class="statsBar" style="width: calc((${pokemon.special_attack}/100)*6.25rem);" ></div></th>
                    </tr>
                    <tr>
                        <th class="caracteristica">Special-defense</th>
                        <th>${pokemon.special_defense}</th>
                        <th><div class="statsBar" style="width: calc((${pokemon.special_defense}/100)*6.25rem);" ></div></th>
                    </tr>
                    <tr>
                        <th class="caracteristica">Speed</th>
                        <th>${pokemon.speed}</th>
                        <th><div class="statsBar" style="width: calc((${pokemon.speed}/100)*6.25rem);" ></div></th>
                    </tr>
                </table>
                
            </div>
            </div>
        </section>
    `
}
pokeDetail.getPokemonDetail().then((pokemon) => {
    pokemonDescription.innerHTML = convertPokemonToHTML(pokemon)
})