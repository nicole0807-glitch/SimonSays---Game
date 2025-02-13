"use strict";

const modalInstrucciones = document.getElementById('modalInstrucciones');
const modalScore = document.getElementById('modalScore');

const botonInstrucciones = document.getElementById('instrucciones');
const botonScore = document.getElementById('score');

const btnCerrarInstrucciones = document.getElementById('cerrarInstrucciones');
const btnCerrarScore = document.getElementById('cerrarScore');

const modalUsuario = document.getElementById('modalUsuario');
const btnGuardar = document.getElementById('guardar');




botonInstrucciones.addEventListener('click', function () {
    modalInstrucciones.showModal();
});

btnCerrarInstrucciones.addEventListener('click', function () {
    modalInstrucciones.close();
});

botonScore.addEventListener('click', function () {
    modalScore.showModal();
});

btnCerrarScore.addEventListener('click', function () {
    modalScore.close();
});

btnJugar.addEventListener('click', function () {
    modalInstrucciones.showModal();
});

btnGuardar.addEventListener('click', function () {
    
});
