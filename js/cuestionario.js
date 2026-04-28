const contenedor = document.getElementById("cuestionario");

let respuestas = [];

// Indice de pregunta actual
let preguntaActual = 0;

//* Mostrar Pregunta
function mostrarPregunta() {
  contenedor.innerHTML = "";

  const p = preguntas[preguntaActual]; // contador de pregunta actual

  const bloque = document.createElement("div");
  bloque.id = "bloque";
  bloque.className =
    "w-full max-w-xl min-h-[436px] mx-auto mt-6 flex flex-col bg-white p-6 border border-gray-300 rounded-2xl shadow-2xl text-center";
  contenedor.appendChild(bloque);

  //* Progreso del cuestionario
  // Texto
  const barraTexto = document.createElement("div");
  barraTexto.className = "flex justify-between mb-1";

  const ProgresoTexto = document.createElement("span");
  ProgresoTexto.className = "text-sm font-medium text-body text-gray-500";
  ProgresoTexto.innerText = "Progreso";

  const porcentajeTexto = document.createElement("span");
  porcentajeTexto.className = "text-sm font-medium text-body text-gray-500";
  porcentajeTexto.innerText =
    Math.round((preguntaActual / preguntas.length) * 100) + "%";

  // Barra de progreso
  const barraContenedor = document.createElement("div");
  barraContenedor.className = "w-full bg-gray-200 rounded-full h-2 mb-4";

  const barra = document.createElement("div");
  barra.className =
    "bg-blue-800 h-2 rounded-full transition-all duration-500 ease-in-out";

  const porcentaje = ((preguntaActual + 1) / preguntas.length) * 100;
  barra.style.width = porcentaje + "%";

  // Indice de pregunta
  const progreso = document.createElement("p");
  progreso.innerText = `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;
  progreso.className = "text-gray-500 mb-2";

  bloque.appendChild(barraTexto);
  barraTexto.appendChild(ProgresoTexto);
  barraTexto.appendChild(porcentajeTexto);

  bloque.appendChild(barraContenedor);
  barraContenedor.appendChild(barra);

  bloque.appendChild(progreso);

  // Texto pregunta
  const texto = document.createElement("h5");
  texto.innerText = p.texto;
  texto.className = "mb-6 text-base text-body sm:text-lg";
  bloque.appendChild(texto);

  //*    OPCIONES
  // Totalmente en desacuerdo (-2)
  const div1 = document.createElement("div");
  div1.className = "flex items-center mb-4";
  const label1 = document.createElement("label");
  const input1 = document.createElement("input");
  input1.className = "accent-blue-800 mr-1 w-4 h-4";
  input1.type = "radio";
  input1.name = "pregunta" + preguntaActual;
  input1.value = "-2";

  bloque.appendChild(div1);
  label1.appendChild(input1);
  label1.appendChild(document.createTextNode(" Totalmente en desacuerdo"));
  div1.appendChild(label1);

  if (respuestas[preguntaActual] == -2) {
    input1.checked = true;
  }

  // En desacuerdo (-1)
  const div2 = document.createElement("div");
  div2.className = "flex items-center mb-4";
  const label2 = document.createElement("label");
  const input2 = document.createElement("input");
  input2.className = "accent-blue-800 mr-1 w-4 h-4";
  input2.type = "radio";
  input2.name = "pregunta" + preguntaActual;
  input2.value = "-1";

  bloque.appendChild(div2);
  label2.appendChild(input2);
  label2.appendChild(document.createTextNode(" En desacuerdo"));
  div2.appendChild(label2);

  if (respuestas[preguntaActual] == -1) {
    input2.checked = true;
  }

  // Neutral (0)
  const div3 = document.createElement("div");
  div3.className = "flex items-center mb-4";
  const label3 = document.createElement("label");
  const input3 = document.createElement("input");

  input3.className = "accent-blue-800 mr-1 w-4 h-4";
  input3.type = "radio";
  input3.name = "pregunta" + preguntaActual;
  input3.value = "0";

  bloque.appendChild(div3);
  label3.appendChild(input3);
  label3.appendChild(document.createTextNode(" Neutral"));
  div3.appendChild(label3);

  if (respuestas[preguntaActual] == 0) {
    input3.checked = true;
  }

  // de acuerdo (1)
  const div4 = document.createElement("div");
  div4.className = "flex items-center mb-4";
  const label4 = document.createElement("label");
  const input4 = document.createElement("input");
  input4.className = "accent-blue-800 mr-1 w-4 h-4";
  input4.type = "radio";
  input4.name = "pregunta" + preguntaActual;
  input4.value = "1";

  bloque.appendChild(div4);
  label4.appendChild(input4);
  label4.appendChild(document.createTextNode(" De acuerdo"));
  div4.appendChild(label4);

  if (respuestas[preguntaActual] == 1) {
    input4.checked = true;
  }

  // Totalmente de acuerdo (2)
  const div5 = document.createElement("div");
  div5.className = "flex items-center mb-4";
  const label5 = document.createElement("label");
  const input5 = document.createElement("input");
  input5.className = "accent-blue-800 mr-1 w-4 h-4";
  input5.type = "radio";
  input5.name = "pregunta" + preguntaActual;
  input5.value = "2";

  bloque.appendChild(div5);
  label5.appendChild(input5);
  label5.appendChild(document.createTextNode(" Totalmente de acuerdo"));
  div5.appendChild(label5);

  if (respuestas[preguntaActual] == 2) {
    input5.checked = true;
  }

  //*    BOTONES
  const BotonContenedor = document.createElement("div");
  BotonContenedor.className = "flex justify-between mt-auto";
  bloque.appendChild(BotonContenedor);

  // Atras
  const atras = document.createElement("button");
  atras.type = "button";
  atras.className =
    "text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-200 font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none transition";
  atras.innerText = "atras";

  atras.onclick = () => {
    const respuesta = document.querySelector(
      'input[name="pregunta' + preguntaActual + '"]:checked',
    );

    if (respuesta) {
      respuestas[preguntaActual] = parseInt(respuesta.value);
      console.log(respuestas);
    }

    preguntaActual--;
    mostrarPregunta();
  };

  BotonContenedor.appendChild(atras);
  if (preguntaActual == 0) {
    atras.style.visibility = "hidden";
    atras.disabled = true;
  }

  // Siguiente
  const siguiente = document.createElement("button");
  siguiente.type = "button";
  siguiente.className =
    "text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 shadow-md transition-all duration-200";
  siguiente.innerText = "Siguiente";
  if (preguntaActual == preguntas.length - 1) {
    siguiente.innerText = "Finalizar";
  }

  siguiente.onclick = () => {
    const respuesta = document.querySelector(
      'input[name="pregunta' + preguntaActual + '"]:checked',
    );

    // Comprobar que hay una respuesta
    if (!respuesta) {
      alert("Debes seleccionar una opcion antes de poder avanzar");
      return;
    }

    respuestas[preguntaActual] = parseInt(respuesta.value);

    // Validar limite
    if (preguntaActual === preguntas.length - 1) {
      console.log("FINALIZADO");
      mostrarResultados();
      return;
    }
    preguntaActual++;

    mostrarPregunta();
  };

  BotonContenedor.appendChild(siguiente);
}

function mostrarResultados() {
  const resultados = calcularResultados();
  const ramas = obtenerRamas(resultados);
  console.log("Ramas:", ramas);
  mostrarRamas(ramas);
}

//* Calcular resultados
function calcularResultados() {
  const resultados = {
    realista: 0,
    investigador: 0,
    artistico: 0,
    social: 0,
    emprendedor: 0,
    convencional: 0,
  };

  respuestas.forEach((valor, index) => {
    const pregunta = preguntas[index];
    resultados[pregunta.area] += valor;
  });

  return resultados;
}

//* Obtener Ramas de carreras
function obtenerRamas(resultados) {
  const top3 = Object.entries(resultados)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((r) => r[0]);

  console.log("Top 3 RIASEC:", top3);

  const conteo = {};

  top3.forEach((tipo) => {
    riasecRamas[tipo].forEach((rama) => {
      conteo[rama] = (conteo[rama] || 0) + 1;
    });
  });

  console.log("Conteo de ramas:", conteo);

  const ramasOrdenadas = Object.entries(conteo)
    .sort((a, b) => b[1] - a[1])
    .map((r) => r[0]);

  const ramasFinales = ramasOrdenadas.slice(0, 3);

  return ramasFinales;
}

//* Mostrar resultados en pantalla
function mostrarRamas(ramas) {
  const carrerasPorRama = {
    ingenieria: [
      "Ingeniería en Sistemas",
      "Ingeniería Civil",
      "Ingeniería Mecánica",
    ],
    tecnologia: [
      "Desarrollo de Software",
      "Ciberseguridad",
      "Ciencia de Datos",
    ],
    ciencias: ["Física", "Química", "Biología"],
  };

  console.log("Entrando a mostrarRamas:", ramas);

  // Limpiar cuestionario
  const preguntas = document.getElementById("cuestionario");
  preguntas.innerHTML = "";

  // Contenedor de resultados
  const resultados = document.getElementById("resultados");
  resultados.innerHTML = ""; // 🔥 IMPORTANTE

  // Tarjeta principal
  const contenedor = document.createElement("div");
  contenedor.className =
    "w-full max-w-4xl min-h-[436px] mx-auto mt-6 flex flex-col bg-white p-6 border border-gray-300 rounded-2xl shadow-2xl text-center";

  // Carrusel
  const carousel = document.createElement("div");
  carousel.className = "relative w-full overflow-hidden";

  // Interior
  const interior = document.createElement("div");
  interior.className = "relative h-80";

  // Índice actual
  let index = 0;

  // Crear items
  const items = ramas.map((rama, i) => {
    const item = document.createElement("div");

    item.className =
      "absolute inset-0 flex items-center justify-center transition-opacity duration-500";

    if (i !== 0) item.classList.add("opacity-0");

    item.innerHTML = `
      <div class="w-full h-full bg-gray-100 rounded-lg p-4 flex flex-col justify-center">
        
        <button class="accordion-btn w-full text-center">
          <h2 class="text-2xl font-bold">${rama}</h2>
        </button>

        <div class="accordion-content mt-3 hidden">
          <ul class="text-gray-600 text-sm space-y-1">
            ${(carrerasPorRama[rama] || [])
              .map((c) => `<li>• ${c}</li>`)
              .join("")}
          </ul>
        </div>

      </div>
    `;

    // acordeón
    const btn = item.querySelector(".accordion-btn");
    const content = item.querySelector(".accordion-content");

    btn.onclick = () => {
      content.classList.toggle("hidden");
    };

    interior.appendChild(item);
    return item;
  });

  // Mostrar item
  function mostrar(i) {
    items.forEach((item, idx) => {
      items.forEach((item, idx) => {
    item.classList.toggle("opacity-0", idx !== i);

    item.style.pointerEvents = idx === i ? "auto" : "none";
  });
    });
  }

  // Botón anterior
  const prev = document.createElement("button");
  prev.innerText = "←";
  prev.className =
    "absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white px-3 py-1 rounded-full shadow";

  prev.onclick = () => {
    index = (index - 1 + items.length) % items.length;
    mostrar(index);
  };

  // Botón siguiente
  const next = document.createElement("button");
  next.innerText = "→";
  next.className =
    "absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white px-3 py-1 rounded-full shadow";

  next.onclick = () => {
    index = (index + 1) % items.length;
    mostrar(index);
  };

  // Montaje
  carousel.appendChild(interior);
  carousel.appendChild(prev);
  carousel.appendChild(next);

  contenedor.appendChild(carousel);
  resultados.appendChild(contenedor);
}

mostrarPregunta();
