window.onload = function(){

    //Crear Titulo Registro 
    const title = document.createElement("h2");
    title.setAttribute("id","titulo");
    title.textContent = "Registro";
    title.classList.add("text-center","mb-4");

    //Crear Div para el Formulario 
    const divForm = document.createElement("div");
    divForm.setAttribute("id","divForm");
    divForm.classList.add("d-flex","justify-content-center","align-items-center","min-vh-75");


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

    form.appendChild(title);
    form.appendChild(labelname);
    form.appendChild(inputname);
    form.appendChild(rowapellidos);

    //pais //usar el pais una vez para que identifique al usuario la zona de la que es y posicionarlo en el mapa en la zona indicada //mirar //hacer un scroll de paises que este la libreria en ingles para poder utilizarla 

    async function obtenerPaises() {
        try {
            const response = await fetch('http://api.geonames.org/countryInfoJSON?username=michael.giraldo');
            const data = await response.json();
            const paises = data.geonames.map(pais => ({
                name : pais.countryName,
                code : pais.countryCode
            }));
            return paises;
        } catch (error) {
            console.error('error al obtener los paises',error);
        }
    }


    
    async function obtenerCiudades(paisCode) {
        try {
            const response = await fetch(`http://api.geonames.org/searchJSON?country=${paisCode}&maxRows=10&username=michael.giraldo`);
            const data = await response.json();
            const ciudades = data.geonames.map(ciudad => ciudad.name);
            return ciudades;
        } catch (error) {
            console.error('error al obtener las ciudades',error);
            return [];
        }

    }
    

    async function cargarPaisesCiudades() {
        //creo y agrego el label para el pais
        const rowPaisCiudad = document.createElement("div");
        rowPaisCiudad.classList.add("row","mb-3");

        const colPais = document.createElement ("div");
        colPais.classList.add("col-6");


        const labelPais = document.createElement("label");
        labelPais.setAttribute("for","pais");
        labelPais.classList.add("form-label");
        labelPais.textContent = "Selecciona un pais : ";

        colPais.appendChild(labelPais);
        const selectPais = document.createElement("select");
        selectPais.setAttribute("id","paises");
        selectPais.classList.add("form-control","mb-3");
        const opcionDefaultPais = document.createElement("option"); 
        opcionDefaultPais.textContent = "Selecciona un pais";
        selectPais.appendChild(opcionDefaultPais);
        

        const paises = await obtenerPaises();
        paises.forEach (pais => {
            const option = document.createElement('option');
            option.value = pais.code;
            option.textContent = pais.name;
            selectPais.appendChild(option);
        });

        colPais.appendChild(selectPais);

        //
        const colCiudad = document.createElement("div");
        colCiudad.classList.add("col-6");

        //agregamos el selector de las ciudades 
        const labelCiudad = document.createElement("label");
        labelCiudad.setAttribute("for","ciudad");
        labelCiudad.classList.add("form-label");
        labelCiudad.textContent= "Selecciona una Ciudad : ";

        const selectCiudad = document.createElement("select");
        selectCiudad.setAttribute("id","ciudad");
        selectCiudad.classList.add("form-control","mb-3");
        const opcionDefaultCiudad = document.createElement('option');
        opcionDefaultCiudad.textContent = 'Selecciona una ciudad';
        selectCiudad.appendChild(opcionDefaultCiudad);

        colCiudad.appendChild(labelCiudad);
        colCiudad.appendChild(selectCiudad);

        rowPaisCiudad.appendChild(colPais);
        rowPaisCiudad.appendChild(colCiudad);
        
        form.insertBefore(rowPaisCiudad, rowapellidos.nextSibling);


        selectPais.addEventListener("change", async function () {
            const paisSeleccionado = selectPais.value;
            const ciudades = await obtenerCiudades(paisSeleccionado);
            selectCiudad.innerHTML = '';
            const opcionDefault = document.createElement('option');
            opcionDefault.textContent = 'Selecciona una ciudad';
            selectCiudad.appendChild(opcionDefault);
            ciudades.forEach(ciudad =>{
                const option = document.createElement('option');
                option.value = ciudad;
                option.textContent = ciudad;
                selectCiudad.appendChild(option);
            });         
        });

    }

    cargarPaisesCiudades();

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

    //link volver atras
    const link = document.createElement("a");
    link.setAttribute("href","/login/login.html");
    link.textContent = "<-- Volver Atras";
    

    //Agregar todos los elementos al formulario 


    form.appendChild(labelemail);
    form.appendChild(inputemail);
    form.appendChild(labeluser);
    form.appendChild(inputuser);
    form.appendChild(labelPassword);
    form.appendChild(inputPassword);
    form.appendChild(btnRegister);
    form.appendChild(link);
   
    

    //Agregar el formulario al divForm
    divForm.appendChild(form);

    //agregar el divForm al main 
    const main = document.querySelector("main");
    main.appendChild(divForm);
    
    //agregar body
    const body  = document.querySelector("body");
    body.style.backgroundColor = "aqua";

    btnRegister.addEventListener ("click", async function (event){
        event.preventDefault();
        const name = inputname.value;
        const apell1 = inputapell1.value;
        const apell2 = inputapell2.value;
        const pais = document.getElementById('paises').value;
        const ciudad = document.getElementById('ciudad').value;
        const email = inputemail.value;
        const usuario = inputuser.value;
        const password = inputPassword.value;

        if (!name || !apell1 || !pais || !ciudad || !email || !usuario || !password) {
            alert("Todos los campos son obligatorios");
            return;
        }
        let usuarioR={
            nombre: name,     
            apellido1: apell1,
            apellido2: apell2,
            pais:pais,
            ciudad:ciudad,
            email:email,
            usuario:usuario,
            password:password
        };
        registro(usuarioR);
    });
    
    //falta mostrar el error al usuario.
    async function registro(usuarioR) {
        try {
            const response=await fetch('http://localhost:3000/api/insercionUsuario',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioR)
            });
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            const data = await response.json();
            console.log("Respuesta recibida ",data);
            form.reset();//si todo esta ok, reseteamos el formulario
            window.location.href = "/login/login.html";
        } catch (error) {
            console.error(error);
        }
    }
};