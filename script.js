const pokemonName = document.querySelector('.pokemon-name')
const pokemonId = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')
const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')
const ip = 'prod.10.49.7.76.nip.io'
const urlApi = `http://` + ip + "/list"

//faz a busca no back
const fetchPokemon = async () => {
  const response = await fetch(urlApi);
  if(response.status === 200){
    const data = await response.json()
    return data;
  }
};

// Transforma o dado vindo do back-end em uma lista com os campos desejados (id, name, imageUrl)
const listPokemon = async () => {
  const data = await fetchPokemon(); // Chama a função fetchPokemon para obter os dados
  const pokemonList = data.map(itens => ({
    idpokemon: itens.idPokemon,
    name: itens.name,
    imageurl: itens.imageUrl
  }));
  return pokemonList;
};

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonId.innerHTML= '';
  const pokemonList = await listPokemon()
  if(pokemonList){
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = pokemonList[pokemon].name;
    pokemonId.innerHTML= pokemonList[pokemon].idpokemon;
    pokemonImage.src = pokemonList[pokemon].imageurl;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not Found';
    pokemonId.innerHTML= '404';
  }
}

btnPrev.addEventListener('click', () => {
  if(count > 0 && count <= 8){
    count-= 1;
    renderPokemon(count);
  }
});

btnNext.addEventListener('click', () => {
  if(count < 8){
    count+= 1;
   renderPokemon(count);
  }
});

let count = 0;
renderPokemon(0)