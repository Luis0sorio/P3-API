// Crear Titulo Registro
function Titulo() {
  const title = document.createElement("h2");
  title.setAttribute("id", "titulo");
  title.textContent = "Registro";
  title.classList.add("text-center", "mb-4");
  return title;
}

// Crear Div para el Formulario
function CrearDivForm() {
  const divForm = document.createElement("div");
  divForm.setAttribute("id", "divForm");
  divForm.classList.add("d-flex", "justify-content-center", "align-items-center", "min-vh-75");
  return divForm;
}

// Crear Formulario
function crearForm() {
  const form = document.createElement("form");
  form.setAttribute("id", "formRegister");
  form.classList.add("container", "p-4", "border", "rounded", "w-25");
  return form;
}

// Crear Label y Input para el Nombre
function crearLabelNombre() {
  const labelname = document.createElement("label");
  labelname.setAttribute("for", "name");
  labelname.classList.add("form-label");
  labelname.textContent = "Nombre";
  return labelname;
}

function crearInputNombre() {
  const inputname = document.createElement("input");
  inputname.setAttribute("type", "text");
  inputname.setAttribute("id", "name");
  inputname.classList.add("form-control", "mb-3");
  return inputname;
}

// Crear Div para los Apellidos
function crearDivApellidos() {
  const rowapellidos = document.createElement("div");
  rowapellidos.setAttribute("id", "rowapellidos");
  rowapellidos.classList.add("row", "mb-3");

  const labelnapell1 = document.createElement("label");
  labelnapell1.setAttribute("for", "apellido1");
  labelnapell1.classList.add("form-label");
  labelnapell1.textContent = "Primer apellido";

  const inputapell1 = document.createElement("input");
  inputapell1.setAttribute("type", "text");
  inputapell1.setAttribute("id", "apellido1");
  inputapell1.classList.add("form-control", "form-control-sm");

  const labelnapell2 = document.createElement("label");
  labelnapell2.setAttribute("for", "apellido2");
  labelnapell2.classList.add("form-label");
  labelnapell2.textContent = "Segundo apellido";

  const inputapell2 = document.createElement("input");
  inputapell2.setAttribute("type", "text");
  inputapell2.setAttribute("id", "apellido2");
  inputapell2.classList.add("form-control", "form-control-sm");

  const colapellido1 = document.createElement("div");
  colapellido1.classList.add("col-6");
  colapellido1.appendChild(labelnapell1);
  colapellido1.appendChild(inputapell1);

  const colapellido2 = document.createElement("div");
  colapellido2.classList.add("col-6");
  colapellido2.appendChild(labelnapell2);
  colapellido2.appendChild(inputapell2);

  rowapellidos.appendChild(colapellido1);
  rowapellidos.appendChild(colapellido2);

  return rowapellidos;
}

// Funciones para obtener Países y Ciudades
async function obtenerPaises() {
  try {
    const response = await fetch("http://api.geonames.org/countryInfoJSON?username=michael.giraldo");
    const data = await response.json();
    return data.geonames.map((pais) => ({ name: pais.countryName, code: pais.countryCode }));
  } catch (error) {
    console.error("Error al obtener los países", error);
  }
}

async function obtenerCiudades(paisCode) {
  try {
    const response = await fetch(`http://api.geonames.org/searchJSON?country=${paisCode}&maxRows=10&username=michael.giraldo`);
    const data = await response.json();
    return data.geonames.map((ciudad) => ciudad.name);
  } catch (error) {
    console.error("Error al obtener las ciudades", error);
    return [];
  }
}

// Función para cargar los países y ciudades
async function cargarPaisesCiudades(form) {
  const rowPaisCiudad = document.createElement("div");
  rowPaisCiudad.classList.add("row", "mb-3");

  // Crear selector de país
  const colPais = document.createElement("div");
  colPais.classList.add("col-6");

  const labelPais = document.createElement("label");
  labelPais.setAttribute("for", "pais");
  labelPais.classList.add("form-label");
  labelPais.textContent = "País";

  const selectPais = document.createElement("select");
  selectPais.setAttribute("id", "paises");
  selectPais.classList.add("form-control", "mb-3");
  selectPais.appendChild(document.createElement("option")).textContent = "Selecciona un país";

  const paises = await obtenerPaises();
  paises.forEach((pais) => {
    const option = document.createElement("option");
    option.value = pais.code;
    option.textContent = pais.name;
    selectPais.appendChild(option);
  });

  colPais.appendChild(labelPais);
  colPais.appendChild(selectPais);

  // Crear selector de ciudad
  const colCiudad = document.createElement("div");
  colCiudad.classList.add("col-6");

  const labelCiudad = document.createElement("label");
  labelCiudad.setAttribute("for", "ciudad");
  labelCiudad.classList.add("form-label");
  labelCiudad.textContent = "Ciudad";

  const selectCiudad = document.createElement("select");
  selectCiudad.setAttribute("id", "ciudad");
  selectCiudad.classList.add("form-control", "mb-3");
  selectCiudad.appendChild(document.createElement("option")).textContent = "Selecciona una ciudad";

  colCiudad.appendChild(labelCiudad);
  colCiudad.appendChild(selectCiudad);

  rowPaisCiudad.appendChild(colPais);
  rowPaisCiudad.appendChild(colCiudad);

  // Insertar el rowPaisCiudad antes de rowapellidos o al final del formulario si no existe
  const rowapellidos = document.getElementById("rowapellidos"); // Asegúrate de que rowapellidos tiene un id
  if (rowapellidos) {
    form.insertBefore(rowPaisCiudad, rowapellidos.nextSibling);
  } else {
    form.appendChild(rowPaisCiudad);
  }

  selectPais.addEventListener("change", async function () {
    const paisSeleccionado = selectPais.value;
    const ciudades = await obtenerCiudades(paisSeleccionado);
    selectCiudad.innerHTML = "";
    selectCiudad.appendChild(document.createElement("option")).textContent = "Selecciona una ciudad";
    ciudades.forEach((ciudad) => {
      const option = document.createElement("option");
      option.value = ciudad;
      option.textContent = ciudad;
      selectCiudad.appendChild(option);
    });
  });
}

// Funciones para el Email, Usuario y Contraseña
function crearLabelEmail() {
  const labelemail = document.createElement("label");
  labelemail.setAttribute("for", "email");
  labelemail.classList.add("form-label");
  labelemail.textContent = "Correo electrónico";
  return labelemail;
}

function crearInputEmail() {
  const inputemail = document.createElement("input");
  inputemail.setAttribute("type", "email");
  inputemail.setAttribute("id", "email");
  inputemail.classList.add("form-control", "mb-3");
  return inputemail;
}

function crearLabelUser() {
  const labeluser = document.createElement("label");
  labeluser.setAttribute("for", "usuario");
  labeluser.classList.add("form-label");
  labeluser.textContent = "Usuario";
  return labeluser;
}

function crearInputUser() {
  const inputuser = document.createElement("input");
  inputuser.setAttribute("type", "text");
  inputuser.setAttribute("id", "usuario");
  inputuser.classList.add("form-control", "mb-3");
  return inputuser;
}

function crearLabelPassword() {
  const labelPassword = document.createElement("label");
  labelPassword.setAttribute("for", "password");
  labelPassword.classList.add("form-label");
  labelPassword.textContent = "Contraseña";
  return labelPassword;
}

function crearInputPassword() {
  const inputPassword = document.createElement("input");
  inputPassword.setAttribute("type", "password");
  inputPassword.setAttribute("id", "password");
  inputPassword.classList.add("form-control", "mb-3");
  return inputPassword;
}

// Función para crear el enlace de volver atrás
function crearLink() {
  const link = document.createElement("a");
  link.setAttribute("href", "/login/login.html");
  link.textContent = "Volver Atrás";
  return link;
}

// Función para manejar el registro del usuario
async function registro(usuarioR,form) {
  try {
    const response = await fetch("/api/insercionUsuario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarioR),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    console.log("Respuesta recibida ", data);
    if (form) {
      form.reset();
    }
    window.location.href = "/login/login.html";
  } catch (error) {
    console.error(error);
  }
}

//++++++++++++++++++
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

function emailRegex() {
  const email = document.getElementById("email").value;
  //tiene que tener caracteres , un arroba , un punto , y despues extensiones de dominio
  const emailRegex = /^[\w.-]+@[\w.-]+.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
}

function passwordRegex() {
  const pass = document.getElementById("password").value;
  //debe contener al menos una M,m,1,entre 5 u 8 
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,8}$/;

  return passRegex.test(pass);

}
//++++++++++++++++++

// Función principal que se ejecuta al cargar la página
window.onload = function () {
  const main = document.querySelector("main");
  const divForm = CrearDivForm();
  const form = crearForm();
  const inputname = crearInputNombre();
  const rowapellidos = crearDivApellidos();

  form.appendChild(Titulo());
  form.appendChild(crearLabelNombre());
  form.appendChild(inputname);
  form.appendChild(rowapellidos);

  cargarPaisesCiudades(form);  // Pasamos form a cargarPaisesCiudades

  form.appendChild(crearLabelEmail());
  form.appendChild(crearInputEmail());
  form.appendChild(crearLabelUser());
  form.appendChild(crearInputUser());
  form.appendChild(crearLabelPassword());
  form.appendChild(crearInputPassword());

  const btnRegister = document.createElement("button");
  btnRegister.setAttribute("type", "submit");
  btnRegister.setAttribute("id", "btnSubmit");
  btnRegister.classList.add("btn", "btn-primary", "w-100");
  btnRegister.textContent = "Regístrate";
  form.appendChild(btnRegister);
  form.appendChild(crearLink());

  divForm.appendChild(form);
  main.appendChild(divForm);

  const body = document.querySelector("body");
  body.style.backgroundColor = "aqua";

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = inputname.value;
    const apell1 = document.getElementById("apellido1").value;
    const apell2 = document.getElementById("apellido2").value;
    const pais = document.getElementById("paises").value;
    const ciudad = document.getElementById("ciudad").value;
    const email = document.getElementById("email").value;
    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    if (!name || !apell1 || !pais || !ciudad || !email || !usuario || !password) {
      mostrarPopUp("Todos los campos son obligatorios");
      return;
    }
    //-------------------------
    const emailValido = emailRegex();
    if(!emailValido){
      mostrarPopUp("Por favor ingresa un email valido");
      return;
    }

    const passValida = passwordRegex();
    if(!passValida){
      mostrarPopUp("Por favor ingresa una contraseña valida (con una Mayuscula, una Minuscula  y un Numero)");
      return;
    }
    //-------------------------

    const usuarioR = { nombre: name, apellido1: apell1, apellido2: apell2, pais: pais, ciudad: ciudad, email: email, usuario: usuario, password: password };
    registro(usuarioR);
  });
};
