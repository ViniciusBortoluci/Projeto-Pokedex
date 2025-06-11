

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json()) 
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) 
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)      

        .catch((error) => console.log(error))
}

Promise.all([
    pokeApi.getPokemons('https://pokeapi.co/api/v2/pokemon/1'),
    pokeApi.getPokemons('https://pokeapi.co/api/v2/pokemon/2'),
    pokeApi.getPokemons('https://pokeapi.co/api/v2/pokemon/3'),
    pokeApi.getPokemons('https://pokeapi.co/api/v2/pokemon/4'),
    pokeApi.getPokemons('https://pokeapi.co/api/v2/pokemon/5'),
    pokeApi.getPokemons('https://pokeapi.co/api/v2/pokemon/6'),
]).then((results) => {
    console.log(results)
})