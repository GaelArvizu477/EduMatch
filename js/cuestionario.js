const contenedor = document.getElementById("cuestionario");

let respuestas = []; // Arreglo para guardar respuestas del usuario
let preguntaActual = 0; // Indice de pregunta actual
let perfilChart = null;

function obtenerColoresChart() {
  const isDark = document.documentElement.classList.contains("dark");
  return {
    backgroundColor: isDark ? "#1E429F33" : "#76A9FA33",
    borderColor: isDark ? "#76A9FA" : "#1E429F",

    gridColor: isDark ? "#9ea5b11a" : "#37415133",
    angleLineColor: isDark ? "#9ea5b11a" : "#37415133",
    labelColor: isDark ? "#D1D5DB" : "#374151",
  };
}

// Funcion para dibujar el canvas en modo claro en el PDF
function aplicarModoClaroChart() {
  if (!perfilChart) return;

  // Colores tipo light mode (forzados)
  perfilChart.options.scales.r.grid.color = "#37415133";
  perfilChart.options.scales.r.angleLines.color = "#37415133";
  perfilChart.options.scales.r.pointLabels.color = "#374151";

  perfilChart.data.datasets[0].backgroundColor = "#76A9FA33";
  perfilChart.data.datasets[0].borderColor = "#1E429F";

  perfilChart.update("none");
}

function actualizarPaletaChart() {
  if (!perfilChart) return;
  const {
    backgroundColor,
    borderColor,
    gridColor,
    angleLineColor,
    labelColor,
  } = obtenerColoresChart();

  // Actualizar colores de datasets
  perfilChart.data.datasets[0].backgroundColor = backgroundColor;
  perfilChart.data.datasets[0].borderColor = borderColor;

  // Actualizar colores de grid, angleLines y pointLabels
  perfilChart.options.scales.r.grid.color = gridColor;
  perfilChart.options.scales.r.angleLines.color = angleLineColor;
  perfilChart.options.scales.r.pointLabels.color = labelColor;

  perfilChart.update();
}

function obtenerRutaImagenInstrucciones() {
  return document.documentElement.classList.contains("dark")
    ? "./imagenes/RespuestasOscuro.svg"
    : "./imagenes/RespuestasClaro.svg";
}

const themeObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      actualizarPaletaChart();
      const instruccionImg = document.getElementById("imagen-instrucciones");
      if (instruccionImg) {
        instruccionImg.src = obtenerRutaImagenInstrucciones();
      }
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

// Funcion para mostrar las instrucciones del test
function mostrarInstrucciones() {
  contenedor.innerHTML = "";

  // Bloque principal
  const bloque = document.createElement("div");
  bloque.className = "max-w-2xl mx-auto px-4 sm:px-6 md:px-8 text-center animate-fade-in";

  // Imagen
  const imagen = document.createElement("img");
  imagen.id = "imagen-instrucciones";
  imagen.src = obtenerRutaImagenInstrucciones();
  imagen.alt = "Ilustración instrucciones";
  imagen.className = "w-40 sm:w-56 md:w-72 mx-auto mb-2 sm:mb-4 transition-all";

  // Título
  const titulo = document.createElement("h2");
  titulo.innerText = "Instrucciones";
  titulo.className =
    "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6";

  // Lista
  const lista = document.createElement("ul");
  lista.className =
  "max-w-md mx-auto text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base space-y-2 sm:space-y-4 mb-4 sm:mb-6 px-2 sm:px-0";

  // Instrucciones
  const instrucciones = [
    "Responde a cada afirmación basándote en tu opinión personal",
    "Puedes volver atrás y cambiar tus respuestas antes de finalizar.",
  ];

  instrucciones.forEach((texto) => {
    const item = document.createElement("li");

    item.className = "flex items-start gap-3";

    item.innerHTML = `
      <span class="text-blue-800 dark:text-blue-400 font-bold text-lg shrink-0">•</span>
      <span class="text-left">${texto}</span>
    `;

    lista.appendChild(item);
  });

  // Botón
  const boton = document.createElement("button");
  boton.innerText = "Iniciar test";

  boton.className =
    "font-semibold text-white dark:text-black bg-blue-800 dark:bg-blue-400 hover:bg-blue-900 dark:hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 rounded-full text-xs sm:text-sm md:text-base px-4 sm:px-6 py-2 sm:py-3 shadow-md transition-all duration-200 w-full sm:w-auto";

  boton.onclick = () => {
    mostrarPregunta();
  };

  // Agregar elementos
  bloque.appendChild(imagen);
  bloque.appendChild(titulo);
  bloque.appendChild(lista);
  bloque.appendChild(boton);

  contenedor.appendChild(bloque);
}

// Función para crear barra de progreso
function crearBarraProgreso(bloque) {
  const barraTexto = document.createElement("div");
  barraTexto.className = "flex justify-between mb-1";

  const progresoTexto = document.createElement("span");
  progresoTexto.className =
    "text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400";
  progresoTexto.innerText = "Progreso";

  const porcentajeTexto = document.createElement("span");
  porcentajeTexto.className =
    "text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400";
  porcentajeTexto.innerText =
    Math.round((preguntaActual / preguntas.length) * 100) + "%";

  const barraContenedor = document.createElement("div");
  barraContenedor.className =
    "w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mb-4";

  const barra = document.createElement("div");
  barra.className =
    "bg-blue-800 dark:bg-blue-400 h-2 rounded-full transition-all duration-500 ease-in-out";
  const porcentaje = (preguntaActual / preguntas.length) * 100;
  barra.style.width = porcentaje + "%";

  const indicePregunta = document.createElement("p");
  indicePregunta.innerText = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  indicePregunta.className = "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-4";

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
    div.className = "flex items-center mb-3 sm:mb-4 dark:text-white text-sm sm:text-base";

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
  botonContenedor.className = "flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-2 mt-auto";
  bloque.appendChild(botonContenedor);

  // Botón Atrás
  const atras = document.createElement("button");
  atras.type = "button";
  atras.className =
    "text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1F2229] border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 font-medium leading-5 rounded-full text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 focus:outline-none transition w-full sm:w-auto";
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
    "font-semibold text-white dark:text-black bg-blue-800 dark:bg-blue-400 hover:bg-blue-900 dark:hover:bg-blue-300 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 font-medium rounded-full text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 shadow-md transition-all duration-200 w-full sm:w-auto";
  siguiente.innerText =
    preguntaActual === preguntas.length - 1 ? "Finalizar" : "Siguiente";

  siguiente.onclick = () => {
    const respuesta = document.querySelector(
      `input[name="pregunta${preguntaActual}"]:checked`,
    );
    if (!respuesta) {
      Swal.fire({
        toast: true,
        position: "bottom-right",
        icon: "warning",
        title: "Debes responder la pregunta antes de continuar.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        customClass: {
          popup: "rounded-2xl dark:bg-[#1F2229] dark:text-white",
        },
      });
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
    "w-full max-w-xl min-h-[420px] sm:min-h-[460px] mx-auto mt-4 sm:mt-4 mb-4 sm:mb-0 flex flex-col bg-gray-100 dark:bg-[#1F2229] p-4 sm:p-6 border border-gray-300 dark:border-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl dark:shadow-gray-900 text-center";
  contenedor.appendChild(bloque);

  crearBarraProgreso(bloque);

  const contenedorPregunta = document.createElement("div");
  contenedorPregunta.className = "mb-4 sm:mb-6 min-h-[50px] sm:min-h-[60px]";

  bloque.appendChild(contenedorPregunta);
  const texto = document.createElement("h5");
  texto.innerText = p.texto;
  texto.className = "text-sm sm:text-base md:text-lg text-gray-900 dark:text-white leading-tight";
  bloque.appendChild(contenedorPregunta);
  contenedorPregunta.appendChild(texto);

  crearOpciones(bloque);
  crearBotones(bloque);
}

function mostrarResultados() {
  const resultados = calcularResultados();
  mostrarPerfiles(resultados);
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

//* Mostrar resultados en pantalla
function mostrarPerfiles(resultados) {
  // Limpiar cuestionario
  document.getElementById("cuestionario").innerHTML = "";
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";

  const contenedor = document.createElement("div");
  contenedor.id = "paginaPDF";
  contenedor.className =
    "w-full max-w-2xl min-h-[460px] mx-auto mt-4 sm:mt-8 mb-6 sm:mb-10 flex flex-col bg-gray-100 dark:bg-[#1F2229] p-4 sm:p-6 border border-gray-300 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl dark:shadow-gray-900 text-center";

  // Title
  const title = document.createElement("h2");
  title.innerText = "Tu perfil";
  title.className = "text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white";
  contenedor.appendChild(title);

  // Canvas for chart
  const canvas = document.createElement("canvas");
  canvas.id = "chart";
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.width = "100%";
  canvas.style.maxWidth = "400px";
  canvas.style.height = "auto";
  canvas.className = "mx-auto mb-4 sm:mb-6 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px]";
  contenedor.appendChild(canvas);

  // Create radar chart
  const labels = Object.keys(resultados);
  const data = Object.values(resultados);
  const dataNormalizada = data.map((valor) => ((valor + 12) / 24) * 100);

  const {
    backgroundColor,
    borderColor,
    gridColor,
    angleLineColor,
    labelColor,
  } = obtenerColoresChart();

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
          data: dataNormalizada,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          stepSize: 20,
          ticks: {
            display: false,
          },
          grid: {
            color: gridColor,
          },
          angleLines: {
            color: angleLineColor,
          },
          pointLabels: {
            color: labelColor,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const index = context.dataIndex;
              const valorReal = data[index];
              return `${labels[index]}: ${valorReal}`;
            },
          },
        },
      },
    },
  });

  //* Resultados
  const textDiv = document.createElement("div");
  textDiv.className = "result text-left overflow-x-hidden";

  const sorted = Object.entries(resultados).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3).map((x) => x[0]);

  let html = `
<div class="mb-2">
  <h2 id="accordion-desc-heading-all">
    <button type="button"
      class="flex items-center justify-between w-full p-3 sm:p-4 font-medium text-sm sm:text-base text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 sm:gap-3 transition-all duration-300"
      data-accordion-target="#accordion-desc-body-all"
      aria-expanded="false"
      aria-controls="accordion-desc-body-all">
      
      <span class="text-sm sm:text-base md:text-lg font-semibold flex items-center"><svg class="w-4 h-4 sm:w-5 sm:h-5 me-2 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>Conoce qué dice cada perfil de ti</span>

      <svg data-accordion-icon class="w-5 h-5 transition-transform duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/></svg>

    </button>
  </h2>

  <div id="accordion-desc-body-all"
    class="hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0"
    aria-labelledby="accordion-desc-heading-all">
    
    <div class="p-3 sm:p-4 space-y-4 sm:space-y-6">
`;

  // Recorrer los 6 perfiles dentro del acordeón
  Object.keys(RIASEC).forEach((perfil, index) => {
    html += `
      <div class="border-b border-gray-300 dark:border-gray-600 pb-3 sm:pb-4 last:border-b-0">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">${perfil}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
          ${RIASEC[perfil]}
        </p>
      </div>
`;
  });

  html += `
    </div>
  </div>
</div>

<h3 class='text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 mx-auto text-center text-gray-900 dark:text-white mt-4 sm:mt-6'>Top 3 perfiles:</h3>
`;

  // Crear acordeón para cada perfil del Top 3
  top3.forEach((perfil, index) => {
    const perfilCareers = careers[perfil] || [];
    const careersList = perfilCareers
      .map((c) => `<li class=\"text-gray-600 dark:text-gray-400 text-xs sm:text-sm\">• ${c}</li>`)
      .join("");

    html += `
    <div id="accordion-card-${index}" class="mb-2">
      <h2 id="accordion-card-heading-${index}">
        <button type="button" class="flex items-center justify-between w-full p-3 sm:p-4 font-medium rtl:text-right text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 sm:gap-3 transition-all duration-300" data-accordion-target="#accordion-card-body-${index}" aria-expanded="false" aria-controls="accordion-card-body-${index}">
          <span class="text-sm sm:text-base md:text-lg font-semibold">${perfil}</span>
          <svg data-accordion-icon class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/></svg>
        </button>
      </h2>
      <div id="accordion-card-body-${index}" class="hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0" aria-labelledby="accordion-card-heading-${index}">
        <div class="p-3 sm:p-4">
          <p class="mb-2 text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm">Carreras recomendadas:</p>
          <ul class="space-y-1 text-xs sm:text-sm">
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
          // Rotar icono si existe
          const icon = button.querySelector("[data-accordion-icon]");
          if (icon) {
            icon.classList.add("rotate-180");
          }
        } else {
          // Cerrar
          target.style.maxHeight = "0px";
          setTimeout(() => {
            target.classList.add("hidden");
            target.style.maxHeight = "";
          }, 300);
          // Quitar rotación si existe
          const icon = button.querySelector("[data-accordion-icon]");
          if (icon) {
            icon.classList.remove("rotate-180");
          }
        }
      });
    });
  }, 100);

  textDiv.innerHTML = html;
  contenedor.appendChild(textDiv);

  // Buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "flex flex-col sm:flex-row justify-center gap-3 sm:gap-2 md:gap-4 mt-4 sm:mt-6 w-full";

  const downloadBtn = document.createElement("button");
  downloadBtn.innerHTML = `
  <svg class="w-3 h-3 sm:w-4 sm:h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/>
  </svg>
  <span class="text-xs sm:text-sm">Descargar PDF</span>
`;
  downloadBtn.className =
    "inline-flex items-center justify-center bg-blue-800 dark:bg-blue-400 text-white dark:text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-blue-900 dark:hover:bg-blue-300 transition w-full sm:w-auto";
  downloadBtn.onclick = () => downloadPDF(resultados, respuestas);
  buttonContainer.appendChild(downloadBtn);

  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = `
  <svg class="w-3 h-3 sm:w-4 sm:h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 237.3C544 220.3 537.3 204 525.3 192L448 114.7C436 102.7 419.7 96 402.7 96L160 96zM192 192C192 174.3 206.3 160 224 160L384 160C401.7 160 416 174.3 416 192L416 256C416 273.7 401.7 288 384 288L224 288C206.3 288 192 273.7 192 256L192 192zM320 352C355.3 352 384 380.7 384 416C384 451.3 355.3 480 320 480C284.7 480 256 451.3 256 416C256 380.7 284.7 352 320 352z"/>
  </svg>
  <span class="text-xs sm:text-sm">Guardar resultado</span>
`;
  saveBtn.className =
    "inline-flex items-center justify-center bg-green-800 dark:bg-green-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-green-900 dark:hover:bg-green-600 transition w-full sm:w-auto";
  saveBtn.onclick = () => saveResult(resultados);
  buttonContainer.appendChild(saveBtn);

  const restartBtn = document.createElement("button");
  restartBtn.innerHTML = `
    <svg class="w-3 h-3 sm:w-4 sm:h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"/>
  </svg>
  <span class="text-xs sm:text-sm">Reiniciar</span>`;
  restartBtn.className =
    "inline-flex items-center justify-center bg-gray-800 dark:bg-gray-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-gray-900 dark:hover:bg-gray-700 transition w-full sm:w-auto";
  restartBtn.onclick = () => location.reload();
  buttonContainer.appendChild(restartBtn);

  contenedor.appendChild(buttonContainer);

  resultadosDiv.appendChild(contenedor);
}

//* Funcion para descargar PDF
function downloadPDF(scores, respuestas) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  // Colores
  const primaryColor = [35, 56, 118]; // blue-900
  const textColor = [50, 50, 50];
  const lightGray = [240, 240, 240];

  // Función auxiliar para dibujar línea horizontal
  const drawLine = (y, color = lightGray) => {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
  };

  // Función auxiliar para nueva página si es necesario
  const checkNewPage = (requiredSpace) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  // === ENCABEZADO ===
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("EduMatch", margin, 15);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Resultados del Perfil Vocacional", margin, 25);

  // Fecha a la derecha
  const fecha = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.setFontSize(10);
  doc.text(fecha, pageWidth - margin, 25, { align: "right" });

  yPos = 45;

  // === GRÁFICO RADAR ===
  doc.setTextColor(...textColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Perfil RIASEC", margin, yPos);

  // Obtener el canvas del gráfico y convertir a imagen

  const chartCanvas = document.getElementById("chart");

  if (chartCanvas && perfilChart) {
    // Guardar estado actual
    const originalOptions = JSON.parse(JSON.stringify(perfilChart.options));
    const originalDataset = JSON.parse(
      JSON.stringify(perfilChart.data.datasets),
    );

    // Forzar modo claro
    aplicarModoClaroChart();

    // Capturar imagen
    const chartImg = chartCanvas.toDataURL("image/png", 1.0);

    // Restaurar estado original
    perfilChart.options = originalOptions;
    perfilChart.data.datasets = originalDataset;
    perfilChart.update("none");

    const imgSize = 80;
    const imgX = (pageWidth - imgSize) / 2;
    doc.addImage(chartImg, "PNG", imgX, yPos, imgSize, imgSize);

    yPos += imgSize + 5;
  }

  // === TABLA DE RESULTADOS ===
  checkNewPage(60);
  drawLine(yPos);
  yPos += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Puntuaciones por Área", margin, yPos);
  yPos += 5;

  // Ordenar resultados de mayor a menor
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  // Encabezado de tabla
  doc.setFillColor(...lightGray);
  doc.rect(margin, yPos, pageWidth - margin * 2, 8, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...textColor);
  doc.text("Área", margin + 5, yPos + 5);
  doc.text("Puntuación", pageWidth - margin - 30, yPos + 5);
  yPos += 12;

  // Filas de datos
  doc.setFont("helvetica", "normal");
  sortedScores.forEach(([area, score], index) => {
    // Alternar colores de fondo
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPos - 2, pageWidth - margin * 2, 8, "F");
    }

    doc.text(area, margin + 5, yPos + 4);
    doc.text(score.toString(), pageWidth - margin - 20, yPos + 4);
    yPos += 8;
  });

  yPos += 5;

  // === RESPUESTAS DE CADA PREGUNTA ===

  // escala de resultados
  const escala = {
    "-2": "Totalmente en desacuerdo",
    "-1": "En desacuerdo",
    0: "Neutral",
    1: "De acuerdo",
    2: "Totalmente de acuerdo",
  };

  drawLine(yPos);
  yPos += 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...textColor);
  doc.text("Respuestas", margin, yPos);

  yPos += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...textColor);

  // Configuración de columnas
  const colCount = 4;
  const colWidth = (pageWidth - margin * 2) / colCount;
  const rowHeight = 6;

  const itemsPerCol = Math.ceil(respuestas.length / colCount);

  respuestas.forEach((valor, index) => {
    const col = Math.floor(index / itemsPerCol);
    const row = index % itemsPerCol;

    const x = margin + col * colWidth;
    const yActual = yPos + row * rowHeight;

    const texto = escala[valor] ?? "Sin respuesta";

    doc.text(`${index + 1}. ${texto}`, x, yActual);
  });

  // === TOP 3 PERFILES ===
  checkNewPage(80);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Top 3 Perfiles Recomendados", margin, yPos);
  yPos += 5;

  sortedScores.slice(0, 3).forEach(([perfil, score], index) => {
    // Verificar espacio disponible
    checkNewPage(40);

    // Número del perfil
    doc.setFillColor(...primaryColor);
    doc.circle(margin + 5, yPos + 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text((index + 1).toString(), margin + 5, yPos + 4, { align: "center" });

    // Nombre del perfil
    doc.setTextColor(...textColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    const xBase = margin + 12;
    const yBase = yPos + 5;
    doc.text(perfil, xBase, yBase - 0.5);
    const perfilWidth = doc.getTextWidth(perfil);

    // Puntuación
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`(${score} pts)`, xBase + perfilWidth + 3, yBase - 0.5);

    yPos += 8;

    // Descripcion del perfil
    const descripcion = RIASEC[perfil] || "Descripción no disponible";
    doc.setFontSize(9);
    doc.setTextColor(...textColor);
    const descripcionLines = doc.splitTextToSize(
      descripcion,
      pageWidth - margin * 2 - 12,
    );
    descripcionLines.forEach((line) => {
      checkNewPage(6);
      doc.text(line, xBase, yPos + 3);
      yPos += 5;
    });

    yPos += 3;
    drawLine(yPos);
    yPos += 4;

    // carera recomendada subtitulo
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Carreras recomendadas:", xBase, yPos + 3);
    yPos += 6;

    // Carreras recomendadas
    const perfilCareers = careers[perfil] || [];
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...textColor);
    perfilCareers.forEach((carrera) => {
      checkNewPage(10);
      doc.text(`• ${carrera}`, margin + 12, yPos + 3);
      yPos += 6;
    });

    yPos += 5;
  });

  // === PIE DE PÁGINA ===
  yPos = pageHeight - 14;
  drawLine(yPos);
  yPos = pageHeight - 10;

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Generado por EduMatch - Guía vocacional", pageWidth / 2, yPos, {
    align: "center",
  });
  doc.text(
    "https://gaelarvizu477.github.io/EduMatch/",
    pageWidth / 2,
    yPos + 4,
    {
      align: "center",
    },
  );

  // Guardar el PDF
  doc.save("resultado-vocacional.pdf");
}

// Function to save result
function saveResult(scores) {
  localStorage.setItem("resultadoVocacional", JSON.stringify(scores));
  alert("Resultado guardado");
}

mostrarInstrucciones();
