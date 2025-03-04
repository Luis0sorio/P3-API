// Recuperamos el usuario en el localStorage
// Si el usuario está autenticado, lo guardamos
// Si no existe, seguimos en la ventana del login
let tipos=["Music", "Sports", "Theater", "Comedy", "Arts","Festivals","Musicals","Family"];

let datos= JSON.parse(localStorage.getItem("datosUser"));

const nombreUsuario = datos.usuario;
console.log(nombreUsuario);

let marcadores=[];//guardamos los marcadores aqui
let ciudaD=null;//lo ponemos en null, si al fitrar algo en el tipo miramos la ciudad y esta en null será q no ha buscado en el buscador de los filtros nada, asi q usamos
//el valor de ciudaduser, si n ps utilizamos esta
const ciudaduser=datos.ciudad;//eesto va a ser la ciudad q tenga el user en la bbdd

// Localizar el body
//Inicializacion del mapa y elementos del index.html
let map;
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const head = document.querySelector("head");

//funcion para inicializar la configuracion del mapa
function initMapa(){
   // agregarTituloUsuario();
    diviFil();
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
    { name: "Cerrar Sesion", link: "/", icon: "fas fa-power-off" ,id:"logout"},
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

    if (datosli.id) {
      a.setAttribute("id",datosli.id);
    }

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
  document.getElementById("logout").addEventListener("click",  (event)=> {
    event.preventDefault();
    cerrarSesion();
  });
}

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

//div filtro y filtro
function diviFil() {
    const divFlitro = document.createElement("div");
    divFlitro.setAttribute("id","filtro");
    const select = document.createElement("select");
    select.setAttribute("id","tpos");
    select.setAttribute("name","tipos");

    //añadimos un todo:
    let tdo=document.createElement("option");
    tdo.textContent = "Todo";
    tdo.setAttribute("value","todo");

    tipos.forEach(tipillos => {
      let tipo=document.createElement("option");
      tipo.textContent = tipillos;
      tipo.setAttribute("value",tipillos);
      select.appendChild(tipo);
    });
    select.appendChild(tdo);//añadimos al filtro la opcion Todo

    select.selectedIndex = -1;
    divFlitro.appendChild(select);
    body.appendChild(divFlitro);

  select.addEventListener("change", function() {//cada q se selecciona algo 
    let tipoSeleccionado = select.value;//obtenemos el tipo seleccionado
    if (tipoSeleccionado == "todo") {//si el tipo es todo,pasamos al fltro null 
      obtenerDatosTickmaster(null,ciudadQ());//pasamos un null enla zona de tipo y ya
    } else {
      //console.log("eleccionnnn", select.value);
      obtenerDatosTickmaster(tipoSeleccionado,ciudadQ());//pasamos el tipo seleccionado
    }
  });
}

//saber q ciudad mandar
function ciudadQ() {
  if (ciudaD != null) {//si n es null significa q el usuario se ha movido
    return ciudaD;//pasamos la variable ciudad q se va actualizando cn el filtro
  } else {
    return ciudaduser;//pasamos el tipo d ciudad q tiene el valor de la ciudad original de la bbdd
  }
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
    ciudaD=e.result.text;//actualizamos el valor de la variable con la ciudad elegida
    //console.log(`Ciudad seleccionada: ${ e.result.text}`);
    obtenerDatosTickmaster(null,ciudaD);//cada vez q el valor de el filtro cambie llamamos a la funcion y le pasamos la ciudad
  });
}

function elimMarcadores() {
    marcadores.forEach(marcador => {//recorro el array
        marcador.remove(); //elimino los marcadores del mapa
    });
    marcadores = []; //vacio el array de marcadores
}

function mostrarPopUp(mensaje) {

  const popup = document.createElement("div");
  popup.classList.add("modal");

  const exitePopUp = document.querySelector(".modal");
  if (exitePopUp) {
    //si exite el popup, no duplicara el popup
    return;
  }

  const poupContent = document.createElement("div");
  poupContent.classList.add("modal-content");

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close");
  closeBtn.textContent = "X";

  const message = document.createElement("p");
  message.textContent = mensaje;

  //agregar los elementos

  poupContent.appendChild(closeBtn);
  poupContent.appendChild(message);
  popup.appendChild(poupContent);

  document.body.appendChild(popup);

  popup.style.display = "block";


  closeBtn.addEventListener("click", function (event) {
    popup.style.display = "none";
    document.body.removeChild(popup);
  });

  setTimeout(function(){
    if (popup.style.display !== "none") {
      popup.style.display = "none";
      document.body.removeChild(popup);
    }
  }, 3000);

}

function obtenerDatosTickmaster(tipo,ciudad) {
    const apikeyTick = "vykajZlL73mCQ8NHCPW6KbHeCanHcFf5";
    let url=`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikeyTick}&radius=10&size=50`

    if (tipo != null) {
      url +=`&classificationName=${tipo}`;
    }
    if (ciudad != null) {
      url += `&city=${ciudad}`
    }
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data._embedded && data._embedded.events) {//si la respuesta tiene el campo _embedded.events, mostramos eventos
                mostrarEventos(data._embedded.events);
            } else {
                mostrarPopUp('No se encontraron eventos.');//hacer un pop-up
                mostrarPopUp(data);//hacer un pop-up
                mostrarEventos([]);
            }
        })
        .catch(error => {
            console.log('Error al obtener los eventos:', error);
        });//mirar el manejo de erroes para avisar si no hay eventos o si hay algún error.
}
    
///////////
function mostrarEventos(eventos) {
    elimMarcadores();//elimino marcadores
    
    const contenedorDatos = document.getElementById("datos");//accedemos al contenedor
    contenedorDatos.innerHTML = "";//limpiamos antes de mostrar los eventos

    const listaEventos = document.createElement("ul");
    eventos.forEach(evento => {
    const li = document.createElement("li");

    //aqui obtengo la imgen y si no exite usamos una predeterminada
    const imagentick =
      evento.images && evento.images[0]
        ? evento.images[0].url
        : "default-image.jpg";

    li.innerHTML = `
        <div class="evento-info">
        <div class="evento-info-imagen">
        <img src="${imagentick}" alt="${evento.name}" class="evento-imagen" />
        </div>
        <div class="evento-info-texto">
        <p><strong>${evento.name}</strong></p>
        <p>${evento.dates.start.localDate} - ${evento.dates.start.localTime}</p>
        <p>${evento._embedded.venues[0].name} - ${evento._embedded.venues[0].city.name} - ${evento._embedded.venues[0].country.name}</p> 
        </div>
        <div class ="evento-favorito">
            <i class="fas fa-star favorito"
              data-event-id="${evento.id}"
              data-event-name="${evento.name}"
              data-event-date='${encodeURIComponent(JSON.stringify(evento.dates))}'
              data-event-embedded='${encodeURIComponent(JSON.stringify(evento._embedded))}'
              data-event-url="${evento.url}"
              data-event-imagen="${evento.images[0].url}">
            </i>
        </div>
        <a href="${evento.url}" target="_blank" class="comprar-entradas">Comprar Entradas </a>
        </div>
        `;

        // li.appendChild(enlace);
        listaEventos.appendChild(li);

        const lugar = evento._embedded.venues[0];//obtenemos el lugar del evento
        const lat = lugar.location.latitude;
        const lon = lugar.location.longitude;
        if (lat && lon) {//si hay coordenadas
            const marcador = new mapboxgl.Marker()//creamos marcador
                .setLngLat([lon, lat])  //ubicamos al marcador en el mapa
                .setPopup(new mapboxgl.Popup().setText(`${evento.name} - ${evento.dates.start.localDate}`))//añadimos una ventana emergete cn el nombre y la fecha
                .addTo(map);//añadimos al mapa

                marcadores.push(marcador);//guardamos marcador para luego podre brrarlo
        }
        
    // li.appendChild(enlace);
    listaEventos.appendChild(li);
  });
  //console.log(marcadores);
  document.getElementById("datos").appendChild(listaEventos);

  const favoritos = document.querySelectorAll(".favorito");
  favoritos.forEach((favorito) => {
    favorito.addEventListener("click", async function () {
        const eventoId = favorito.getAttribute("data-event-id");
        const eventoName = favorito.getAttribute("data-event-name");
        let eventoDate, eventoEmbedded;
        const eventoUrl = favorito.getAttribute("data-event-url");
        const eventoImagen = favorito.getAttribute("data-event-imagen");

        try {
          eventoDate = JSON.parse(decodeURIComponent(favorito.getAttribute("data-event-date")));
          eventoEmbedded = JSON.parse(decodeURIComponent(favorito.getAttribute("data-event-embedded")));
        } catch (error) {
          console.error('Error al aprsear JSON ', error);
          return;
        }
        if (favorito.classList.contains("fa-star")) {
        // Añadir a favoritos
        const response = await fetch('http://localhost:3000/api/favoritos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          credentials: 'include',
          body: JSON.stringify({ _id: eventoId, name: eventoName, dates: eventoDate, _embedded: eventoEmbedded, url: eventoUrl, imagen: eventoImagen/*[0].url*/ })
        });
  
        if (response.ok) {
          favorito.classList.remove("fa-star");
          favorito.classList.add("fa-check");
        }
      } else {
        // Eliminar de favoritos
        const response = await fetch(`http://localhost:3000/api/borrarFavoritos/${eventoId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
  
        if (response.ok) {
          favorito.classList.remove("fa-check");
          favorito.classList.add("fa-star");
        }
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
    const response = await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Incluir cookies en la solicitud
    });

    if (response.ok) {
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = '/views/login/login.html';
    } else {
      console.error('Error al cerrar sesión:', response.statusText);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
  //eliminar localS
  //localStorage.removeItem("datosUser");
  //window.location.href = "/"; //redirigimos
}

//llamada a window onload que carga las funciones
window.onload = function () {
  initMapa();
  obtenerDatosTickmaster(null,ciudaduser);//llamamos a la funcion y le pasamos la ciudad q el usuario tenga en la bbdd, q de momento he  puesto q sea berlin
};
