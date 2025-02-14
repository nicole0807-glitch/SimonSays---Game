document.getElementById('score').addEventListener('click', function() {
    const modalScore = document.getElementById('modalScore');
    const tbody = document.querySelector('#tablaScore tbody');
    tbody.innerHTML = ''; // Limpiar tabla antes de mostrar

    // Obtener y ordenar las puntuaciones
    let scores = obtenerPuntuaciones();

    // Agregar filas a la tabla
    scores.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${entry.username}</td><td>${entry.score}</td>`;
        tbody.appendChild(row);
    });

    modalScore.showModal(); // Mostrar el modal
});

// Cerrar el modal de puntuaciones
document.getElementById('cerrarScore').addEventListener('click', function() {
    document.getElementById('modalScore').close();
});