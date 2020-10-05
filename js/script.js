var api_key = 'YOUR APIKEY';
var api_url = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key;
var api_top = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + api_key;

const fila = document.querySelector('.contenedor-carousel');
const fila2 = document.querySelector('.contenedor-prox');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');



$.getJSON( api_url, function( data ) {
    $.each( data.results, function( i, item ) {
    var posterFullUrl = "https://image.tmdb.org/t/p/w185/" + item.poster_path;
    $("<div class='pelicula'><img src='" + posterFullUrl + "'></div>")
    .appendTo(".carousel");
    });

    const numeroPaginas = Math.ceil(data.results.length / 5);
    for(let i = 0; i < numeroPaginas; i++){
        const indicador = document.createElement('button');
        if(i === 0) {
            indicador.classList.add('activo');
        }
        document.querySelector('.indicadores').appendChild(indicador);
        indicador.addEventListener('click', (e) => {
            fila.scrollLeft = i * fila.offsetWidth;

            document.querySelector('.indicadores .activo').classList.remove('activo');
            e.target.classList.add('activo');
        })
    }
});

/* <h5>" + item.title + "</h5> */

$.getJSON( api_top, function( data ) {
    $.each( data.results, function( i, item ) {
    var posterFullUrl = "https://image.tmdb.org/t/p/w185/" + item.poster_path;
    $("<div class='pelicula'><img src='" + posterFullUrl + "'></div>")
    .appendTo(".movie-top");
    });
    const numeroPaginas = Math.ceil(data.results.length / 5);
    for(let i = 0; i < numeroPaginas; i++){
        const indicador = document.createElement('button');
            if(i === 0) {
                indicador.classList.add('activo');
            }
        document.querySelector('.indicador').appendChild(indicador);
        indicador.addEventListener('click', (e) => {
            fila2.scrollLeft = i * fila2.offsetWidth;
            document.querySelector('.indicador .activo').classList.remove('activo');
            e.target.classList.add('activo');
        })
    }
});


flechaDerecha.addEventListener('click', () => {
    fila.scrollLeft += fila.offsetWidth;
    const indicadorActivo = document.querySelector('.indicadores .activo');
    if(indicadorActivo.nextSibling){
        indicadorActivo.nextSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo')
    }
});

flechaIzquierda.addEventListener('click', () => {
    fila.scrollLeft -= fila.offsetWidth;
    const indicadorActivo = document.querySelector('.indicadores .activo');
    if(indicadorActivo.previousSibling){
        indicadorActivo.previousSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo')
    }
});


const fleIzquierda = document.getElementById('fle-izquierda');
const fleDerecha = document.getElementById('fle-derecha');

fleDerecha.addEventListener('click', () => {
    fila2.scrollLeft += fila2.offsetWidth;
    const indiActivo = document.querySelector('.indicador .activo');
    if(indiActivo.nextSibling){
        indiActivo.nextSibling.classList.add('activo'); 
        indiActivo.classList.remove('activo');
    }
})

fleIzquierda.addEventListener('click', () => {
    fila2.scrollLeft -= fila2.offsetWidth;
    const indiActivo = document.querySelector('.indicador .activo');
    if(indiActivo.nextSibling){
        indiActivo.nextSibling.classList.add('activo'); 
        indiActivo.classList.remove('activo');
    }
})



const peliculas = document.querySelectorAll(".pelicula");


peliculas.forEach((pelicula) => {
    pelicula.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
            elemento.classList.add('hover');
        }, 500);
    })
})

fila.addEventListener('mouseleave', () => {
    peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
})