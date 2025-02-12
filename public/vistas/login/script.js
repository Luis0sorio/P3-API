window.onload = function(){

    //Div form 
    const divForm = document.createElement("div");
    divForm.setAttribute("id","divForm");    
    divForm.classList.add("d-flex","justify-content-center","align-items-center","min-vh-100");

    //Creo el formulario
    const form = document.createElement("form");
    form.setAttribute("id","loginForm");
    form.classList.add("container","p-4","border","rounded","w-100","max-w-400");

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
    inputUsuario.setAttribute("placeholder","Ingresa el Nombre del Usuario");
    inputUsuario.setAttribute("id","usuario");
    inputUsuario.classList.add("form-control","mb-3");
    
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
    inputPassword.setAttribute("placeholder","Ingresa tu contraseña");
    inputPassword.setAttribute("id","password");
    inputPassword.classList.add("form-control","mb-3");

    //Agrego los elemento al contendor Form
    formContainer.appendChild(labelPassword);
    formContainer.appendChild(inputPassword);

    //Creo el boton de login 
    const btnLogin = document.createElement("button");
    btnLogin.setAttribute("type","submit");
    btnLogin.setAttribute("id","btnSubmit");
    btnLogin.classList.add("btn","btn-primary","w-100");
    btnLogin.textContent = "Inciar Sesion";

    //Agrego el formulario al contenedor principal 
    form.appendChild(formContainer);
    form.appendChild(btnLogin);


    //Agrego el formulario al div
    divForm.appendChild(form);

    //Agrego el formulario al main 
    document.querySelector("main").appendChild(divForm);

}
