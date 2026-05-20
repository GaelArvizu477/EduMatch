const contenedor = document.getElementById("cuestionario");

let respuestas = [];
let preguntaActual = 0;
let graficoPerfil = null;

//! Paleta de colores del gráfico según tema
function obtenerColoresGrafico() {
  const estaOscuro = document.documentElement.classList.contains("dark");
  return {
    backgroundColor: estaOscuro ? "#1E429F33" : "#76A9FA33",
    borderColor: estaOscuro ? "#76A9FA" : "#1E429F",

    gridColor: estaOscuro ? "#9ea5b11a" : "#37415133",
    angleLineColor: estaOscuro ? "#9ea5b11a" : "#37415133",
    labelColor: estaOscuro ? "#D1D5DB" : "#374151",
  };
}

//! Ajustes del gráfico para exportar en modo claro
function aplicarModoClaroGrafico() {
  if (!graficoPerfil) return;

  //* Colores forzados para versión clara en PDF
  graficoPerfil.options.scales.r.grid.color = "#37415133";
  graficoPerfil.options.scales.r.angleLines.color = "#37415133";
  graficoPerfil.options.scales.r.pointLabels.color = "#374151";

  graficoPerfil.data.datasets[0].backgroundColor = "#76A9FA33";
  graficoPerfil.data.datasets[0].borderColor = "#1E429F";

  graficoPerfil.update("none");
}

//! Actualiza colores del gráfico cuando cambia el tema
function actualizarPaletaGrafico() {
  if (!graficoPerfil) return;
  const {
    backgroundColor,
    borderColor,
    gridColor,
    angleLineColor,
    labelColor,
  } = obtenerColoresGrafico();

  //* Actualizar colores de datasets
  graficoPerfil.data.datasets[0].backgroundColor = backgroundColor;
  graficoPerfil.data.datasets[0].borderColor = borderColor;

  //* Actualizar colores de grid, angleLines y pointLabels
  graficoPerfil.options.scales.r.grid.color = gridColor;
  graficoPerfil.options.scales.r.angleLines.color = angleLineColor;
  graficoPerfil.options.scales.r.pointLabels.color = labelColor;

  graficoPerfil.update();
}

//! Ruta de la imagen de instrucciones según tema
function obtenerRutaImagenInstrucciones() {
  return document.documentElement.classList.contains("dark")
    ? "./imagenes/RespuestasOscuro.svg"
    : "./imagenes/RespuestasClaro.svg";
}

const observadorTema = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      actualizarPaletaGrafico();
      const instruccionImg = document.getElementById("imagen-instrucciones");
      if (instruccionImg) {
        instruccionImg.src = obtenerRutaImagenInstrucciones();
      }
      break;
    }
  }
});

observadorTema.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});

const opciones = [
  { value: -2, text: "Totalmente en desacuerdo" },
  { value: -1, text: "En desacuerdo" },
  { value: 0, text: "Neutral" },
  { value: 1, text: "De acuerdo" },
  { value: 2, text: "Totalmente de acuerdo" },
];

//! Mostrar las instrucciones del test
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

  //* Agregar elementos
  bloque.appendChild(imagen);
  bloque.appendChild(titulo);
  bloque.appendChild(lista);
  bloque.appendChild(boton);

  contenedor.appendChild(bloque);
}

//! Crear la barra de progreso
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

//! Crear las opciones de radio
function crearOpciones(bloque) {
  opciones.forEach((opcion) => {
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

//! Crear los botones de navegación
function crearBotones(bloque) {
  const botonContenedor = document.createElement("div");
  botonContenedor.className = "flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-2 mt-auto";
  bloque.appendChild(botonContenedor);

  //* Botón Atrás
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

  //* Botón Siguiente
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

//! Mostrar la pregunta actual
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

//! Calcular puntajes por área
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

//! Mostrar resultados en pantalla
function mostrarPerfiles(resultados) {
  //* Limpiar cuestionario
  document.getElementById("cuestionario").innerHTML = "";
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";

  const contenedor = document.createElement("div");
  contenedor.id = "paginaPDF";
  contenedor.className =
    "w-full max-w-2xl min-h-[460px] mx-auto mt-4 sm:mt-8 mb-6 sm:mb-10 flex flex-col bg-gray-100 dark:bg-[#1F2229] p-4 sm:p-6 border border-gray-300 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl dark:shadow-gray-900 text-center";

  //* Título de la sección de resultados
  const title = document.createElement("h2");
  title.innerText = "Tu perfil";
  title.className = "text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white";
  contenedor.appendChild(title);

  //* Canvas para el gráfico
  const canvas = document.createElement("canvas");
  canvas.id = "chart";
  canvas.width = 400;
  canvas.height = 400;
  canvas.style.width = "100%";
  canvas.style.maxWidth = "400px";
  canvas.style.height = "auto";
  canvas.className = "mx-auto mb-4 sm:mb-6 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px]";
  contenedor.appendChild(canvas);

  //* Crear gráfico radar
  const labels = Object.keys(resultados);
  const data = Object.values(resultados);
  const dataNormalizada = data.map((valor) => ((valor + 12) / 24) * 100);

  const {
    backgroundColor,
    borderColor,
    gridColor,
    angleLineColor,
    labelColor,
  } = obtenerColoresGrafico();

  if (graficoPerfil) {
    graficoPerfil.destroy();
  }

  graficoPerfil = new Chart(canvas, {
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
  const contenedorTexto = document.createElement("div");
  contenedorTexto.className = "result text-left overflow-x-hidden";

  const resultadosOrdenados = Object.entries(resultados).sort((a, b) => b[1] - a[1]);
  const topTres = resultadosOrdenados.slice(0, 3).map((x) => x[0]);

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

  //* Recorrer los 6 perfiles dentro del acordeón
  Object.keys(perfilesRiasc).forEach((perfil) => {
    html += `
      <div class="border-b border-gray-300 dark:border-gray-600 pb-3 sm:pb-4 last:border-b-0">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">${perfil}</h3>
        <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">
          ${perfilesRiasc[perfil]}
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

  //* Crear acordeón para cada perfil del top tres
  topTres.forEach((perfil, index) => {
    const ClavePerfil = perfil.toLowerCase();
    const carrerasPerfil = carrerasPorPerfil[ClavePerfil] || [];
    const tablaCarreras = carrerasPerfil.length
      ? `
        <div class="overflow-hidden rounded-lg">
          <div class="hidden sm:grid grid-cols-[1.5fr_0.8fr] gap-3 px-3 py-3 text-[0.68rem] sm:text-xs uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 bg-white dark:dark:bg-[#2D3038]">
            <span>Nombre de la carrera</span>
            <span class="text-right">Campus</span>
          </div>
          <table class="w-full text-sm sm:text-base border-separate border-spacing-y-2">
            <tbody>
              ${carrerasPerfil
                .map(
                  (c, rowIndex) => `
                    <tr class="rounded-3xl ${rowIndex % 2 === 0 ? 'bg-transparent dark:bg-transparent' : 'bg-white dark:bg-[#2D3038]'}">
                      <td class="py-3 px-3 sm:px-4 align-top w-[60%]">
                        <a href="${c.enlace}" target="_blank" rel="noopener noreferrer" class="block font-semibold text-slate-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-300 break-words">
                          ${c.nombre}
                        </a>
                      </td>
                      <td class="py-3 px-3 sm:px-4 align-top text-right text-slate-600 dark:text-slate-400 w-[40%] break-words">
                        ${c.campus}
                      </td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `
      : `<p class="text-gray-600 dark:text-gray-400 text-sm">No hay carreras disponibles para este perfil.</p>`;

    html += `
    <div id="accordion-card-${index}" class="mb-2">
      <h2 id="accordion-card-heading-${index}">
        <button type="button" class="flex items-center justify-between w-full p-3 sm:p-4 font-medium rtl:text-right text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 gap-2 sm:gap-3 transition-all duration-300" data-accordion-target="#accordion-card-body-${index}" aria-expanded="false" aria-controls="accordion-card-body-${index}">
          <span class="text-sm sm:text-base md:text-lg font-semibold">${perfil}</span>
          <svg data-accordion-icon class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/></svg>
        </button>
      </h2>
      <div id="accordion-card-body-${index}" class="hidden overflow-hidden transition-all duration-300 ease-in-out max-h-0" aria-labelledby="accordion-card-heading-${index}">
        <div class="p-3 sm:p-4 space-y-3">
          <p class="mb-1 text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm">Carreras recomendadas:</p>
          ${tablaCarreras}
        </div>
      </div>
    </div>`;
  });

  //* Agregar evento para togglear acordeones con animación
  setTimeout(() => {
    document.querySelectorAll("[data-accordion-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.querySelector(
          button.getAttribute("data-accordion-target"),
        );
        const isExpanded = button.getAttribute("aria-expanded") === "true";

        // Alterna aria-expanded
        button.setAttribute("aria-expanded", !isExpanded);

        // Animar el contenido del acordeón
        if (!isExpanded) {
          // Abrir - animar max-height
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

  contenedorTexto.innerHTML = html;
  contenedor.appendChild(contenedorTexto);

  //* Contenedor de botones
  const contenedorBotones = document.createElement("div");
  contenedorBotones.className = "flex flex-col sm:flex-row justify-center gap-3 sm:gap-2 md:gap-4 mt-4 sm:mt-6 w-full";

  const botonDescargar = document.createElement("button");
  botonDescargar.innerHTML = `
  <svg class="w-3 h-3 sm:w-4 sm:h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/>
  </svg>
  <span class="text-xs sm:text-sm">Descargar PDF</span>
`;
  botonDescargar.className =
    "inline-flex items-center justify-center bg-blue-800 dark:bg-blue-400 text-white dark:text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-blue-900 dark:hover:bg-blue-300 transition w-full sm:w-auto";
  botonDescargar.onclick = () => descargarPDF(resultados, respuestas);
  contenedorBotones.appendChild(botonDescargar);

  const botonGuardar = document.createElement("button");
  botonGuardar.innerHTML = `
  <svg class="w-3 h-3 sm:w-4 sm:h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 237.3C544 220.3 537.3 204 525.3 192L448 114.7C436 102.7 419.7 96 402.7 96L160 96zM192 192C192 174.3 206.3 160 224 160L384 160C401.7 160 416 174.3 416 192L416 256C416 273.7 401.7 288 384 288L224 288C206.3 288 192 273.7 192 256L192 192zM320 352C355.3 352 384 380.7 384 416C384 451.3 355.3 480 320 480C284.7 480 256 451.3 256 416C256 380.7 284.7 352 320 352z"/>
  </svg>
  <span class="text-xs sm:text-sm">Guardar resultado</span>
`;
  botonGuardar.className =
    "inline-flex items-center justify-center bg-green-800 dark:bg-green-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-green-900 dark:hover:bg-green-600 transition w-full sm:w-auto";
  botonGuardar.onclick = () => guardarResultado(resultados);
  contenedorBotones.appendChild(botonGuardar);

  const botonReiniciar = document.createElement("button");
  botonReiniciar.innerHTML = `
    <svg class="w-3 h-3 sm:w-4 sm:h-4 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor">
    <path d="M320 128C263.2 128 212.1 152.7 176.9 192L224 192C241.7 192 256 206.3 256 224C256 241.7 241.7 256 224 256L96 256C78.3 256 64 241.7 64 224L64 96C64 78.3 78.3 64 96 64C113.7 64 128 78.3 128 96L128 150.7C174.9 97.6 243.5 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C233 576 156.1 532.6 109.9 466.3C99.8 451.8 103.3 431.9 117.8 421.7C132.3 411.5 152.2 415.1 162.4 429.6C197.2 479.4 254.8 511.9 320 511.9C426 511.9 512 425.9 512 319.9C512 213.9 426 128 320 128z"/>
  </svg>
  <span class="text-xs sm:text-sm">Reiniciar</span>`;
  botonReiniciar.className =
    "inline-flex items-center justify-center bg-gray-800 dark:bg-gray-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full hover:bg-gray-900 dark:hover:bg-gray-700 transition w-full sm:w-auto";
  botonReiniciar.onclick = () => location.reload();
  contenedorBotones.appendChild(botonReiniciar);

  contenedor.appendChild(contenedorBotones);

  resultadosDiv.appendChild(contenedor);
}

//! Descargar el resultado en PDF
function descargarPDF(puntajes, respuestas) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  //* Colores base
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

  //* Encabezado del PDF
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

  //* Sección de gráfico radar
  doc.setTextColor(...textColor);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Perfil RIASEC", margin, yPos);

  //* Obtener el canvas del gráfico y convertirlo a imagen

  const canvasGrafico = document.getElementById("chart");

  if (canvasGrafico && graficoPerfil) {
    const opcionesOriginales = JSON.parse(JSON.stringify(graficoPerfil.options));
    const datosOriginales = JSON.parse(
      JSON.stringify(graficoPerfil.data.datasets),
    );

    aplicarModoClaroGrafico();

    const chartImg = canvasGrafico.toDataURL("image/png", 1.0);

    graficoPerfil.options = opcionesOriginales;
    graficoPerfil.data.datasets = datosOriginales;
    graficoPerfil.update("none");

    const imgSize = 80;
    const imgX = (pageWidth - imgSize) / 2;
    doc.addImage(chartImg, "PNG", imgX, yPos, imgSize, imgSize);

    yPos += imgSize + 5;
  }

  //* Tabla de resultados
  checkNewPage(60);
  drawLine(yPos);
  yPos += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Puntuaciones por Área", margin, yPos);
  yPos += 5;

  // Ordenar resultados de mayor a menor
  const puntajesOrdenados = Object.entries(puntajes).sort((a, b) => b[1] - a[1]);

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
  puntajesOrdenados.forEach(([area, puntaje], index) => {
    // Alternar colores de fondo
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPos - 2, pageWidth - margin * 2, 8, "F");
    }

    doc.text(area, margin + 5, yPos + 4);
    doc.text(puntaje.toString(), pageWidth - margin - 20, yPos + 4);
    yPos += 8;
  });

  yPos += 5;

  //* Respuestas de cada pregunta

  // Escala de resultados
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

  //* Top 3 perfiles
  checkNewPage(80);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Top 3 Perfiles Recomendados", margin, yPos);
  yPos += 5;

  puntajesOrdenados.slice(0, 3).forEach(([perfil, puntaje], index) => {
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
    doc.text(`(${puntaje} pts)`, xBase + perfilWidth + 3, yBase - 0.5);

    yPos += 8;

    // Descripción del perfil
    const descripcion = perfilesRiasc[perfil] || "Descripción no disponible";
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

    // Subtítulo de carreras recomendadas
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Carreras recomendadas:", xBase, yPos + 3);
    yPos += 6;

    // Tabla de carreras recomendadas
    const perfilClave = perfil.toLowerCase();
    const carrerasPerfil = carrerasPorPerfil[perfilClave] || [];
    const posTabla = margin + 8;
    const anchuraTabla = pageWidth - margin * 2 - 16;
    const alturaFila = 8;
    const anchoColIzquierda = Math.round(anchuraTabla * 0.6);
    const anchoColDerecha = anchuraTabla - anchoColIzquierda;

    if (carrerasPerfil.length > 0) {
      checkNewPage(alturaFila * (carrerasPerfil.length + 1) + 10);

      // Encabezado de tabla
      doc.setFillColor(...lightGray);
      doc.rect(posTabla, yPos, anchuraTabla, alturaFila, "F");
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...textColor);
      doc.text("Carrera", posTabla + 2, yPos + 5);
      doc.text("Campus", posTabla + anchuraTabla - 2, yPos + 5, { align: "right" });
      yPos += alturaFila;
      doc.setFont("helvetica", "normal");

      carrerasPerfil.forEach((carrera, rowIndex) => {
        const nombre = carrera?.nombre || carrera || "";
        const campus = carrera?.campus || "";

        const maxAnchoNombre = anchoColIzquierda - 4;
        const lineasNombre = doc.splitTextToSize(nombre, maxAnchoNombre);
        const cantidadLineas = Math.max(1, lineasNombre.length);
        const alturaLinea = 5;
        const alturaNecesaria = Math.max(alturaFila, cantidadLineas * alturaLinea + 2 * 2);

        checkNewPage(alturaNecesaria + 4);
        if (rowIndex % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(posTabla, yPos, anchuraTabla, alturaNecesaria, "F");
        }

        doc.setTextColor(...textColor);
        lineasNombre.forEach((linea, iLinea) => {
          const yLinea = yPos + 4 + iLinea * alturaLinea;
          doc.text(linea, posTabla + 2, yLinea);
        });

        const yCampus = yPos + Math.round(alturaNecesaria / 2) + 1;
        doc.text(campus, posTabla + anchuraTabla - 2, yCampus, { align: "right" });

        yPos += alturaNecesaria;
      });
    } else {
      checkNewPage(10);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      doc.text("No hay carreras disponibles para este perfil.", posTabla, yPos + 3);
      yPos += alturaFila;
    }

    yPos += 5;

    // Salto de página para mostrar cada perfil en una página separada
    if (index < 2) {
      doc.addPage();
      yPos = margin;
    }
  });

  //! Pie de página del PDF
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

  //! Guardar el PDF
  doc.save("resultado-vocacional.pdf");
}

//! Guardar resultado en localStorage
function guardarResultado(puntajes) {
  localStorage.setItem("resultadoVocacional", JSON.stringify(puntajes));
  alert("Resultado guardado");
}

mostrarInstrucciones();
