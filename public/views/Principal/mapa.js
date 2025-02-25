
// Recuperamos el usuario en el localStorage
// Si el usuario está autenticado, lo guardamos
// Si no existe, seguimos en la ventana del login
const nombreUsuario = localStorage.getItem('nombreUsuario');
// if (!nombreUsuario) {
//     window.location.href = '/login/login.html';
// }

// Localizar el body
//Inicializacion del mapa y elementos del index.html
let map;
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const head = document.querySelector("head");

//funcion para inicializar la configuracion del mapa

function initMapa(){
    agregarTituloUsuario();
    agregarMapayBusqueda();
    cargarMapbox();
}

//añadir titulo del usuario en el header
function agregarTituloUsuario() {
    const h2 = document.createElement("h2");
    h2.setAttribute("id","titulo");
    h2.textContent = "Hola Usuario";
    header.appendChild(h2);
    body.appendChild(header);
}
// Añadir el nombre del usuario en el header
const h2 = document.createElement("h2");
h2.setAttribute("id", "titulo");

let nombreU=localStorage.getItem("nombreUser");//accedemos al nombre del usuario

h2.textContent = `Hola ${nombreU}`;//personalizamos el saludo
header.appendChild(h2);
body.appendChild(header);

//funcion para configurar el mapa y el buscador 
function agregarMapayBusqueda() {

    const divTodo = document.createElement("div");
    divTodo.setAttribute("id","divTodo");

    const row = document.createElement("div");
    row.classList.add("row");

    const divMapa = crearDivMapa();
    const divDatos = crearDivDatos();
    
    const divBusqueda = crearDivBusqueda();
    divMapa.appendChild(divBusqueda);

    row.appendChild(divDatos);
    row.appendChild(divMapa);

    divTodo.appendChild(row);
    main.appendChild(divTodo);
    body.appendChild(main);

}

//crear div para el mapa
function crearDivMapa() {
    const divMapa = document.createElement("div");
    divMapa.setAttribute("id","mapa");
    divMapa.classList.add("col-md-6");
    return divMapa;
}

//crear div para los datos
function crearDivDatos() {
    const divDatos = document.createElement("div");
    divDatos.setAttribute("id","datos");
    divDatos.classList.add("col-md-6");
    return divDatos;
}

//crear el div de busqueda
function crearDivBusqueda() {
    const divBusqueda = document.createElement("div");
    divBusqueda.setAttribute("id","busqueda");
    return divBusqueda;
}

//cargar los archivos para el MapBox

function cargarMapbox(){
    const linkcss = document.createElement("link");
    linkcss.setAttribute("href","https://api.mapbox.com/mapbox-gl-js/v2.9.0/mapbox-gl.css");
    linkcss.setAttribute("rel","stylesheet");
    head.appendChild(linkcss);

    const scriptMapa = document.createElement("script");
    scriptMapa.setAttribute("src","https://api.mapbox.com/mapbox-gl-js/v2.9.0/mapbox-gl.js");
    scriptMapa.onload = function() {
        cargarBuscador();
        configurarMapa();
    };
    body.appendChild(scriptMapa);


}


//funcion para cargar el buscador
function cargarBuscador() {
    const searchmap = document.createElement("script");
    searchmap.setAttribute("src", "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js");
    searchmap.onload = function () {
        configurarBuscador();
    };
    body.appendChild(searchmap);
}

//Configurar el mapa

function configurarMapa() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFpazEyNCIsImEiOiJjbTcwczVmeGowNGpsMmpzbmlybmpuajByIn0.s2p0IIfjzS1fGa52vRd4iQ';
    map = new mapboxgl.Map({
        container: 'mapa',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-74.5, 40],
        zoom: 9
    });

    const navControl = new mapboxgl.NavigationControl();
    map.addControl(navControl, 'bottom-right');

    map.on('load', () => {
        document.getElementById('mapa').style.height = '500px';
        document.getElementById('mapa').style.width = '100%';
    });
}


//hay que añadir las rutas y objetivo que salga el nombre del usuario 

// Creamos un enlace para redirigir a la ventana de perfil de usuario
const perfilUser = document.createElement('a');
perfilUser.setAttribute('href', '/views/perfil/perfil.html');
perfilUser.textContent = "Editar perfil"
perfilUser.setAttribute('target', '_blank'); // hay que cambiar esto
document.body.appendChild(perfilUser);