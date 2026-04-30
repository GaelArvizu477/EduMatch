const contenedor = document.getElementById("cuestionario");

let respuestas = []; // Arreglo para guardar respuestas del usuario
let preguntaActual = 0; // Indice de pregunta actual
let perfilChart = null;

function obtenerColoresChart() {
  const isDark = document.documentElement.classList.contains("dark");
  return {
    backgroundColor: isDark ? "#1E429F33" : "#76A9FA33",
    borderColor: isDark ? "#76A9FA" : "#1E429F",
  };
}

function actualizarPaletaChart() {
  if (!perfilChart) return;
  const { backgroundColor, borderColor } = obtenerColoresChart();
  perfilChart.data.datasets[0].backgroundColor = backgroundColor;
  perfilChart.data.datasets[0].borderColor = borderColor;
  perfilChart.update();
}

const themeObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      actualizarPaletaChart();
      break;
    }
  }
});

themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});

const OPCIONES = [
  { value: -2, text: "Totalmente en desacuerdo" },
  { value: -1, text: "En desacuerdo" },
  { value: 0, text: "Neutral" },
  { value: 1, text: "De acuerdo" },
  { value: 2, text: "Totalmente de acuerdo" },
];

// Función para crear barra de progreso
function crearBarraProgreso(bloque) {
  const barraTexto = document.createElement("div");
  barraTexto.className = "flex justify-between mb-1";

  const progresoTexto = document.createElement("span");
  progresoTexto.className =
    "text-sm font-medium text-gray-500 dark:text-gray-400";
  progresoTexto.innerText = "Progreso";

  const porcentajeTexto = document.createElement("span");
  porcentajeTexto.className =
    "text-sm font-medium text-gray-500 dark:text-gray-400";
  porcentajeTexto.innerText =
    Math.round((preguntaActual / preguntas.length) * 100) + "%";

  const barraContenedor = document.createElement("div");
  barraContenedor.className =
    "w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mb-4";

  const barra = document.createElement("div");
  barra.className =
    "bg-blue-800 dark:bg-blue-400 h-2 rounded-full transition-all duration-500 ease-in-out";
  const porcentaje = ((preguntaActual + 1) / preguntas.length) * 100;
  barra.style.width = porcentaje + "%";

  const indicePregunta = document.createElement("p");
  indicePregunta.innerText = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  indicePregunta.className = "text-gray-500 dark:text-gray-400 mb-2";

  barraTexto.appendChild(progresoTexto);
  barraTexto.appendChild(porcentajeTexto);
  barraContenedor.appendChild(barra);

  bloque.appendChild(barraTexto);
  bloque.appendChild(barraContenedor);
  bloque.appendChild(indicePregunta);
}

// Función para crear opciones de radio
function crearOpciones(bloque) {
  OPCIONES.forEach((opcion) => {
    const div = document.createElement("div");
    div.className = "flex items-center mb-4 dark:text-white";

    const label = document.createElement("label");
    const input = document.createElement("input");
    input.className = `appearance-none w-4 h-4 mr-1 rounded-full border border-gray-500 bg-transparent
         checked:bg-blue-800 dark:checked:bg-blue-400
         checked:border-blue-800 dark:checked:border-blue-400
         focus:outline-none focus:ring-2 focus:ring-blue-800 dark:focus:ring-blue-400 focus:ring-opacity-50
         relative
         before:content-[''] before:absolute before:inset-1 before:rounded-full before:bg-white before:opacity-0
         checked:before:opacity-100
  `;
    input.type = "radio";
    input.name = "pregunta" + preguntaActual;
    input.value = opcion.value;

    if (respuestas[preguntaActual] == opcion.value) {
      input.checked = true;
    }

    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opcion.text));
    div.appendChild(label);
    bloque.appendChild(div);
  });
}

// Función para crear botones
function crearBotones(bloque) {
  const botonContenedor = document.createElement("div");
  botonContenedor.className = "flex justify-between mt-auto";
  bloque.appendChild(botonContenedor);

  // Botón Atrás
  const atras = document.createElement("button");
  atras.type = "button";
  atras.className =
    "text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1F2229] border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none transition";
  atras.innerText = "Atrás";

  atras.onclick = () => {
    const respuesta = document.querySelector(
      `input[name="pregunta${preguntaActual}"]:checked`,
    );
    if (respuesta) {
      respuestas[preguntaActual] = parseInt(respuesta.value);
    }
    preguntaActual--;
    mostrarPregunta();
  };

  botonContenedor.appendChild(atras);
  if (preguntaActual === 0) {
    atras.style.visibility = "hidden";
    atras.disabled = true;
  }

  // Botón Siguiente
  const siguiente = document.createElement("button");
  siguiente.type = "button";
  siguiente.className =
    "text-white dark:text-black bg-blue-800 dark:bg-blue-400 hover:bg-blue-900 dark:hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 font-medium rounded-full text-sm px-5 py-2.5 shadow-md transition-all duration-200";
  siguiente.innerText =
    preguntaActual === preguntas.length - 1 ? "Finalizar" : "Siguiente";

  siguiente.onclick = () => {
    const respuesta = document.querySelector(
      `input[name="pregunta${preguntaActual}"]:checked`,
    );
    if (!respuesta) {
      alert("Debes seleccionar una opción antes de poder avanzar");
      return;
    }
    respuestas[preguntaActual] = parseInt(respuesta.value);
    if (preguntaActual === preguntas.length - 1) {
      mostrarResultados();
      return;
    }
    preguntaActual++;
    mostrarPregunta();
  };

  botonContenedor.appendChild(siguiente);
}

// Mostrar Pregunta
function mostrarPregunta() {
  contenedor.innerHTML = "";
  const p = preguntas[preguntaActual];

  const bloque = document.createElement("div");
  bloque.id = "bloque";
  bloque.className =
    "w-full max-w-xl min-h-[436px] mx-auto mt-6 flex flex-col bg-gray-100 dark:bg-[#1F2229] p-6 border border-gray-300 dark:border-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-900 text-center";
  contenedor.appendChild(bloque);

  crearBarraProgreso(bloque);

  const texto = document.createElement("h5");
  texto.innerText = p.texto;
  texto.className = "mb-6 text-base text-gray-900 dark:text-white sm:text-lg";
  bloque.appendChild(texto);

  crearOpciones(bloque);
  crearBotones(bloque);
}

function mostrarResultados() {
  const resultados = calcularResultados();
  const ramas = obtenerRamas(resultados);
  mostrarRamas(ramas);
}

// Calcular resultados
function calcularResultados() {
  const resultados = {
    Realista: 0,
    Investigador: 0,
    Artistico: 0,
    Social: 0,
    Emprendedor: 0,
    Convencional: 0,
  };

  respuestas.forEach((valor, index) => {
    const pregunta = preguntas[index];
    const areaCapitalizada =
      pregunta.area.charAt(0).toUpperCase() + pregunta.area.slice(1);
    resultados[areaCapitalizada] += valor;
  });

  return resultados;
}

// Obtener Ramas de carreras
function obtenerRamas(resultados) {
  const top3 = Object.entries(resultados)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key.toLowerCase());

  const conteo = {};
  top3.forEach((tipo) => {
    riasecRamas[tipo].forEach((rama) => {
      conteo[rama] = (conteo[rama] || 0) + 1;
    });
  });

  const ramasOrdenadas = Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => key);

  return ramasOrdenadas.slice(0, 3);
}

// Mostrar resultados en pantalla
function mostrarRamas(ramas) {
  const resultados = calcularResultados(); // Get the scores again

  // Limpiar cuestionario
  document.getElementById("cuestionario").innerHTML = "";
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";

  const contenedor = document.createElement("div");
  contenedor.className =
    "w-full max-w-2xl min-h-[436px] mx-auto mt-8 mb-10 flex flex-col bg-gray-100 dark:bg-[#1F2229] p-6 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl dark:shadow-gray-900 text-center";

  // Title
  const title = document.createElement("h2");
  title.innerText = "Tu perfil";
  title.className = "text-3xl font-bold mb-4 text-gray-900 dark:text-white";
  contenedor.appendChild(title);

  // Canvas for chart
  const canvas = document.createElement("canvas");
  canvas.id = "chart";
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.width = "400px";
  canvas.style.height = "400px";
  canvas.className = "mx-auto mb-4";
  contenedor.appendChild(canvas);

  // Create radar chart
  const labels = Object.keys(resultados);
  const data = Object.values(resultados);

  const { backgroundColor, borderColor } = obtenerColoresChart();

  if (perfilChart) {
    perfilChart.destroy();
  }

  perfilChart = new Chart(canvas, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Perfil",
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        r: {
          ticks: {
            display: false,
          },
        },
      },
    },
  });

  // Text results
  const textDiv = document.createElement("div");
  textDiv.className = "result text-left";

  const sorted = Object.entries(resultados).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3).map((x) => x[0]);

  const careers = {
    Realista: ["Ingeniería Civil", "Arquitectura", "Ingeniería Mecánica"],
    Investigador: ["Medicina", "Biotecnología", "Química"],
    Artistico: ["Diseño Gráfico", "Artes", "Comunicación"],
    Social: ["Psicología", "Enfermería", "Educación"],
    Emprendedor: ["Administración", "Marketing", "Negocios"],
    Convencional: ["Contabilidad", "Finanzas", "Administración"],
  };

  let html =
    "<h3 class='text-2xl font-bold mb-4 mx-auto text-center text-gray-900 dark:text-white'>Top 3 perfiles:</h3>";

  // Crear acordeón para cada perfil
  top3.forEach((perfil, index) => {
    const perfilCareers = careers[perfil] || [];
    const careersList = perfilCareers
      .slice(0, 2)
      .map((c) => `<li class="text-gray-600 dark:text-gray-400">• ${c}</li>`)
      .join("");

    html += `
    <div id="accordion-card-${index}" class="mb-2">
      <h2 id="accordion-card-heading-${index}">
        <button type="button" class="flex items-center justify-between w-full p-4 font-medium rtl:text-right text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 gap-3 transition-all duration-300" data-accordion-target="#accordion-card-body-${index}" aria-expanded="false" aria-controls="accordion-card-body-${index}">
          <span class="text-lg font-semibold">${perfil}</span>
          <svg data-accordion-icon class="w-5 h-5 transition-transform duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/></svg>
        </button>
      </h2>
      <div id="accordion-card-body-${index}" class="hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0" aria-labelledby="accordion-card-heading-${index}">
        <div class="p-4">
          <p class="mb-2 text-gray-700 dark:text-gray-300 font-medium">Carreras recomendadas:</p>
          <ul class="space-y-1">
            ${careersList}
          </ul>
        </div>
      </div>
    </div>`;
  });

  // Agregar evento para togglear acordeones con animación
  setTimeout(() => {
    document.querySelectorAll("[data-accordion-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.querySelector(
          button.getAttribute("data-accordion-target"),
        );
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        // Toggle aria-expanded
        button.setAttribute("aria-expanded", !isExpanded);

        // Animar el contenido del acordeón
        if (!isExpanded) {
          // Abrir - anim max-height
          target.classList.remove("hidden");
          target.style.maxHeight = target.scrollHeight + "px";
          // Rotar icono
          button
            .querySelector("[data-accordion-icon]")
            .classList.add("rotate-180");
        } else {
          // Cerrar
          target.style.maxHeight = "0px";
          setTimeout(() => {
            target.classList.add("hidden");
            target.style.maxHeight = "";
          }, 300);
          // Quitar rotación
          button
            .querySelector("[data-accordion-icon]")
            .classList.remove("rotate-180");
        }
      });
    });
  }, 100);

  textDiv.innerHTML = html;
  contenedor.appendChild(textDiv);

  // Buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "flex justify-center space-x-4 mt-4";

  const downloadBtn = document.createElement("button");
  downloadBtn.innerHTML = `
  <svg class="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/>
  </svg>
  Descargar PDF
`;
  downloadBtn.className =
    "inline-flex items-center bg-blue-800 dark:bg-blue-400 text-white dark:text-black px-4 py-2 rounded-full hover:bg-blue-900 dark:hover:bg-blue-300 transition";
  downloadBtn.onclick = () => downloadPDF(resultados);
  buttonContainer.appendChild(downloadBtn);

  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = `
  <svg class="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 237.3C544 220.3 537.3 204 525.3 192L448 114.7C436 102.7 419.7 96 402.7 96L160 96zM192 192C192 174.3 206.3 160 224 160L384 160C401.7 160 416 174.3 416 192L416 256C416 273.7 401.7 288 384 288L224 288C206.3 288 192 273.7 192 256L192 192zM320 352C355.3 352 384 380.7 384 416C384 451.3 355.3 480 320 480C284.7 480 256 451.3 256 416C256 380.7 284.7 352 320 352z"/>
  </svg>
  Guardar resultado
`;
  saveBtn.className =
    "inline-flex items-center bg-green-800 dark:bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-900 dark:hover:bg-green-600 transition";
  saveBtn.onclick = () => saveResult(resultados);
  buttonContainer.appendChild(saveBtn);

  const restartBtn = document.createElement("button");
  restartBtn.innerHTML = `
    <svg class="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"/>
  </svg>
  Reiniciar`;
  restartBtn.className =
    "inline-flex items-center bg-gray-800 dark:bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-900 dark:hover:bg-gray-700 transition";
  restartBtn.onclick = () => location.reload();
  buttonContainer.appendChild(restartBtn);

  contenedor.appendChild(buttonContainer);

  resultadosDiv.appendChild(contenedor);
}

//* Funcion para descargar PDF
function downloadPDF(scores) {
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();
  doc.text("Resultado Vocacional", 20, 20);
  doc.text(JSON.stringify(scores), 20, 40);
  doc.save("resultado.pdf");
}

// Function to save result
function saveResult(scores) {
  localStorage.setItem("resultadoVocacional", JSON.stringify(scores));
  alert("Resultado guardado");
}

mostrarPregunta();
