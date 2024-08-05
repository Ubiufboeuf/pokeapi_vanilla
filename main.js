import './style.css'
import './pokeCard.css'
import './floatCard.css'

const LIMIT = "limit=1"

const app = document.querySelector('#app')


async function getFirstPokemons(limit) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${limit}`)
  const data = await response.json()
  return data
}

async function getPokemonsData({ name, url, idx }) {
  const response = await fetch(url)
  const data = await response.json()
  console.log(name, data)
  const { sprites, id } = data
  return { name, sprites, url, id }
}

async function createFloatCard(pokemon, sprites, url, id) {
  const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
  const data = await response.json()
  console.log(data)
  /* do {
  
  } while () */
  const evolutions = id
  const article = document.createElement("article")
  article.innerHTML = `
    <div id="img-wrapper">
      <img src=${sprites.front_default} />
    </div>
    <h1>${pokemon}</h1>
    <div class="space"></div>
    <section>
      <h2>Cadena de evolución</h2>
      <div>
        ${evolutions}
      </div>
    </section>
  `
  article.classList.add("floatCard")

  app.append(article)
}

async function createCards() {
  function handleClick(pokemon, sprites, url, id) {
    createFloatCard(pokemon, sprites, url, id)
  }

  let firstPokemons = await getFirstPokemons(LIMIT)
  // console.log(firstPokemons)
  firstPokemons.results.map(async (resultado, idx) => {
    const pokemonData = await getPokemonsData({ name: resultado.name, url: resultado.url, idx: idx })
    const pokeCard = document.createElement("article")
    pokeCard.setAttribute("href", pokemonData.url)
    pokeCard.classList.add("pokeCard")
    pokeCard.innerHTML = `
      <aside>
        <img src=${pokemonData.sprites.front_default} />
      </aside>
      <main>
        <h1>${pokemonData.name}</h1>
      </main>
    `
    pokeCard.addEventListener("click", () => { handleClick(pokemonData.name, pokemonData.sprites, pokemonData.url, pokemonData.id) })

    app.append(pokeCard)
  })
}

createCards()