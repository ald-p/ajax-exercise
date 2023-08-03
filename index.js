/* Variables */
const api_key = '7zwwsI9A99JA6d9C784QGnrKGOo3GfQu';
const form = document.querySelector('form');
const gifs = document.querySelector('#gifs');
const removeBtn = document.querySelector('#remove-btn');

/* Event listeners */
form.addEventListener('submit', submitForm);
removeBtn.addEventListener('click', removeAllGifs);

// form submission handler
function submitForm(e) {
  e.preventDefault();
  const searchTerm = e.target[0].value;
  form.reset();
  getGifUrl(searchTerm);
}

// function communicating with api
async function getGifUrl(q) {
  try {
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', { params: { api_key, q }});
    const data = res.data.data;
    const { url } = data[Math.round(Math.random() * data.length)].images.original; // grab image url at random index
    renderGif(url);
  } catch(err) {
    alert("GIF NOT FOUND!");
  }
}

// function to render gif given a url
function renderGif(url) {
  const newGif = document.createElement('img');
  newGif.src = url;
  gifs.append(newGif);
}

// remove all Gifs handler
function removeAllGifs(e) {
  gifs.innerHTML = '';
}

