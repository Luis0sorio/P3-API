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
};
