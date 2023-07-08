const myRequest = new Request("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
let buttonLeadMore = document.getElementById("loadMoreButtom")
const elementoHtmlListPokemon = document.getElementById('pokemonList')
let limit = 10
let offset = 0
const maxRecords = 151

// function pokemonsHtml(pokemons){
//     return `
//             <li class="pokemom ${pokemons.type}">
//                 <span class="number">#${pokemons.number}</span>
//                 <span class="name">${pokemons.name}</span>
                
//                 <div class="detail">
//                     <ol class="types">
//                         ${pokemons.types.map((resultado) => `<li class="type ${resultado}li">${resultado}</li>`).join("")}
//                     </ol>

//                     <img src="${pokemons.imgPhoto}" alt="${pokemons.name}">
//                 </div>
                
//             </li>
    
//     `
// }

function loadPokemonItens(offset, limit){

    function pokemonsHtml(pokemons){
        return `
                <li class="pokemom ${pokemons.type}">
                    <span class="number">#${pokemons.number}</span>
                    <span class="name">${pokemons.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemons.types.map((resultado) => `<li class="type ${resultado}li">${resultado}</li>`).join("")}
                        </ol>
    
                        <img src="${pokemons.imgPhoto}" alt="${pokemons.name}">
                    </div>
                    
                </li>
        
        `
    }

    pokeApi.getPokemons(offset, limit).then((repostt = []) => {

        elementoHtmlListPokemon.innerHTML += repostt.map(pokemon => pokemonsHtml(pokemon)).join('');
     
    })
}

loadPokemonItens(offset, limit)

buttonLeadMore.addEventListener("click", () => {
    offset += limit

    const qtdRecordNexPage = offset + limit

    if(qtdRecordNexPage >= 150){
        const newLine = maxRecords - offset
        loadPokemonItens(offset, newLine)

        buttonLeadMore.parentElement.removeChild(buttonLeadMore)
    }else{
        loadPokemonItens(offset, limit)
    }
    
})