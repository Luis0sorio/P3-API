// funcion que crea el div del formulario y luego devuelve el contenedor principal
function createDivForm() {
  const divForm = document.createElement("div");
  divForm.setAttribute("id", "divForm");
  divForm.classList.add("form-container");
  return divForm;
}

//funcion que crea y devuelve el formulario
function createForm() {
  const form = document.createElement("form");
  form.setAttribute("id", "loginForm");
  form.classList.add("form");
  const title = createTitle();
  form.appendChild(title);

  return form;
}

//funcion que crea y devuelve el titulo del formulario
//funcion que crea y devuelve el titulo del formulario
function createTitle() {
  const title = document.createElement("h2");
  title.textContent = "Bienvenido";
  title.classList.add("form-title");
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
  input.classList.add("form-input");
  return input;
}

//funcion que crea y devuelve un boton
function createButton(type, text, id) {
  const button = document.createElement("button");
  button.setAttribute("type", type);
  button.setAttribute("id", id);
  button.classList.add("form-btn");
  button.textContent = text;
  return button;
}

//funcion que crea el checkbox "Recuerdame"s
function createCheckbox() {
  const div = document.createElement("div");
  div.classList.add("form-checkbox");

  const input = document.createElement("input");
  input.setAttribute("type","checkbox");
  input.setAttribute("id","rememberMe");
  div.appendChild(input);

  const label = document.createElement("label");
  label.setAttribute("for","rememberMe");
  label.textContent = "Recuerdame";
  div.appendChild(label);

  return div
}

//funcion que crea los enlaces en un href y tambien un texto
function createLink(href, text) {
  const link = document.createElement("a");
  link.setAttribute("href", href);
  link.textContent = text;
  link.classList.add("form-link");
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
err.classList.add("form-error");

// Llamada a window.onload para ejecutar el codigo
window.onload = function () {
  // Crear el contenedor principal
  const divForm = createDivForm();

  // Crear el formulario
  const form = createForm();


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


  //Agregar el checkbox "Recuerdame"
  const checkbox = createCheckbox();
  formContainer.appendChild(checkbox);

  // Crear botón de login
  const btnLogin = createButton("submit", "Iniciar Sesión", "btnSubmit");

  // Crear link
  const link = createLink(
    "/registro/registro.html",
    "¿No tienes cuenta? Regístrate"
  );

  // Agregar elementos al formulario
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
    inicioSesion(usuario);
  });
};

async function inicioSesion(usuario) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    const data=await response.json();//obtnemos y cnvertimos la respuesta

    if (!response.ok) {//si hay un codigo de estado fuera del rango 200-299, response.ok cambia a false
      throw new Error(data.mensaje);//lanzamos el error
    }

    console.log(data.mensaje);
    errores(null); //llamamos otra vez a la función
    localStorage.setItem("nombreUser", usuario.usuario); //guardamos el nombre del usuario
    localStorage.setItem("token", data.token); // Guardamos el token en localStorage
    window.location.href = "/dashboard/index.html"; //redirigimos
  } catch (error) {
    errores(error); //llamamos a la funcion y le pasamos el error
  }
}
////fetch para obtener info,mirar donde pnerlo
/*
async function obtenerDatosUser(usuario) {
  try {
    const response = await fetch(`/api/usuario/${usuario}`, {
      method: "GET",
    });
    const data=await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje);//lanzamos el error
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
*/