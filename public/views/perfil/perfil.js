const infoUser = JSON.parse(localStorage.getItem("datosUser"));
console.log(infoUser); // Verifica que infoUser tenga las propiedades esperadas

// Función para crear el formulario de perfil de usuario
function formPerfilUsuario() {
  const div = document.createElement('div');
  div.classList.add('formulario-perfil');

  const titulo = document.createElement('h1');
  titulo.setAttribute('id', 'titulo');
  titulo.textContent = `Perfil de ${infoUser.usuario}`;
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

  return formPerfil; // Retornamos el formulario para poder usarlo fuera de la función
}

// Función para actualizar un campo específico
async function actualizarCampo(campo) {
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

  // Aquí iría el fetch para actualizar el campo en el backend
  try {
    const respuesta = await fetch('/api/usuario', {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuarioForm: infoUser.usuario, [campo]: valor }),
    });

    const data = await respuesta.json();
    if (!respuesta.ok) {
      throw new Error(data.mensaje);
    }

    alert(`Campo ${campo} actualizado con éxito`);
    if (campo === "usuario") {
      // Actualizar el título si se cambió el nombre de usuario
      document.getElementById("titulo").textContent = `Perfil de ${valor}`;
      infoUser.usuario = valor;
      }else if(campo === "email" ){
        infoUser.email = valor;
      }
      localStorage.setItem("datosUser", JSON.stringify(infoUser));
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
}

// Función para crear el enlace de volver al mapa
function enlaceMapa() {
  const enlaceMapa = document.createElement("a");
  enlaceMapa.setAttribute("href", "/views/dashboard/index.html");
  enlaceMapa.textContent = "Volver atrás";
  document.body.appendChild(enlaceMapa);
}

// Cargar el formulario y los datos del usuario cuando la página se cargue
window.onload = function () {
  const formPerfil = formPerfilUsuario(); // Obtenemos el formulario

  // Rellenamos el formulario con los datos del usuario
  if (infoUser && infoUser.usuario && infoUser.email) {
    document.getElementById('usuario').value = infoUser.usuario;
    document.getElementById('email').value = infoUser.email;
  } else {
    console.error("Valores no encontrados");
  }

  // Evento que envía el formulario de modificación del usuario
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

    // Creamos el objeto con los datos actualizados
    const datosActualizados = {
      usuario,
      email,
      password,
    };

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
      if (usuario && usuario !== infoUser.usuario) {
        // Actualizar el título si se cambió el nombre de usuario
        document.getElementById("titulo").textContent = `Perfil de ${usuario}`;
        infoUser[usuario] = datosActualizados.user; // Actualiza el campo específico
        infoUser[email] = datosActualizados.email; // Actualiza el campo específico
        localStorage.setItem("datosUser", JSON.stringify(infoUser));
      }
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  });

  enlaceMapa();
};