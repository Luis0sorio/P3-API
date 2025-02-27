window.onload = function () {
  // Verificamos si el usuario está autenticado
  const usuario = localStorage.getItem("nombreUser");

  document.getElementById("titulo").textContent = `Perfil de ${usuario}`;

  const formPerfil = document.getElementById("formPerfil");

  // Cargamos los datos del usuario
  cargarDatosUsuario(usuario);

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

      if (respuesta.ok) {
        alert("Perfil actualizado con éxito");
        if (usuario && usuario !== usuarioForm) {
          localStorage.setItem('nombreUser', usuario);
          document.getElementById("titulo").textContent = `Perfil de ${usuario}`;
        }
      } else {
        const error = await respuesta.json();
        alert(`Error: ${error.mensaje}`);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil");
    }
  });

  // Función para cargar los datos actuales del usuario
  async function cargarDatosUsuario(usuario) {
    try {
      // hacemos una solicitud GET al backend para obtener los datos del usuario
      const solicitud = await fetch(`/api/usuario/${usuario}`);
      if (solicitud.ok) {
        const dataUsuario = await solicitud.json();
        // Rellenamos el formulario con los datos actuales
        document.getElementById('usuario').value = dataUsuario.usuario;
        document.getElementById('email').value = dataUsuario.email;
      } else {
        const error = await solicitud.json();
        alert(`Error: ${error.mensaje}`);
      }
    } catch (error) {
      console.error("Error al cargar los datos del usuario:", error);
      alert("Error al cargar los datos del usuario");
    }
  }
};

//FALTAN CAMBIOS DE LUIS 