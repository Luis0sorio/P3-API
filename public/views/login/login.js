// funcion que crea el div del formulario y luego devuelve el contenedor principal
function createDivForm() {
    const divForm = document.createElement("div");
    divForm.setAttribute("id", "divForm");
    divForm.classList.add("d-flex", "justify-content-center", "align-items-center", "min-vh-100", "position-sticky");
    divForm.style.backgroundColor = "aqua";  
    return divForm;
}

//funcion que crea y devuelve el formulario 
function createForm() {
    const form = document.createElement("form");
    form.setAttribute("id", "loginForm");
    form.classList.add("container", "p-4", "border", "rounded", "d-flex", "flex-column", "align-items-center");
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

//funcion que crear y devuelve el contendor de los campos para el formulario 
function createFormContainer() {
    // Crear el contenedor para los campos del formulario
    const formContainer = document.createElement("div");

    // Establecer el id del contenedor
    formContainer.setAttribute("id", "div1");

    //creo la etiqueta y el campo para el usuario 
    const labelUsuario = document.createElement("label");
    labelUsuario.setAttribute("for","usuario");
    labelUsuario.classList.add("form-label");
    labelUsuario.textContent = "Usuario";


    const inputUsuario = document.createElement("input");
    inputUsuario.setAttribute("type","text");
    inputUsuario.setAttribute("placeholder","Usuario");
    inputUsuario.setAttribute("id","Usuario");
    inputUsuario.classList.add("form-control","mb-3","form-control-sm","w-100","rounded-pill");
    
    
    //Agrego los elemento al contendor Form
    formContainer.appendChild(labelUsuario);
    formContainer.appendChild(inputUsuario);
    formContainer.appendChild(labelPassword);
    formContainer.appendChild(inputPassword);

    // Crear botón de login
    const btnLogin = createButton("submit", "Iniciar Sesión", "btnSubmit");

    // Crear link
    const link = createLink("/registro/registro.html", "¿No tienes cuenta? Regístrate");

    // Agregar elementos al formulario
    form.appendChild(title);
    form.appendChild(btnLogin);

    //agrego el link 
    const link = document.createElement("a");
    link.setAttribute("href","/registro/registro.html");
    link.textContent = "¿No Tienes Cuenta? Regístrate";
    link.classList.add("d-block","text-decoration-none");

    //agrego el link al formulario
    form.appendChild(link);

    //agrego el div de error al formulario
    form.appendChild(divError);

    // Agregar el formulario al contenedor principal
    divForm.appendChild(form);

    // Agregar el formulario al main
    document.querySelector("main").appendChild(divForm);


    
}
