window.onload = function () {
  //Div form
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

  //Creo el formulario
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

  //Titulo Login
  const title = document.createElement("h2");
  title.textContent = "Bienvenido";
  title.classList.add("text-center", "mb-4", "text-primary");

  //Creo el contenedor para cada campo del formulario
  const formContainer = document.createElement("div");
  formContainer.setAttribute("id", "div1");

  //creo la etiqueta y el campo para el usuario
  const labelUsuario = document.createElement("label");
  labelUsuario.setAttribute("for", "usuario");
  labelUsuario.classList.add("form-label");
  labelUsuario.textContent = "Usuario";

  const inputUsuario = document.createElement("input");
  inputUsuario.setAttribute("type", "text");
  inputUsuario.setAttribute("placeholder", "Usuario");
  inputUsuario.setAttribute("id", "usuario");
  inputUsuario.classList.add(
    "form-control",
    "mb-3",
    "form-control-sm",
    "w-100",
    "rounded-pill"
  );

  //Agrego los elemento al contendor Form
  formContainer.appendChild(labelUsuario);
  formContainer.appendChild(inputUsuario);

  //creo la etiqueta y el campo para la password
  const labelPassword = document.createElement("label");
  labelPassword.setAttribute("for", "password");
  labelPassword.classList.add("form-label");
  labelPassword.textContent = "Contraseña";

  const inputPassword = document.createElement("input");
  inputPassword.setAttribute("type", "password");
  inputPassword.setAttribute("placeholder", "Contraseña");
  inputPassword.setAttribute("id", "password");
  inputPassword.classList.add(
    "form-control",
    "mb-3",
    "form-control-sm",
    "w-100",
    "rounded-pill"
  );

  //Agrego los elemento al contendor Form
  formContainer.appendChild(labelPassword);
  formContainer.appendChild(inputPassword);

  //Creo el boton de login
  const btnLogin = document.createElement("button");
  btnLogin.setAttribute("type", "submit");
  btnLogin.setAttribute("id", "btnSubmit");
  btnLogin.classList.add("btn", "btn-primary", "w-75", "rounded-pill");
  btnLogin.textContent = "Iniciar sesión";

  //Agrego el formulario al contenedor principal
  form.appendChild(title);
  form.appendChild(formContainer);
  form.appendChild(btnLogin);

  //agrego el link
  const link = document.createElement("a");
  link.setAttribute("href", "/registro/registro.html");
  link.textContent = "¿No tienes cuenta? Regístrate";
  link.classList.add("d-block", "text-decoration-none");

  //mensaje error
  const err = document.createElement("label");
  err.setAttribute("for", "error");
  err.classList.add("form-label");

  //Creo el contenedor para mostrar los errores
  const divError = document.createElement("div");
  divError.setAttribute("id", "divErr");
  divError.appendChild(err);

  //agrego el link al formulario
  form.appendChild(link);

  //agrego el div de error al formulario
  form.appendChild(divError);

  //Agrego el formulario al div
  divForm.appendChild(form);

  //Agrego el formulario al main
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

  function errores(error = null) {
    if (error != null) {
      //si hay error , se muestra
      err.textContent = error;
    } else {
      err.textContent = ""; //vaciamos el contenedor
    }
  }
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
      console.log("Login exitoso", data);
      errores(null); //llamamos otra vez a la función
      localStorage.setItem("nombreUser", usuario.usuario); //guardamos el nombre del usuario
      window.location.href = "/principal/index.html"; //redirigimos
    } catch (error) {
      errores(error); //llamamos a la funcion y le pasamos el error
    }
  }
};
