//Key variables
const API_POPULARITY_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d19921ed5574a2120509b5c8f8d47f40'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=d19921ed5574a2120509b5c8f8d47f40&query="' 

//Getting elements from the dom
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get Initial Movies
getMovies(API_POPULARITY_URL)

async function getMovies(url) {
  const res = await fetch(url) //returns a promise of the data
  const data = await res.json() //returns the actual data

  showMovies(data.results)
}

//Creating a function to show the movies
function showMovies(movies) {
  main.innerHTML = ''

  //looping through the movie data
  movies.forEach((movie) => {
    const {title, poster_path, vote_average, overview} = movie

    const movieEl = document.createElement('div')
    movieEl.classList.add('movie')

    movieEl.innerHTML = `
			<img src="${IMG_PATH + poster_path}" alt="${title}">
			<div class="movie-info">
				<h3>${title}</h3>
				<span class="${getClassByRate}">${vote_average}</span>
			</div>
			<div class="overview">
				<h3>Overview</h3>
				<p>${overview}</p>
			</div>
    `
    main.appendChild(movieEl)
  })
}

//function to change the rate color
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green'
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red'
  }
}

//Search functionality

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if (searchTerm && searchTerm !== '') {
    getMovies( SEARCH_URL + searchTerm ) 

    search.value = ''
  } else {
    window.location.reload()
  }
})


// document.querySelector('button').addEventListener('click', getFetch)

// function getFetch(){
//   const choice = document.querySelector('input').value
//   const url = 'https://pokeapi.co/api/v2/pokemon/'+choice //insert link

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }