window.onload = function () {
  // Verificamos si el usuario está autenticado
  const usuario = localStorage.getItem("usuario");

  document.getElementById("titulo").textContent = `Perfil de ${usuario}`;

  const formPerfil = document.getElementById("formPerfil");

  // Cargamos los datos del usuario
  cargarDatosUsuario(usuario);

  formPerfil.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtenemos los valores del formulario
    const usuario = document.getElementById('usuario').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validamos los campos
    if (!usuario || !email || !password) {
      alert("Usuario y email son obligatorios");
      return;
    }

    // Creamos el objeto con los datos actualizados
    const datosActualizados = {
      usuario,
      email,
      password: password || undefined, 
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

      if (respuesta.ok) {
        alert("Perfil actualizado con éxito");
        if (usuario !== localStorage.getItem('usuario')) {
          localStorage.setItem('usuario', usuario);
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
      const respuesta = await fetch(`/api/usuario/${usuario}`);
      if (respuesta.ok) {
        const data = await respuesta.json();
        // Rellenamos el formulario con los datos actuales
        document.getElementById('usuario').value = data.usuario;
        document.getElementById('email').value = data.email;
      } else {
        const error = await respuesta.json();
        alert(`Error: ${error.mensaje}`);
      }
    } catch (error) {
      console.error("Error al cargar los datos del usuario:", error);
      alert("Error al cargar los datos del usuario");
    }
  }
};

//FALTAN CAMBIOS DE LUIS 