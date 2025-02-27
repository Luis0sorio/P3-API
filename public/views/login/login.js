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
    input.classList.add("form-control", "mb-3", "form-control-sm", "w-100", "rounded-pill");  
    return input;
}

//funcion que crea y devuelve un boton 
function createButton(type, text, id) {
    const button = document.createElement("button");
    button.setAttribute("type", type);
    button.setAttribute("id", id);
    button.classList.add("btn", "btn-primary", "w-75", "rounded-pill");  
    button.textContent = text;
    return button;
}

//funcion que crea los enlaces en un href y tambien un texto 
function createLink(href, text) {
    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.textContent = text;
    link.classList.add("d-block", "text-decoration-none");  
    return link;
}

// Llamada a window.onload para ejecutar el codigo
window.onload = function () {
    // Crear el contenedor principal
    const divForm = createDivForm();

    // Crear el formulario
    const form = createForm();

    // Crear título // cambiar ubicacion del titulo
    const title = createTitle("Bienvenido");

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

    // Crear botón de login
    const btnLogin = createButton("submit", "Iniciar Sesión", "btnSubmit");

    // Crear link
    const link = createLink("/registro/registro.html", "¿No tienes cuenta? Regístrate");

    // Agregar elementos al formulario
    form.appendChild(title);
    form.appendChild(btnLogin);
    form.appendChild(link);

    // Agregar el formulario al contenedor principal
    divForm.appendChild(form);

    // Agregar el formulario al main
    document.querySelector("main").appendChild(divForm);
};


//falta fetch de SALMA 
