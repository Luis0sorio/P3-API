// funcion que crea el div del formulario y luego devuelve el contenedor principal
function createDivForm() {
  const divForm = document.createElement("div");
  divForm.setAttribute("id", "divForm");
  divForm.classList.add(
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "min-vh-100",
    "position-sticky"
  );
  divForm.style.backgroundColor = "aqua";
  return divForm;
}

//funcion que crea y devuelve el formulario
function createForm() {
  const form = document.createElement("form");
  form.setAttribute("id", "loginForm");
  form.classList.add(
    "container",
    "p-4",
    "border",
    "rounded",
    "d-flex",
    "flex-column",
    "align-items-center"
  );
  form.style.maxWidth = "400px";
  form.style.minHeight = "auto";
  return form;
}

//funcion que crea y devuelve el titulo del formulario
function createTitle(text) {
  const title = document.createElement("h2");
  title.textContent = text;
  title.classList.add("text-center", "mb-4", "text-primary");
  return title;
}

function createFormContainer() {
  // Crear el contenedor para los campos del formulario
  const formContainer = document.createElement("div");

  // Establecer el id del contenedor
  formContainer.setAttribute("id", "div1");

  return formContainer;
}

//funcion que crea los los campoy y inputs del formulario
function createLabel(text) {
  const label = document.createElement("label");
  label.classList.add("form-label");
  label.textContent = text;
  return label;
}

function createInput(type, placeholder, id) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("placeholder", placeholder);
  input.setAttribute("id", id);
  input.classList.add(
    "form-control",
    "mb-3",
    "form-control-sm",
    "w-100",
    "rounded-pill"
  );
  return input;
}

//funcion que crea y devuelve un boton
function createButton(type, text, id) {
  const button = document.createElement("button");
  button.setAttribute("type", type);
  button.setAttribute("id", id);
  button.classList.add("btn", "btn-primary", "w-75", "rounded-pill");
  button.textContent = text;
  return button;
}

//funcion que crea los enlaces en un href y tambien un texto
function createLink(href, text) {
  const link = document.createElement("a");
  link.setAttribute("href", href);
  link.textContent = text;
  link.classList.add("d-block", "text-decoration-none");
  return link;
}

function errores(error = null) {
  if (error != null) {
    //si hay error , se muestra
    err.textContent = error;
  } else {
    err.textContent = ""; //vaciamos el contenedor
  }
}

//mensaje error
const err = document.createElement("label");
err.setAttribute("for", "error");
err.classList.add("form-label");

// Llamada a window.onload para ejecutar el codigo
window.onload = function () {
  // Crear el contenedor principal
  const divForm = createDivForm();

  // Crear el formulario
  const form = createForm();

  // Crear título // cambiar ubicacion del titulo
  const title = createTitle("Bienvenido");

  // Crear contenedor para los campos del formulario y agregarlo al formulario
  const formContainer = createFormContainer();
  form.appendChild(formContainer);

  // Crear campos de usuario y contraseña
  const labelUsuario = createLabel("Usuario");
  const inputUsuario = createInput("text", "Usuario", "usuario");

  const labelPassword = createLabel("Contraseña");
  const inputPassword = createInput("password", "Contraseña", "password");

  // Agregar campos al contenedor del formulario
  formContainer.appendChild(labelUsuario);
  formContainer.appendChild(inputUsuario);
  formContainer.appendChild(labelPassword);
  formContainer.appendChild(inputPassword);

  // Crear botón de login
  const btnLogin = createButton("submit", "Iniciar Sesión", "btnSubmit");

  // Crear link
  const link = createLink(
    "/registro/registro.html",
    "¿No tienes cuenta? Regístrate"
  );

  // Agregar elementos al formulario
  form.appendChild(title);
  form.appendChild(btnLogin);
  form.appendChild(link);

  //Creo el contenedor para mostrar los errores
  const divError = document.createElement("div");
  divError.setAttribute("id", "divErr");
  divError.appendChild(err);

  //agrego el div de error al formulario
  form.appendChild(divError);

  // Agregar el formulario al contenedor principal
  divForm.appendChild(form);

  // Agregar el formulario al main
  document.querySelector("main").appendChild(divForm);

  btnLogin.addEventListener("click", function (event) {
    //añadimos un evento al boton de inicio
    event.preventDefault();
    console.log("Botón de login presionado");
    let usuario = {
      usuario: inputUsuario.value,
      password: inputPassword.value,
    };
    console.log(usuario);
    inicioSesion(usuario);
  });
};
//forma diferente del fetch al registro,con una funcion general
async function peticion(url, headers = {}) {
  //recibe la url y la cabecera
  try {
    const response = await fetch(url, headers); //hacemos la peticion cn lo recibido
    const data = await response.json(); //respuesta
    if (!response.ok) {
      //si la respuesta no es ok
      throw new Error(data.mensaje);
    }
    console.log("Respuesta recibida bien  ", data);
    return data;
  } catch (error) {
    console.error(error);
    throw error; //lanzamos el error para q se maneje donde llamen a la funcion
  }
}

async function inicioSesion(usuario) {
  try {
    const data = await peticion("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    console.log("yasta echo", data);
    errores(null); //llamamos otra vez a la función
    localStorage.setItem("nombreUser", usuario.usuario); //guardamos el nombre del usuario
    window.location.href = "/principal/index.html"; //redirigimos
  } catch (error) {
    errores(error); //llamamos a la funcion y le pasamos el error
  }
}
