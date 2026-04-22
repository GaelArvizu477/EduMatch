const contenedor = document.getElementById("cuestionario");

let respuestas = [];

// Indice de pregunta actual
let PreguntaActual = 0;

//* Mostrar Pregunta
function mostrarPregunta() {
  contenedor.innerHTML = "";

  const p = preguntas[PreguntaActual]; // contador de pregunta actual

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
    Math.round(((PreguntaActual) / preguntas.length) * 100) + "%";

  // Barra de progreso
  const barraContenedor = document.createElement("div");
  barraContenedor.className = "w-full bg-gray-200 rounded-full h-2 mb-4";

  const barra = document.createElement("div");
  barra.className =
    "bg-blue-500 h-2 rounded-full transition-all duration-500 ease-in-out";

  const porcentaje = ((PreguntaActual + 1) / preguntas.length) * 100;
  barra.style.width = porcentaje + "%";

  // Indice de pregunta
  const progreso = document.createElement("p");
  progreso.innerText = `Pregunta ${PreguntaActual + 1} de ${preguntas.length}`;
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
  input1.className = "mr-1 w-4 h-4";
  input1.type = "radio";
  input1.name = "pregunta" + PreguntaActual;
  input1.value = "-2";

  bloque.appendChild(div1);
  label1.appendChild(input1);
  label1.appendChild(document.createTextNode(" Totalmente en desacuerdo"));
  div1.appendChild(label1);

  if (respuestas[PreguntaActual] == -2) {
    input1.checked = true;
  }

  // En desacuerdo (-1)
  const div2 = document.createElement("div");
  div2.className = "flex items-center mb-4";
  const label2 = document.createElement("label");
  const input2 = document.createElement("input");
  input2.className = "mr-1 w-4 h-4";
  input2.type = "radio";
  input2.name = "pregunta" + PreguntaActual;
  input2.value = "-1";

  bloque.appendChild(div2);
  label2.appendChild(input2);
  label2.appendChild(document.createTextNode(" En desacuerdo"));
  div2.appendChild(label2);

  if (respuestas[PreguntaActual] == -1) {
    input2.checked = true;
  }

  // de acuerdo (1)
  const div4 = document.createElement("div");
  div4.className = "flex items-center mb-4";
  const label4 = document.createElement("label");
  const input4 = document.createElement("input");
  input4.className = "mr-1 w-4 h-4";
  input4.type = "radio";
  input4.name = "pregunta" + PreguntaActual;
  input4.value = "1";

  bloque.appendChild(div4);
  label4.appendChild(input4);
  label4.appendChild(document.createTextNode(" De acuerdo"));
  div4.appendChild(label4);

  if (respuestas[PreguntaActual] == 1) {
    input4.checked = true;
  }

  // Totalmente de acuerdo (2)
  const div5 = document.createElement("div");
  div5.className = "flex items-center mb-4";
  const label5 = document.createElement("label");
  const input5 = document.createElement("input");
  input5.className = "mr-1 w-4 h-4";
  input5.type = "radio";
  input5.name = "pregunta" + PreguntaActual;
  input5.value = "2";

  bloque.appendChild(div5);
  label5.appendChild(input5);
  label5.appendChild(document.createTextNode(" Totalmente de acuerdo"));
  div5.appendChild(label5);

  if (respuestas[PreguntaActual] == 2) {
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
      'input[name="pregunta' + PreguntaActual + '"]:checked',
    );

    if (respuesta) {
      respuestas[PreguntaActual] = parseInt(respuesta.value);
      console.log(respuestas);
    }

    PreguntaActual--;
    mostrarPregunta();
  };

  BotonContenedor.appendChild(atras);
  if (PreguntaActual == 0) {
    atras.style.visibility = "hidden";
    atras.disabled = true;
  }

  // Siguiente
  const siguiente = document.createElement("button");
  siguiente.type = "button";
  siguiente.className =
    "text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 shadow-md transition-all duration-200";
  siguiente.innerText = "Siguiente";
  if (PreguntaActual == preguntas.length - 1) {
    siguiente.innerText = "Finalizar";
  }

  siguiente.onclick = () => {
    const respuesta = document.querySelector(
      'input[name="pregunta' + PreguntaActual + '"]:checked',
    );

    // Comprobar que hay una respuesta
    if (!respuesta) {
      alert("Debes seleccionar una opcion antes de poder avanzar");
      return;
    }

    respuestas[PreguntaActual] = parseInt(respuesta.value);
    console.log(respuestas);

    PreguntaActual++;

    // Validar limite
    if (PreguntaActual >= preguntas.length) {
      mostrarResultados();
      console.log("Cuestionario terminado");
      return;
    }

    mostrarPregunta();
  };

  BotonContenedor.appendChild(siguiente);
}

function mostrarResultados() {
  contenedor.innerHTML = "<h2>Cuestionario terminado</h2>";
  console.log(respuestas);
}

mostrarPregunta();
