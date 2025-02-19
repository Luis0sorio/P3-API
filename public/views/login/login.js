window.onload = function(){

    //Div form 
    const divForm = document.createElement("div");
    divForm.setAttribute("id","divForm");    
    divForm.classList.add("d-flex","justify-content-center","align-items-center","min-vh-100","position-sticky");
    divForm.style.backgroundColor = "aqua";

    //Creo el formulario
    const form = document.createElement("form");
    form.setAttribute("id","loginForm");
    form.classList.add("container","p-4","border","rounded","d-flex","flex-column","align-items-center");
    form.style.maxWidth = "400px";
    form.style.minHeight = "auto";


    //Titulo Login
    const title = document.createElement("h2");
    title.textContent = "Bienvenido";
    title.classList.add("text-center","mb-4","text-primary");

    //Creo el contenedor para cada campo del formulario
    const formContainer = document.createElement("div");
    formContainer.setAttribute("id","div1");

    //creo la etiqueta y el campo para el usuario 
    const labelUsuario = document.createElement("label");
    labelUsuario.setAttribute("for","usuario");
    labelUsuario.classList.add("form-label");
    labelUsuario.textContent = "Usuario";


    const inputUsuario = document.createElement("input");
    inputUsuario.setAttribute("type","text");
    inputUsuario.setAttribute("placeholder","Usuario");
    inputUsuario.setAttribute("id","usuario");
    inputUsuario.classList.add("form-control","mb-3","form-control-sm","w-100","rounded-pill");
    
    
    //Agrego los elemento al contendor Form
    formContainer.appendChild(labelUsuario);
    formContainer.appendChild(inputUsuario);

    //creo la etiqueta y el campo para la password
    const labelPassword = document.createElement("label");
    labelPassword.setAttribute("for","password");
    labelPassword.classList.add("form-label");
    labelPassword.textContent = "Contraseña";


    const inputPassword = document.createElement("input");
    inputPassword.setAttribute("type","password");
    inputPassword.setAttribute("placeholder","Contraseña");
    inputPassword.setAttribute("id","password");
    inputPassword.classList.add("form-control","mb-3","form-control-sm","w-100","rounded-pill");

    //Agrego los elemento al contendor Form
    formContainer.appendChild(labelPassword);
    formContainer.appendChild(inputPassword);

    //Creo el boton de login 
    const btnLogin = document.createElement("button");
    btnLogin.setAttribute("type","submit");
    btnLogin.setAttribute("id","btnSubmit");
    btnLogin.classList.add("btn","btn-primary","w-75","rounded-pill");
    btnLogin.textContent = "Inciar Sesion";

    //Agrego el formulario al contenedor principal 
    form.appendChild(title);
    form.appendChild(formContainer);
    form.appendChild(btnLogin);

    //agrego el link 
    const link = document.createElement("a");
    link.setAttribute("href","/registro/registro.html");
    link.textContent = "¿No Tienes Cuenta? Regístrate";
    link.classList.add("d-block","text-decoration-none");

    //agrego el link al formulario
    form.appendChild(link);

    //Agrego el formulario al div
    divForm.appendChild(form);

    //Agrego el formulario al main 
    document.querySelector("main").appendChild(divForm);

    // Evento para confirmar el inicio de sesion
    form.addEventListener("submit", async function (event)) {
        event.preventDefault();

        const usuario = inputUsuario.value.trim();
        const password = inputPassword.value.trim();

        if (!usuario || !password) {
            alert("Usuario y contraseña obligatorios");
        }

        // AQUÍ VA EL FETCH
        // aquí debemos guardar el usuario para poder mostrarlo tras el login
        // es bueno usar localStorage, si más delante usamos JWT nosé si podria ser con sessionStorage
    }
    
};
