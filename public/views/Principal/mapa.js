// Recuperamos el usuario en el localStorage
// Si el usuario está autenticado, lo guardamos
// Si no existe, seguimos en la ventana del login
const nombreUsuario = localStorage.getItem("nombreUser");
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

function initMapa() {
  crearHeader();
  agregarMapayBusqueda();
  cargarMapbox();
}

function crearHeader() {
  //titulo usuario
  const h2 = document.createElement("h2");
  h2.setAttribute("id", "titulo");
  h2.textContent = `Hola ${nombreUsuario}`;
  header.appendChild(h2);

  const datosli = [
    { name: "Editar Perfil", link: "/views/perfil/perfil.html", icon: "fas fa-cogs" },
    { name: "Favoritos", link: "/views/favoritos/favoritos.html", icon: "fas fa-star" },
    { name: "Cerrar Sesion", link: "/", icon: "fas fa-power-off" },
  ];

  const ul = document.createElement("ul");
  ul.setAttribute("id", "ulNav");

  datosli.forEach((datosli) => {
    const li = document.createElement("li");
    li.setAttribute("id", "liNav");
    const a = document.createElement("a");
    a.setAttribute("id", "aNav");
    a.textContent = datosli.name;
    a.href = datosli.link;

    if (datosli.icon) {
      const icon = document.createElement("i");
      icon.setAttribute("id", "icon");
      icon.setAttribute("class", datosli.icon);
      a.prepend(icon);
    }

    li.appendChild(a);
    ul.appendChild(li);
  });

  const divNav = document.createElement("div");
  divNav.setAttribute("class", "divNav");
  divNav.appendChild(ul);
  header.appendChild(divNav);
}

// // Añadir el nombre del usuario en el header
// const h2 = document.createElement("h2");
// h2.setAttribute("id", "titulo");

// let nombreU=localStorage.getItem("nombreUser");//accedemos al nombre del usuario

// h2.textContent = `Hola ${nombreU}`;//personalizamos el saludo
// header.appendChild(h2);
// body.appendChild(header);

//funcion para configurar el mapa y el buscador
function agregarMapayBusqueda() {
  const divTodo = document.createElement("div");
  divTodo.setAttribute("id", "divTodo");

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
  divMapa.setAttribute("id", "mapa");
  divMapa.classList.add("col-md-6");
  return divMapa;
}

//crear div para los datos
function crearDivDatos() {
  const divDatos = document.createElement("div");
  divDatos.setAttribute("id", "datos");
  divDatos.classList.add("col-md-6");
  return divDatos;
}

//crear el div de busqueda
function crearDivBusqueda() {
  const divBusqueda = document.createElement("div");
  divBusqueda.setAttribute("id", "busqueda");
  return divBusqueda;
}

//cargar los archivos para el MapBox

function cargarMapbox() {
  const linkcss = document.createElement("link");
  linkcss.setAttribute(
    "href",
    "https://api.mapbox.com/mapbox-gl-js/v2.9.0/mapbox-gl.css"
  );
  linkcss.setAttribute("rel", "stylesheet");
  head.appendChild(linkcss);

  const scriptMapa = document.createElement("script");
  scriptMapa.setAttribute(
    "src",
    "https://api.mapbox.com/mapbox-gl-js/v2.9.0/mapbox-gl.js"
  );
  scriptMapa.onload = function () {
    cargarBuscador();
    configurarMapa();
  };
  body.appendChild(scriptMapa);
}

//funcion para cargar el buscador
function cargarBuscador() {
  const searchmap = document.createElement("script");
  searchmap.setAttribute(
    "src",
    "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js"
  );
  searchmap.onload = function () {
    configurarBuscador();
  };
  body.appendChild(searchmap);
}

//Configurar el mapa

function configurarMapa() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFpazEyNCIsImEiOiJjbTcwczVmeGowNGpsMmpzbmlybmpuajByIn0.s2p0IIfjzS1fGa52vRd4iQ";
  map = new mapboxgl.Map({
    container: "mapa",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [-74.5, 40],
    zoom: 9,
  });

  const navControl = new mapboxgl.NavigationControl();
  map.addControl(navControl, "bottom-right");

  map.on("load", () => {
    document.getElementById("mapa").style.height = "90vh";
    document.getElementById("mapa").style.width = "50%";
    map.resize();
  });

  window.addEventListener("resize", () => map.resize());
}

//hay que añadir las rutas y objetivo que salga el nombre del usuario

//METER ESTO EN UNA FUNCION

// Creamos un enlace para redirigir a la ventana de perfil de usuario
// const perfilUser = document.createElement('a');
// perfilUser.setAttribute('href', '/views/perfil/perfil.html');
// perfilUser.textContent = "Editar perfil"
// perfilUser.setAttribute('target', '_blank'); // hay que cambiar esto
// header.appendChild(perfilUser);

///// Esto es nuevo
//Configurar el buscador

function configurarBuscador() {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: true,
    flyTo: true,
    placeholder: "Buscar..",
    limit: 5,
  });

  document.getElementById("busqueda").appendChild(geocoder.onAdd(map));

  geocoder.on("result", (e) => {
    const { center } = e.result.geometry;
    map.flyTo({
      center: center,
      zoom: 12,
    });
  });
}

//obtener y mostrar eventos de la api de tickmaster

function obtenerDatosTickmaster() {
  const apikeyTick = "vykajZlL73mCQ8NHCPW6KbHeCanHcFf5";
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikeyTick}&size=200`
  )
    .then((response) => response.json())
    .then((data) => mostrarEventos(data._embedded.events))
    .catch((error) => console.log("Error al obtener los eventos:", error));
}

//mostrar datos de tickmaster

function mostrarEventos(eventos) {
  const listaEventos = document.createElement("ul");

  eventos.forEach((evento) => {
    const li = document.createElement("li");

    //por usar para poder identificar el tipo de evento ej: Deportes,Musica,Teatro,etc..
    const tipo_event = obtenerTipoEvento(evento);

    //aqui obtengo la imgen y si no exite usamos una predeterminada
    const imagentick =
      evento.images && evento.images[0]
        ? evento.images[0].url
        : "default-image.jpg";

    //li.textContent = `${evento.name} - ${evento.dates.start.localDate} - ${evento.dates.start.localTime} - ${evento._embedded.venues[0].name} - ${evento._embedded.venues[0].city.name} - ${evento._embedded.venues[0].country.name} - ${tipo_event}`;

    li.innerHTML = `
        <div class= "evento-info">
        <div class="evento-info-imagen">
        <img src="${imagentick}" alt="${evento.name} class "evento-imagen" />
        </div>
        <div class="evento-info-texto">
        <p><strong>${evento.name}</strong></p>
        <p>${evento.dates.start.localDate} - ${evento.dates.start.localTime}</p>
        <p>${evento._embedded.venues[0].name} - ${evento._embedded.venues[0].city.name} - ${evento._embedded.venues[0].country.name}</p> 
        </div>
        <div class ="evento-favorito">
            <i class="fas fa-star favorito" data-event-id="${evento.id}"></i>
        </div>
        <a href="${evento.url}" target="_blank" class="comprar-entradas">Comprar Entradas </a>
        </div>
        `;

    // const enlace = document.createElement("a");
    // enlace.href = evento.url;
    // enlace.textContent = "Comprar Entradas";
    // enlace.target = "_blank";

    // li.appendChild(enlace);
    listaEventos.appendChild(li);
  });

  document.getElementById("datos").appendChild(listaEventos);

  const favoritos = document.querySelectorAll(".favorito");
  favoritos.forEach((favorito) => {
    favorito.addEventListener("click", function () {
      if (favorito.classList.contains("fa-star")) {
        favorito.classList.remove("fa-star");
        favorito.classList.add("fa-check");
      } else {
        favorito.classList.remove("fa-check");
        favorito.classList.add("fa-star");
      }
    });
  });
}

//funcion para obtener los tipos de eventos de tickmaster

function obtenerTipoEvento(evento) {
  return evento.classifications && evento.classifications[0]
    ? evento.classifications[0].segment.name
    : "Desconocido";
}

// ***** SALMA SALMA SALMA *****
async function cerrarSesion() {
  try {
    const respuesta = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Incluir cookies en la solicitud
    });

    if (respuesta.ok) {
      // Redirigir al usuario al login
      window.location.href = '/login/login.html';
    } else {
      const error = await respuesta.json();
      alert(`Error: ${error.mensaje}`);
    }
  } catch (error) {
    console.error('Error al cerrar sesión: ', error);
    alert('Error al cerrar sesión');
  }
}
//llamada a window onload que carga las funciones
window.onload = function () {
  initMapa();
  obtenerDatosTickmaster();
};
