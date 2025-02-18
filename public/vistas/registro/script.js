window.onload = function(){

    //Crear Div para el Formulario 
    const divForm = document.createElement("div");
    divForm.setAttribute("id","divForm");
    divForm.classList.add("d-flex","justify-content-center","align-items-center","min-vh-100");


    //Crear form para el main 
    const form = document.createElement("form");
    form.setAttribute("id","formRegister");
    form.classList.add("container","p-4","border","rounded","w-25");

//Crear elementos para el form 

    //nombre 
    const labelname = document.createElement("label");
    labelname.setAttribute("for","name");
    labelname.classList.add("form-label");
    labelname.textContent = "Ingresa un nombre para registrate : "

    const inputname = document.createElement("input");
    inputname.setAttribute("type","text");
    inputname.setAttribute("id","name");
    inputname.classList.add("form-control","mb-3");


    //creo una fila propia para los apellidos 
    const rowapellidos = document.createElement("div");
    rowapellidos.classList.add("row","mb-3");

    //apellido1
    const labelnapell1 = document.createElement("label");
    labelnapell1.setAttribute("for","apellido1");
    labelnapell1.classList.add("form-label");
    labelnapell1.textContent = "Ingresa tu primer apellido : "

    const inputapell1 = document.createElement("input");
    inputapell1.setAttribute("type","text");
    inputapell1.setAttribute("id","apellido1");
    inputapell1.classList.add("form-control","form-control-sm");
    
    //apellido2
    const labelnapell2 = document.createElement("label");
    labelnapell2.setAttribute("for","apellido2");
    labelnapell2.classList.add("form-label");
    labelnapell2.textContent = "Ingresa tu segundo apellido : "

    const inputapell2 = document.createElement("input");
    inputapell2.setAttribute("type","text");
    inputapell2.setAttribute("id","apellido2");
    inputapell2.classList.add("form-control","form-control-sm"); 


    //agrego los campos de apell1 y apell2 en columnas
    const colapellido1 = document.createElement("div");
    colapellido1.classList.add("col-6");
    colapellido1.appendChild(labelnapell1);
    colapellido1.appendChild(inputapell1);

    const colapellido2 = document.createElement("div");
    colapellido2.classList.add("col-6");
    colapellido2.appendChild(labelnapell2);
    colapellido2.appendChild(inputapell2);

    rowapellidos.appendChild(colapellido1);
    rowapellidos.appendChild(colapellido2);

    //pais //usar el pais una vez para que identifique al usuario la zona de la que es y posicionarlo en el mapa en la zona indicada //mirar //hacer un scroll de paises que este la libreria en ingles para poder utilizarla 

    //email
    const labelemail = document.createElement("label");
    labelemail.setAttribute("for","email");
    labelemail.classList.add("form-label");
    labelemail.textContent = "Ingresa email : "

    const inputemail = document.createElement("input");
    inputemail.setAttribute("type","email");
    inputemail.setAttribute("id","email");
    inputemail.classList.add("form-control","mb-3"); 
    
    //usuario
    const labeluser = document.createElement("label");
    labeluser.setAttribute("for","usuario");
    labeluser.classList.add("form-label");
    labeluser.textContent = "Ingresa un usuario : "

    const inputuser = document.createElement("input");
    inputuser.setAttribute("type","text");
    inputuser.setAttribute("id","usuario");
    inputuser.classList.add("form-control","mb-3"); 

    //contraseña
    const labelPassword = document.createElement("label");
    labelPassword.setAttribute("for","password");
    labelPassword.classList.add("form-label");
    labelPassword.textContent = "Ingresa una contraseña : "

    const inputPassword = document.createElement("input");
    inputPassword.setAttribute("type","password");
    inputPassword.setAttribute("id","password");
    inputPassword.classList.add("form-control","mb-3"); 

    //Boton de Registro 
    const btnRegister = document.createElement("button");
    btnRegister.setAttribute("type","submit");
    btnRegister.setAttribute("id","btnSubmit");
    btnRegister.classList.add("btn","btn-primary","w-100");
    btnRegister.textContent = "Registrate";

    //Agregar todos los elementos al formulario 
    form.appendChild(labelname);
    form.appendChild(inputname);

    form.appendChild(rowapellidos);

    form.appendChild(labelemail);
    form.appendChild(inputemail);
    form.appendChild(labeluser);
    form.appendChild(inputuser);
    form.appendChild(labelPassword);
    form.appendChild(inputPassword);
    form.appendChild(btnRegister);

    //Agregar el formulario al divForm
    divForm.appendChild(form);

    //agregar el divForm al main 
    const main = document.querySelector("main");
    main.appendChild(divForm);


    btnRegister.addEventListener ("click",function (event){
        event.preventDefault();
        const name = inputname.value;
        const apell1 = inputapell1.value;
        const email = inputemail.value;
        const usuario = inputuser.value;
        const password = inputPassword.value;

        if (!name || !apell1 || !email || !usuario || !password) {
            alert("Has de añadir todos los campos");
            return;
        }

        form.reset();


    });
    
};