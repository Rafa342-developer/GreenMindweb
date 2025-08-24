

<p id="confirmacion" style="display:none; color:green; margin-top:15px;">
  ¡Tu mensaje fue enviado correctamente!
</p>

const form = document.querySelector('form');
const confirmacion = document.getElementById('confirmacion');

form.addEventListener('submit', function(e){
  // Se envía normalmente, solo mostramos mensaje
  confirmacion.style.display = 'block';
  setTimeout(() => confirmacion.style.display = 'none', 5000);
});

