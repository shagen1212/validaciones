export function valida(input) {
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector('.input-message-error').innerHTML = ''
    } else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tiposDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patterMismatch',
    'customError',
    
];

const mensajesDeError = {
    nombre: {
        valueMissing: 'Este campo no puede estar vacio'
    },
    email: {
        valueMissing: 'Este campo no puede estar vacio',
        typeMismatch: 'El correo no es valido'
    },
    password: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'Al menos 8 caracteres, debe contener al menos 1 minuscula, 1 mayuscula y 1 numero, sin caracteres especiales'
    },
    nacimiento: {
        valueMissing: 'Este campo no puede estar vacio',
        customError: 'Debes tener al menos 18 anhos de edad',
    },
    numero: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'El formate requerido es XXXXXXXXXX',
    },
    direccion: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'Su estado debe tener entre 10 y 40 caracteres',
    },
    ciudad: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'Su estado debe tener entre 10 y 40 caracteres',
    },
    estado: {
        valueMissing: 'Este campo no puede estar vacio',
        patterMismatch: 'Su estado debe tener entre 10 y 40 caracteres',
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = ''
    tiposDeErrores.forEach((error) => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)){
        mensaje = 'Debes tener al menos 18 anhos de edad';
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciasFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciasFechas <= fechaActual;
}