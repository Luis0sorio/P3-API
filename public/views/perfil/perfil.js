window.onload = function () {
  // Verificamos si el usuario está autenticado
  const usuario = localStorage.getItem("nombreUser");

  document.getElementById("titulo").textContent = `Perfil de ${usuario}`;

  const formPerfil = document.getElementById("formPerfil");

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
};

//FALTAN CAMBIOS DE LUIS 