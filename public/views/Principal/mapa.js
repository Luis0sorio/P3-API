// Localizar el body
const body = document.querySelector("body");

// Localizar el header
const header = document.querySelector("header");

// Localizar head
const head = document.querySelector("head");

// Añadir el nombre del usuario en el header
const h2 = document.createElement("h2");
h2.setAttribute("id", "titulo");

let nombreU=localStorage.getItem("nombreUser");//accedemos al nombre del usuario

h2.textContent = `Hola ${nombreU}`;//personalizamos el saludo

header.appendChild(h2);
body.appendChild(header);

// Localizar el main para agregar posteriormente el div que contendra el mapa
const main = document.querySelector("main");

// Añadir divTodo
const divTodo = document.createElement("div");
divTodo.setAttribute("id", "divtodo");
// Temporal
divTodo.textContent = "Hola";

// Añadir divMapa
const divMapa = document.createElement("div");
divMapa.setAttribute("id", "mapa");


// Añadir divDatos
const divDatos = document.createElement("div");
divDatos.setAttribute("id", "datos");

divTodo.appendChild(divDatos);
divTodo.appendChild(divMapa);

main.appendChild(divTodo);
body.appendChild(main);

// Crear los links 
const linkcss = document.createElement("link");
linkcss.setAttribute("href", "https://api.mapbox.com/mapbox-gl-js/v2.9.0/mapbox-gl.css");
linkcss.setAttribute("rel", "stylesheet");
head.appendChild(linkcss);  // Usar appendChild en el head

// Crear el script y agregarlo al body
const scriptMapa = document.createElement("script");
scriptMapa.setAttribute("src", "https://api.mapbox.com/mapbox-gl-js/v2.9.0/mapbox-gl.js");
scriptMapa.onload = function() {
    // Llamar la función para cargar el mapa después de que Mapbox se haya cargado
    cargarMapa();
};
body.appendChild(scriptMapa); // Agregar el script al body

// Crear la función cargarMapa
function cargarMapa() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFpazEyNCIsImEiOiJjbTcwczVmeGowNGpsMmpzbmlybmpuajByIn0.s2p0IIfjzS1fGa52vRd4iQ';
    const map = new mapboxgl.Map({
        container: 'mapa', // ID del div donde se mostrará el mapa
        style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
        center: [-74.5, 40], // Coordenadas iniciales [longitud, latitud]
        zoom: 9 // Nivel de zoom inicial
    });

    map.on('load', () => {
        document.getElementById('mapa').style.height = '500px';
        document.getElementById('mapa').style.width = '100%';
    });
}
//funcion para obtener los datos del usuario
/*
async function datos(nombreU) {
    try {
        const response=await fetch('http://localhost:3000/api/datosUsuario',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nombreU)
        });
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        const data = await response.json();
        console.log("Respuesta recibida ",data);
    } catch (error) {
        console.error(error);
    }
}
*/
//hay que añadir las rutas y objetivo que salga el nombre del usuario 