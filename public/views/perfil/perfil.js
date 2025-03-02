

// Creamos el formulario de modificacion de usuario con el DOM
function formPerfilUsuario() {
  
  const usuario = localStorage.getItem("nombreUser");
  
  const div = document.createElement('div');
  div.classList.add('formulario-perfil');

  const titulo = document.createElement('h1');
  titulo.setAttribute('id', 'titulo');
  titulo.textContent = `Perfil de ${usuario}`;
  div.appendChild(titulo);

  const formPerfil = document.createElement('form');
  formPerfil.setAttribute("id", "formPerfil");

  // Campo de Usuario
  const labelUsuario = document.createElement("label");
  labelUsuario.setAttribute("for", "usuario");
  labelUsuario.textContent = "Usuario:";
  formPerfil.appendChild(labelUsuario);

  const inputUsuario = document.createElement("input");
  inputUsuario.setAttribute("type", "text");
  inputUsuario.setAttribute("id", "usuario");
  inputUsuario.setAttribute("name", "usuario");
  formPerfil.appendChild(inputUsuario);

  const botonUsuario = document.createElement("button");
  botonUsuario.setAttribute("type", "button");
  botonUsuario.textContent = "Actualizar Usuario";
  botonUsuario.addEventListener("click", () => actualizarCampo("usuario"));
  formPerfil.appendChild(botonUsuario);

  // Campo de Email
  const labelEmail = document.createElement("label");
  labelEmail.setAttribute("for", "email");
  labelEmail.textContent = "Email:";
  formPerfil.appendChild(labelEmail);

  const inputEmail = document.createElement("input");
  inputEmail.setAttribute("type", "email");
  inputEmail.setAttribute("id", "email");
  inputEmail.setAttribute("name", "email");
  formPerfil.appendChild(inputEmail);

  const botonEmail = document.createElement("button");
  botonEmail.setAttribute("type", "button");
  botonEmail.textContent = "Actualizar Email";
  botonEmail.addEventListener("click", () => actualizarCampo("email"));
  formPerfil.appendChild(botonEmail);

  // Campo de Contraseña
  const labelPassword = document.createElement("label");
  labelPassword.setAttribute("for", "password");
  labelPassword.textContent = "Nueva Contraseña:";
  formPerfil.appendChild(labelPassword);

  const inputPassword = document.createElement("input");
  inputPassword.setAttribute("type", "password");
  inputPassword.setAttribute("id", "password");
  inputPassword.setAttribute("name", "password");
  formPerfil.appendChild(inputPassword);

  const labelConfirmPassword = document.createElement("label");
  labelConfirmPassword.setAttribute("for", "confirmPassword");
  labelConfirmPassword.textContent = "Confirmar Contraseña:";
  formPerfil.appendChild(labelConfirmPassword);

  const inputConfirmPassword = document.createElement("input");
  inputConfirmPassword.setAttribute("type", "password");
  inputConfirmPassword.setAttribute("id", "confirmPassword");
  inputConfirmPassword.setAttribute("name", "confirmPassword");
  formPerfil.appendChild(inputConfirmPassword);

  const botonPassword = document.createElement("button");
  botonPassword.setAttribute("type", "button");
  botonPassword.textContent = "Actualizar Contraseña";
  botonPassword.addEventListener("click", () => actualizarCampo("password"));
  formPerfil.appendChild(botonPassword);

  // Agregamos el formulario al contenedor
  div.appendChild(formPerfil);

  // Agregamos el contenedor al cuerpo del documento
  document.body.appendChild(div);
}

// Función para actualizar un campo específico
async function actualizarCampo(campo) {
  const usuarioForm = localStorage.getItem("nombreUser"); // Usuario original
  let valor;

  // Obtener el valor del campo correspondiente
  if (campo === "usuario") {
    valor = document.getElementById("usuario").value.trim();
  } else if (campo === "email") {
    valor = document.getElementById("email").value.trim();
  } else if (campo === "password") {
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    valor = password;
  }

  // Validar que el campo no esté vacío
  if (!valor) {
    alert(`Por favor, complete el campo de ${campo}`);
    return;
  }

  // ***** AQUÍ VA EL FETCH DE SALMA *****
  // Crear el objeto con los datos actualizados

  // Usuario original para buscar en la base de datos
  // Campo a actualizar

  // Enviamos los datos actualizados al backend con fetch 
  // método PUT

  // Actualizamos el localStorage si se cambió el nombre de usuario
}

// Función para cargar los datos actuales del usuario
// ***** AQUÍ SALMA DEBE CAMBIAR O AÑADIR SUS LINEAS *****
async function cargarDatosUsuario(usuario) {
  // hacemos una solicitud GET al backend para obtener los datos del usuario
  // Rellenamos el formulario con los datos actuales (modificados)
}

function enlaceMapa() {
  const enlaceMapa = document.createElement("a");
  enlaceMapa.setAttribute("href", "/views/principal/index.html");
  enlaceMapa.textContent = "Volver atrás";
  document.body.appendChild(enlaceMapa);
}

window.onload = function () {
  // Verificamos si el usuario está autenticado
  const usuario = localStorage.getItem("nombreUser");

  // Cargamos los datos del usuario
  datosUser(usuario);

  // Evento que envía el formulario de modificacion del usuario
  formPerfil.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtenemos los valores del formulario
    const usuario = document.getElementById('usuario').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validamos que las contraseñas coincidan
    if (password && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Verificamos si algún campo ha sido modificado
    const usuarioForm = localStorage.getItem('nombreUser');
    const emailForm = localStorage.getItem('email');

    if (usuario === usuarioForm && email === emailForm && !password) {
      alert("No se han realizado cambios en el perfil");
      return;
    }

    // Creamos el objeto con los datos actualizados
    const datosActualizados = {
      usuarioForm, // busca el usuario actual
      /*
      usuario: usuario || undefined,
      email: email || undefined,
      password: password || undefined, */
    };

    // Agregamos los campos que se han modificado
    if (usuario && usuario !== usuarioForm) {
      datosActualizados.usuario = usuario;
    }
    if (email && email !== emailForm) {
      datosActualizados.email = email;
    }
    if (password) {
      datosActualizados.password = password;
    }
    try {
      // Enviar los datos actualizados al backend
      const respuesta = await fetch("/api/usuario", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      });
      const data = await respuesta.json();
      if (!respuesta.ok) {
        throw new Error(data.mensaje);
      } 
      alert("Perfil actualizado con éxito");
        if (usuario && usuario !== usuarioForm) {
          localStorage.setItem('nombreUser', usuario);
          document.getElementById("titulo").textContent = `Perfil de ${usuario}`;
        }
    } catch (error) {
      alert(error);
      console.error(error);
    }
  });

  async function datosUser(usuario) {
    try {
      const response = await fetch(`/api/usuario/${usuario}`, {
        method: "GET",
      });
      const data=await response.json();//obtnemos y cnvertimos la respuesta
  
      if (!response.ok) {
        throw new Error(data.mensaje);//lanzamos el error
      }
      document.getElementById('usuario').value = data.usuario;//rellenamos el form cn los dat
      document.getElementById('email').value = data.email;

    } catch (error) {//recibimos el error y 
      console.log(error);
    }
  }
  formPerfilUsuario();
  enlaceMapa();
};

