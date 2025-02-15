const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3001/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm));
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");

    // Se não encontrar nada, exibir mensagem
    if (result.length === 0) {
        resultArtist.innerHTML = '<p>Nenhum artista encontrado.</p>';
        return;
    }

    // Filtrar o artista que tem o nome mais parecido
    const matchedArtist = result.find(artist => 
        artist.name.toLowerCase().startsWith(searchTerm)
    ) || result[0]; // Se não achar um perfeito, pega o primeiro da API

    // Pegando os elementos de exibição
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    // Exibir os dados do artista encontrado
    artistName.innerText = matchedArtist.name;
    artistImage.src = matchedArtist.urlImg;

    // Exibir a seção de artistas
    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.add('hidden'); // Esconde os resultados quando não há pesquisa
        return;
    }

    requestApi(searchTerm);
});
