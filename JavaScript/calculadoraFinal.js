
let actual = 1;               // Paso actual en la calculadora
let instanciaGrafico = null;  // Variable para almacenar instancia del gráfico Chart.js

window.onload = function() {
  document.getElementById("resultado").style.display = "none";
  document.getElementById("impacto").style.display = "none";
  document.getElementById("contenedorGrafica").style.display = "none";
  document.getElementById('resetBtn').style.display = 'none';
  document.getElementById('downloadPdfBtn').style.display = 'none';
};

function nextStep(step) {
  const input = document.querySelector(`#step${step} input`);
  if (input.value === '' || input.value < 0) {
    alert('Por favor, ingresa un número válido (0 o más).');
    input.focus();
    return;
  }
  document.getElementById(`step${step}`).classList.remove('active');
  document.getElementById(`step${step + 1}`).classList.add('active');
  actual = step + 1;
  updateProgress();
}

function updateProgress() {
  const percent = (actual - 1) * 50;
  document.getElementById("progress").style.width = percent + "%";
}

function showResult() {
  const input = document.querySelector(`#step3 input`);
  if (input.value === '' || input.value < 0) {
    alert('Por favor, ingresa un número válido (0 o más).');
    input.focus();
    return;
  }

  document.getElementById("step3").classList.remove('active');
  actual = 4;
  updateProgress();

  const electricidad = parseFloat(document.getElementById("electricidad").value) || 0;
  const gas = parseFloat(document.getElementById("gas").value) || 0;
  const gasolina = parseFloat(document.getElementById("gasolina").value) || 0;

  const emElectricidad = electricidad * 0.5;
  const emGas = gas * 0.63;
  const emGasolina = gasolina * 8.89;

  const totalMensual = emElectricidad + emGas + emGasolina;
  const totalAnual = totalMensual * 12 / 1000;

  // Mostrar resultado
  const res = document.getElementById("resultado");
  res.style.display = "block";
  res.innerHTML = `
    <p><span style="color: #2E7D32;">${totalMensual.toFixed(2)} kg CO₂</span> / mes</p>
    <p><span style="color: #2E7D32;">${totalAnual.toFixed(2)} toneladas CO₂</span> / año</p>
  `;

  // Mostrar impacto
  const impacto = document.getElementById("impacto");
  impacto.style.display = "block";
  impacto.innerHTML = `
  <p><strong>Impacto estimado:</strong></p>
  <div class="impacto-item"> <img src="img/Avion2.png" width="150px" height="140px">${(totalAnual * 2.52).toFixed(1)} viajes en avión de ida entre San Salvador y Ciudad de Panamá.</div><br>
  <div class="impacto-item"> <img src="img/Arbol.png" width="170px" height="160px">${(totalAnual * 110).toFixed(0)} árboles necesarios para absorber tu huella anual.</div><br>
  <div class="impacto-item"> <img src="img/Automovil.png" width="150px" height="150px">${(totalAnual * 520).toFixed(0)} km recorridos en automóvil.</div><br>
  <div class="impacto-item"> <img src="img/Luz.png" width="200px" height="150px"> Equivale a dejar una luz LED encendida por ${(totalMensual * 2).toFixed(0)} horas.</div><br>
`;

  document.getElementById("contenedorGrafica").style.display = "block";

  if(instanciaGrafico) {
    instanciaGrafico.destroy();
  }

  const ctx = document.getElementById('resultChart').getContext('2d');
  instanciaGrafico = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Electricidad', 'Gas Propano', 'Gasolina'],
      datasets: [{
        label: 'Emisiones mensuales',
        data: [emElectricidad, emGas, emGasolina],
        backgroundColor: ['#0a5a14ff', '#81c784', '#E1C95F'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 13 } }
        }
      }
    }
  });

  // Mostrar botones al final
  document.getElementById('resetBtn').style.display = 'inline-block';
  document.getElementById('downloadPdfBtn').style.display = 'inline-block';
}

// Reiniciar calculadora
function resetCalculator() {
  document.getElementById("electricidad").value = '';
  document.getElementById("gas").value = '';
  document.getElementById("gasolina").value = '';

  document.getElementById("resultado").style.display = 'none';
  document.getElementById("impacto").style.display = 'none';
  document.getElementById("impacto").innerHTML = '';
  document.getElementById("contenedorGrafica").style.display = 'none';

  if(instanciaGrafico) {
    instanciaGrafico.destroy();
    instanciaGrafico = null;
  }

  for(let i = 1; i <= 3; i++) {
    document.getElementById(`step${i}`).classList.remove('active');
  }
  document.getElementById('step1').classList.add('active');

  actual = 1;
  updateProgress();

  document.getElementById('resetBtn').style.display = 'none';
  document.getElementById('downloadPdfBtn').style.display = 'none';
}

// Descargar PDF
document.getElementById('downloadPdfBtn').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const resultado = document.getElementById('resultado').innerText || "No hay resultados";
  const impacto = document.getElementById('impacto').innerText || "No hay impacto";

  doc.setFontSize(16);
  doc.text("Calculadora de Huella de Carbono", 20, 20);

  doc.setFontSize(12);
  doc.text("Resultado:", 20, 40);
  doc.text(resultado, 20, 50);

  doc.text("Impacto Estimado:", 20, 70);
  doc.text(impacto, 20, 80);

  doc.save("Huella_de_Carbono.pdf");
});
