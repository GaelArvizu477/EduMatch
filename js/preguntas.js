// Este arreglo se usa para testear
const preguntas = [
  // REALISTA
  {
    texto: "¿Te gustaría diseñar los planos de una casa o estructura?",
    area: "realista",
  },
  {
    texto:
      "¿Te interesa el funcionamiento de circuitos electrónicos o motores?",
    area: "realista",
  },
];
//

/* Arreglo de preguntas
const preguntas = [
  // REALISTA
  { texto: "¿Te gustaría diseñar los planos de una casa o estructura?", area: "realista" },
  { texto: "¿Te interesa el funcionamiento de circuitos electrónicos o motores?", area: "realista" },
  { texto: "¿Te gusta el trabajo físico o al aire libre (como la agricultura o construcción)?", area: "realista" },
  { texto: "¿Tienes facilidad para armar y desarmar objetos mecánicos?", area: "realista" },
  { texto: "¿Posees destreza manual para usar herramientas de precisión?", area: "realista" },
  { texto: "¿Te orientas con facilidad en mapas, planos y espacios tridimensionales?", area: "realista" },

  // INVESTIGADOR
  { texto: "¿Te genera curiosidad saber cómo funcionan los virus o las células?", area: "investigador" },
  { texto: "¿Te gustaría pasar tiempo en un laboratorio realizando experimentos químicos?", area: "investigador" },
  { texto: "¿Te apasiona investigar el origen de problemas sociales o históricos?", area: "investigador" },
  { texto: "¿Comprendes con rapidez conceptos matemáticos o lógicos complejos?", area: "investigador" },
  { texto: "¿Tienes capacidad para concentrarte largas horas en la lectura científica?", area: "investigador" },
  { texto: "¿Puedes analizar datos estadísticos y sacar conclusiones lógicas de ellos?", area: "investigador" },

  // ARTÍSTICO
  { texto: "¿Disfrutarías escribir artículos de opinión o cuentos literarios?", area: "artistico" },
  { texto: "¿Te atrae la idea de restaurar obras de arte o diseñar vestuarios?", area: "artistico" },
  { texto: "¿Te gustaría tocar un instrumento musical o componer música profesionalmente?", area: "artistico" },
  { texto: "¿Consideras que tienes talento para el dibujo, la pintura o el diseño visual?", area: "artistico" },
  { texto: "¿Puedes usar la creatividad para resolver problemas de manera poco convencional?", area: "artistico" },
  { texto: "¿Tienes facilidad para aprender idiomas o expresarte correctamente de forma escrita?", area: "artistico" },

  // SOCIAL
  { texto: "¿Te sientes cómodo explicando temas complejos a personas que no los entienden?", area: "social" },
  { texto: "¿Sentirías satisfacción trabajando en programas de ayuda comunitaria?", area: "social" },
  { texto: "¿Te interesa aprender sobre primeros auxilios y el cuidado de la salud?", area: "social" },
  { texto: "¿Tienes facilidad de palabra y buen trato con las personas?", area: "social" },
  { texto: "¿Sabes escuchar a los demás y mostrar empatía ante sus problemas?", area: "social" },
  { texto: "¿Te consideras capaz de mantener la calma en situaciones de emergencia médica?", area: "social" },

  // EMPRENDEDOR
  { texto: "¿Te gustaría ser el responsable de dirigir un equipo para alcanzar una meta de ventas?", area: "emprendedor" },
  { texto: "¿Te gustaría convencer a otros sobre la validez de tus ideas o proyectos?", area: "emprendedor" },
  { texto: "¿Te motiva la idea de crear y gestionar tu propia empresa?", area: "emprendedor" },
  { texto: "¿Te resulta fácil delegar tareas y organizar el trabajo de otros?", area: "emprendedor" },
  { texto: "¿Tienes facilidad para la negociación y el manejo de conflictos?", area: "emprendedor" },
  { texto: "¿Tienes capacidad de liderazgo y te sientes cómodo tomando decisiones bajo presión?", area: "emprendedor" },

  // CONVENCIONAL
  { texto: "¿Te agrada llevar un control detallado y ordenado de gastos y facturas?", area: "convencional" },
  { texto: "¿Prefieres trabajar en una oficina con tareas y horarios claramente definidos?", area: "convencional" },
  { texto: "¿Te gusta organizar archivos, documentos y bases de datos?", area: "convencional" },
  { texto: "¿Eres una persona extremadamente minuciosa y detallista con la información?", area: "convencional" },
  { texto: "¿Eres hábil para clasificar y catalogar objetos de forma sistemática?", area: "convencional" },
  { texto: "¿Te sientes cómodo siguiendo procedimientos paso a paso sin desviarte?", area: "convencional" }
];
*/

const RIASEC = {
  Realista:
    "Prefieres actividades prácticas y concretas. Te sientes cómodo trabajando con herramientas, máquinas, tecnología o en entornos físicos donde puedes ver resultados tangibles.",

  Investigador:
    "Te gusta analizar, investigar y resolver problemas complejos. Disfrutas aprender cómo funcionan las cosas, trabajar con datos, ciencia y pensamiento lógico.",

  Artistico:
    "Eres creativo y expresivo. Te atraen actividades relacionadas con el arte, el diseño, la música o cualquier forma de expresión original.",

  Social:
    "Te interesa ayudar a los demás y trabajar con personas. Disfrutas enseñar, cuidar, apoyar o colaborar en entornos humanos.",

  Emprendedor:
    "Te gusta liderar, tomar decisiones y generar ideas de negocio. Te atraen las ventas, la gestión, la negociación y los retos competitivos.",

  Convencional:
    "Prefieres el orden, la organización y trabajar con datos o sistemas. Te sientes cómodo siguiendo procesos, administrando información y manteniendo estructuras claras.",
};

const careers = {
  Realista: [
    "Ingeniero agronomo",
    "Licenciatura en urbanistica y medio ambiente",
    "Licenciatura en agronegocios",
    "Licenciatura en ciencia de los alimentos",
    "Licenciatura en medicina veterinaria y zootecnia",
    "Ingenieria civil",
    "Ingenieria en logistica y transporte",
    "Ingenieria en topografia geomatica",
    "Ingenieria industrial",
    "Ingenieria mecanica electrica",
    "Ingenieria robotica",
    "Licenciatura en ingenieria en alimentos y biotecnologia",
    "Licenciatura en ingenieria en ciencia de materiales",
    "Licenciatura en ingenieria en electromovilidad y autotronica",
    "Licenciatura en ingenieria en electronica y sistemas inteligentes",
    "Licenciatura en ingenieria en mecatronica inteligente",
    "Ingenieria en biotecnologia",
    "Ingenieria mecatronica dual",
    "Ingenieria agroindustrial",
    "Ingenieria en sistemas pecuarios",
    "Tecnico superior universitario en electronica y mecanica automotriz",
    "Tecnico superior universitario en produccion y sanidad avicola",
  ],

  Investigador: [
    "Licenciatura en biologia",
    "Licenciatura en ciencias biomedicas",
    "Licenciatura en bioquimica clinica y medicina de laboratorio",
    "Licenciatura en ciencias forenses",
    "Licenciatura en fisica",
    "Licenciatura en matematicas",
    "Licenciatura en quimica",
    "Licenciatura en quimico farmaceutico biologo",
    "Licenciatura en inteligencia artificial y ciencia de los datos",
    "Licenciatura en ciberseguridad",
    "Ingenieria fotonica",
    "Ingenieria biomedica",
    "Ingenieria quimica",
    "Ingenieria en nanotecnologia",
    "Ingenieria en geofisica",
    "Ingenieria en sistemas biologicos",
    "Ingenieria en diseño molecular de materiales",
    "Ingenieria en ciencias computacionales",
    "Ingenieria en energia",
  ],

  Artistico: [
    "Licenciatura en arquitectura",
    "Licenciatura en diseño de interiores y ambientacion",
    "Licenciatura en diseño de modas",
    "Licenciatura en diseño industrial",
    "Licenciatura en diseño para la comunicacion grafica",
    "Licenciatura en diseño, arte y tecnologias interactivas",
    "Licenciatura en musica con orientacion en canto",
    "Licenciatura en musica con orientacion en composicion",
    "Licenciatura en musica con orientacion en direccion coral",
    "Licenciatura en musica con orientacion en ejecutante",
    "Licenciatura en musica con orientacion en pedagogia musical",
    "Programa basico musical",
    "Tecnico en musica",
    "Licenciatura en artes escenicas para la expresion dancistica",
    "Licenciatura en artes escenicas para la expresion teatral",
    "Licenciatura en artes visuales para la expresion fotografica",
    "Licenciatura en artes visuales para la expresion plastica",
    "Licenciatura en escritura creativa",
    "Licenciatura en historia del arte",
    "Licenciatura en diseño de artesania",
    "Licenciatura en creatividad digital",
    "Ingenieria en animacion y tecnologias creativas",
    "Ingenieria en videojuegos",
    "Licenciatura en artes ( escolarizada )",
  ],

  Social: [
    "Licenciatura en cirujano dentista",
    "Licenciatura en atencion prehospitalaria y gestion de riesgos",
    "Licenciatura en cultura fisica y deportes",
    "Licenciatura en enfermeria",
    "Licenciatura en enfermeria (nivelacion)",
    "Licenciatura en nutricion",
    "Licenciatura en podologia",
    "Licenciatura en psicologia",
    "Licenciatura en radiologia e imagen",
    "Licenciatura en terapia fisica",
    "Licenciatura en terapia fisica (nivelacion)",
    "Licenciatura en terapia respiratoria",
    "Medico cirujano y partero",
    "Tecnico superior universitario en emergencias seguridad laboral y rescates (nivelacion)",
    "Tecnico superior universitario en protesis dental",
    "Licenciatura en gerontologia",
    "Licenciatura en salud publica",
    "Licenciatura en psicologia de la salud comunitaria",
  ],

  Emprendedor: [
    "Ingenieria en negocios",
    "Licenciatura en administracion",
    "Licenciatura en administracion financiera y sistemas",
    "Licenciatura en administracion gubernamental y politicas publicas",
    "Licenciatura en auditoria y contabilidad gubernamental",
    "Licenciatura en contaduria publica",
    "Licenciatura en economia",
    "Licenciatura en gestion de negocios gastronomicos",
    "Licenciatura en gestion y economia ambiental",
    "Licenciatura en mercadotecnia",
    "Licenciatura en negocios internacionales",
    "Licenciatura en recursos humanos",
    "Licenciatura en relaciones publicas y comunicacion",
    "Licenciatura en turismo",
    "Licenciatura en mercadotecnia digital",
    "Licenciatura en inteligencia financiera y de negocios",
    "Licenciatura en administracion de las organizaciones",
    "Licenciatura en gestion cultural",
    "Licenciatura en negocios sostenibles",
    "Licenciatura en desarrollo turistico",
    "Licenciatura en desarrollo turistico sustentable",
    "Licenciatura en administracion de negocios",
  ],

  Convencional: [
    "Licenciatura en tecnologias de la informacion",
    "Tecnico superior universitario en tecnologias de la informacion",
    "Tecnico superior universitario en sistemas informaticos",
    "Licenciatura en desarrollo de sistemas web",
    "Licenciatura en tecnologias e informacion",
    "Ingenieria en computacion",
    "Ingenieria informatica",
    "Licenciatura en periodismo digital",
    "Licenciatura en bibliotecologia y gestion del conocimiento",
    "Licenciatura en desarrollo educativo",
    "Licenciatura en seguridad ciudadana",
    "Abogado",
    "Abogado (semiescolarizado)",
    "Licenciatura en antropologia",
    "Licenciatura en criminologia",
    "Licenciatura en didactica del frances como lengua extranjera",
    "Licenciatura en docencia del ingles como lengua extranjera",
    "Licenciatura en estudios politicos y gobierno",
    "Licenciatura en filosofia",
    "Licenciatura en geografia",
    "Licenciatura en historia",
    "Licenciatura en letras hispanicas",
    "Licenciatura en relaciones internacionales",
    "Licenciatura en sociologia",
    "Licenciatura en trabajo social",
    "Licenciatura en trabajo social (nivelacion)",
    "Licenciatura en periodismo",
    "Licenciatura en educacion",
    "Licenciatura en educacion indigena",
    "Licenciatura en humanidades",
    "Licenciatura en lenguas y culturas extranjeras",
    "Licenciatura en estudios liberales",
  ],
};
