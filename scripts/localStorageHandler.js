function obtenerDatosFormulario(formularioId) {
    const formulario = document.getElementById(formularioId);
    const inputs = formulario.querySelectorAll('input');
    const datos = {};
    inputs.forEach(input => {
        datos[input.name] = input.value;
    });
    return datos;
}

function almacenarDatosEnAdmin(datos) {
    let datosAdmin = JSON.parse(localStorage.getItem('datosAdmin')) || [];
    datosAdmin.push(datos);
    localStorage.setItem('datosAdmin', JSON.stringify(datosAdmin));
}

function obtenerDatosUsuarios() {
    return JSON.parse(localStorage.getItem('datosAdmin')) || [];
}

function ocultarTodosLosFormularios() {
    const formularios = document.querySelectorAll('.formulario');
    formularios.forEach(formulario => {
        formulario.classList.remove('formulario-visible');
    });
}
