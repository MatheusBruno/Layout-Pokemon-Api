const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map(resultado => resultado.type.name)
    const [type] = types //pega o primeiro parementro do array
    pokemon.types = types
    pokemon.type = type
    pokemon.imgPhoto = pokeDetail.sprites.other.dream_world.front_default
    return pokemon
    // converte os dados da API para um classe
}

pokeApi.getPokemonsDetail = (pokemons) => {
    return fetch(pokemons.url)
    .then(result => result.json()) // retirna uma lista com todos atributo do array
    .then(resultado => convertPokeApiDetailToPokemon(resultado)) // seta os detalhes dentro do conversor de class
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    .then(result => result.json()) // Conversão para Json
    .then(result => result.results) // Acessamos o paramentro individual dentro de results
    .then(result => result.map((pokemons) => pokeApi.getPokemonsDetail(pokemons))) // Obtem as url da Api e transforma em Json os dados de links
    .then(result => Promise.all(result)) // Vai obter os dados de cada link que foi gerado pela função map em cima
    .then(result => result) // Retorna uma lista de objetos com seus dados
    .catch(error => console.log(error)) // Informa o erro
}