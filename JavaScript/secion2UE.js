function abrirModal(id) {
  document.getElementById(id).style.display = "flex";
}

function cerrarModal(id) {
  document.getElementById(id).style.display = "none";
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(e) {
  const modales = document.querySelectorAll('.modal');
  modales.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}
