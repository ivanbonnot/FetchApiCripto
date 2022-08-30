//API
//https://min-api.cryptocompare.com/documentation

const criptomonedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');


document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', submitFormulario);
    criptomonedasSelect.addEventListener('change', leerValor);
});

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
};

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
    e.preventDefault();

    const { criptomoneda } = objBusqueda;

    if (criptomoneda === '') {
        mostrarAlerta('Falta elegir una criptomoneda');
        return;
    }

    consultarAPI();
}

function consultarAPI() {
    const { criptomoneda } = objBusqueda;
    console.log(criptomoneda)

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=USD`;
    
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda]['USD']);
        });
}

function mostrarCotizacionHTML(cotizacion) {

    limpiarHTML();

    console.log(cotizacion);
    const { PRICE, HIGHDAY, LOWDAY } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `El Precio es: <span> ${PRICE} </span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `<p>Precio más alto del día: <span>${HIGHDAY}</span> </p>`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `<p>Precio más bajo del día: <span>${LOWDAY}</span> </p>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    formulario.appendChild(resultado);
}


function mostrarAlerta(mensaje) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');
    divMensaje.textContent = mensaje;
    formulario.appendChild(divMensaje);
    setTimeout(() => {
        divMensaje.remove();
    }, 3000);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}