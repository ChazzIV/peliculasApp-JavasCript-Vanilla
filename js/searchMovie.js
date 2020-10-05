var api_key = 'YOUR APIKEY';
$(()=>{
   
    $("#search").on('submit', (e) =>{
          var movie = $("#searchInput").val();
          getImages(movie);
          e.preventDefault();
          $("#result").empty();
    });
  });

const getImages = (movie) => {
fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movie}`).then(result =>{
        return result.json();
    }).then(result => {
        init(result);
    });
}

const init = (resultFromServer) =>{
    console.log(resultFromServer);
    let movieNames = resultFromServer.results;
    var output;
       //create array of movies
    $.each(movieNames, (index, val)=>{
        
        $("#result").append(`
             <img class='pelicula' src ="https://image.tmdb.org/t/p/w185/${val.poster_path}" alt="No poster available">
        `)
  });
 
}

const movieSelected = (id) =>{
    sessionStorage.setItem('movieId', id);
    window.location = 'index.html';
    return false;
  }
  

const getMovieDetails = () => {
    var movieId = sessionStorage.getItem('movieId');
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`).then(result =>{
     return result.json();
        }).then(result => {
            console.log(result);  
            var movDet = result;
            var movGenres;
        
            
            if(movDet.genres.length === 0)
            {
                movGenres = 'Not mentioned';
            }
            else
            {
            movGenres = movDet.genres[0].name;
            }
            var output = `
                        <img class="thumbnail imgDet" src="https://image.tmdb.org/t/p/w185${movDet.poster_path}" alt="No poster available">
            `
        
            $("#result").html(output);
        })
 }
getImages()
