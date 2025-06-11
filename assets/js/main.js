const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
let offset = 0
const limit = 9



function convertPokemonToLi(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">

                </div>
            </li>
        `
}

function loadPokemonItem(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('') 
        pokemonList.innerHTML += newHtml
    })
}
loadPokemonItem(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit
    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItem(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItem(offset, limit)
    }
    
})

//const listItems = []

//for (let i = 0; i < pokemons.length; i++) {
//    const pokemon = pokemons[i];
//    listItems.push(convertPokemonToLi(pokemon))
//}

//console.log(listItems)
//

//   .catch((error) => console.log(error))
//   .finally(() => console.log('Request completed'))



