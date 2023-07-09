const myRequest = new Request("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
let buttonLeadMore = document.getElementById("loadMoreButtom")
const elementoHtmlListPokemon = document.getElementById('pokemonList')
const elementoPai = document.getElementById('content-x')

const elementoBody = document.body;

let limit = 10
let offset = 0
const maxRecords = 151

function elementHtmlPokeminIndividual(pokemon){
    return `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="../assets/css/pokemonpag.css">
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            />
            <title>Document</title>
        </head>
        <body>
            <section id="section-inicial" class="${pokemon.type}">
            <div class="divTop">
                <img onclick="backMain()" src="../assets/img/de-volta.png">
                <img src="../assets/img/coracao.png">
            </div>

            <div class="divMid">
                <div class="divInfo">
                <h2>${pokemon.name}</h2>
                <span>#${pokemon.number}</span>
                </div>

                <ol>
                ${pokemon.types.map(reposta => `<li class="${reposta.type}li">${reposta}</li>`).join("")}
                </ol>

                <div class="divInfoImg">
                <img src="${pokemon.imgPhoto}" alt="${pokemon.name}">
                </div>
                
            </div>

            <div class="divBottom">
                <h3>Name: ${pokemon.name}</h3>
                <ol>
                ${pokemon.abillity.map(reposta => `<li>Habilidade: ${reposta}</li>`).join("")}
                </ol>
            </div>
            </section>


            <script src="../assets/js/pokemon-model.js"></script>
            <script src="../assets/js/poke-api.js"></script>
            <script src="../assets/js/main.js"></script>
        </body>
        </html>
    `
}

function backMain(){
    document.location.reload()
}

function salvaDados(id){
    elementoPai.parentElement.removeChild(elementoPai)
    pokeApi.directNewPagPokemon(id).then(reposta => elementoBody.innerHTML = elementHtmlPokeminIndividual(reposta))
    
}


function loadPokemonItens(offset, limit){

    function pokemonsHtml(pokemons){
        return `
                <li class="pokemom ${pokemons.type}" onclick='salvaDados(${pokemons.number})'>
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
