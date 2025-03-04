const header = document.querySelector("header");
const nav = document.querySelector("nav");
const main = document.querySelector("main");

function inicializar() {
  crearHeader();
  crearContenedor(); // Llamamos a la función que crea la estructura con solo los dos divs
}

function crearHeader() {
    const h2 = document.createElement("h2");
    h2.setAttribute("id", "titulo");
    h2.textContent = `Favoritos`;
    header.appendChild(h2);
  
    const datosli = [
      { name: "Editar Perfil", link: "/views/perfil/perfil.html", icon: "fas fa-cogs" },
      { name: "Favoritos", link: "/views/favoritos/favoritos.html", icon: "fas fa-star" },
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
    nav.appendChild(divNav);
    header.appendChild(nav);
}

function crearContenedor() {
    // Creamos el contenedor principal
    const container = document.createElement("div");
    container.classList.add("container");
    
    // Contenedor de las cajas laterales
    const content = document.createElement("div");
    content.classList.add("content");

    // Caja izquierda
    const divIzq = document.createElement("div");
    divIzq.classList.add("divIzq");
    content.appendChild(divIzq);

    const enlaceAtras = linkAtras();
    divIzq.appendChild(enlaceAtras);

    // Caja derecha
    const divDer = document.createElement("div");
    divDer.classList.add("divDer");
    content.appendChild(divDer);

    container.appendChild(content);

    // Agregamos el contenedor principal al main
    main.appendChild(container);
}

async function cargarFavoritos() {
  try {
    const response = await fetch('http://localhost:3000/api/listaFavoritos', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Error al cargar favoritos');
    }

    const data = await response.json();
    mostrarFavoritos(data.favoritos);
  } catch (error) {
    console.error(error);
  }
}

function mostrarFavoritos(favoritos) {
  const contenedor = document.querySelector(".divDer"); 
  contenedor.innerHTML = ""; 
  console.log(favoritos);

  // Cargamos la informacion de los eventos
  favoritos.forEach(evento => {
    console.log(evento);

    const venue = evento._embedded?.venues?.[0];

    const eventoHTML = `
      <div class="evento-favorito">
        <div class="evento-info">
          <div class="evento-info-imagen">
            <img src="${evento.imagen}" alt="${evento.name}" class="evento-imagen" />
          </div>
          <div class="evento-info-texto">
            <p><strong>${evento.name}</strong></p>
            <p>${evento.dates.start.localDate} - ${evento.dates.start.localTime}</p>
            ${venue ? `<p>${venue.name} - ${venue.city.name} - ${venue.country.name}</p>` : ''}
          </div>
          <button class="eliminar-favorito" data-event-id="${evento._id}">Eliminar de favoritos</button>
        </div>
      </div>
    `;

    contenedor.innerHTML += eventoHTML;
  });

  // EventoListener para eliminar el evento de favoritos
  const botonEliminar = document.querySelectorAll(".eliminar-favorito");
  botonEliminar.forEach((boton) => {
    boton.addEventListener("click", async function () {
      const eventoId = boton.getAttribute("data-event-id");
      console.log(eventoId);
      try {
        const response = await fetch(`http://localhost:3000/api/borrarFavoritos/${eventoId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          // Recargar la lista de favoritos después de eliminar
          cargarFavoritos();
        } else {
          console.error('Error al eliminar el favorito:', response.mensaje);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    });
  });
}

function linkAtras() {
  const linkAtras = document.createElement("a");
  linkAtras.setAttribute("id","linkAtras");
  linkAtras.setAttribute("href","../dashboard/index.html");
  linkAtras.classList.add("class-link-atras");
  linkAtras.textContent = "< Atrás";
  return linkAtras;

}

window.onload = function () {
  inicializar();
  cargarFavoritos();
};
