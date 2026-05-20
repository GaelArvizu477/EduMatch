/* Este arreglo se usa para testear
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
*/

//! Arreglo de preguntas
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


//! Descripciones de cada perfil
const perfilesRiasc = {
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

//! Arreglo de carreras por perfil
const carrerasPorPerfil = {
  realista: [
    { nombre: "INGENIERO AGRONOMO", campus: "CUCBA", enlace: "https://cucba.udg.mx/oferta-academica/licenciaturas/ingeniero-agronomo" },
    { nombre: "LICENCIATURA EN MEDICINA VETERINARIA Y ZOOTECNIA", campus: "CUCBA", enlace: "https://cucba.udg.mx/contenido/licenciatura-en-medicina-veterinaria-y-zootecnia-0" },
    { nombre: "INGENIERIA CIVIL", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/oferta-academica/licenciaturas/licenciatura-en-ingenieria-civil" },
    { nombre: "INGENIERIA EN LOGISTICA Y TRANSPORTE", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-en-logistica-y-transporte" },
    { nombre: "INGENIERIA EN TOPOGRAFIA GEOMATICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-en-topografia-geomatica" },
    { nombre: "INGENIERIA INDUSTRIAL", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-industrial" },
    { nombre: "INGENIERIA MECANICA ELECTRICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-mecanica-electrica" },
    { nombre: "INGENIERIA ROBOTICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-robotica" },
    { nombre: "LICENCIATURA EN INGENIERIA EN ALIMENTOS Y BIOTECNOLOGIA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-en-alimentos-y-biotecnologia " },
    { nombre: "LICENCIATURA EN INGENIERIA EN CIENCIA DE MATERIALES", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-en-ciencia-de-materiales" },
    { nombre: "LICENCIATURA EN INGENIERIA EN ELECTROMOVILIDAD Y AUTOTRONICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-en-electromovilidad-y-autotronica" },
    { nombre: "LICENCIATURA EN INGENIERIA EN ELECTRONICA Y SISTEMAS INTELIGENTES", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-en-electronica-y-sistemas-inteligentes" },
    { nombre: "LICENCIATURA EN INGENIERIA EN MECATRONICA INTELIGENTE", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-en-mecatronica-inteligente" },
    { nombre: "INGENIERIA BIOMEDICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-biomedica" },
    { nombre: "INGENIERIA FOTONICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-fotonica" },
    { nombre: "INGENIERIA EN ENERGIA", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/ingenieria-energia" },
    { nombre: "INGENIERIA EN NANOTECNOLOGIA", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/ingenieria-nanotecnologia" },
  ],

  investigador: [
    { nombre: "LICENCIATURA EN BIOLOGIA", campus: "CUCBA", enlace: "https://cucba.udg.mx/oferta-academica/licenciaturas/licenciatura-en-biologia" },
    { nombre: "LICENCIATURA EN CIENCIA DE LOS ALIMENTOS", campus: "CUCBA", enlace: "https://cucba.udg.mx/oferta-academica/licenciaturas/licenciatura-en-ciencias-de-los-alimentos" },
    { nombre: "LICENCIATURA EN CIENCIAS BIOMEDICAS", campus: "CUCBA", enlace: "https://cucba.udg.mx/oferta_academica/licenciaturas/licenciatura-en-ciencias-biomedicas" },
    { nombre: "LICENCIATURA EN CIENCIAS BIOMEDICAS", campus: "CUCS", enlace: "https://www.cucs.udg.mx/lcb" },
    { nombre: "INGENIERIA EN COMPUTACION", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-en-computacion" },
    { nombre: "INGENIERIA INFORMATICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-ingenieria-informatica" },
    { nombre: "INGENIERIA QUIMICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/oferta-academica/licenciaturas/licenciatura-en-ingenieria-quimica" },
    { nombre: "LICENCIATURA EN FISICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-fisica" },
    { nombre: "LICENCIATURA EN MATEMATICAS", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-matematicas" },
    { nombre: "LICENCIATURA EN QUIMICA", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/oferta-academica/licenciaturas/licenciatura-quimica" },
    { nombre: "LICENCIATURA EN QUIMICO FARMACEUTICO BIOLOGO", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/es/oferta-academica/licenciaturas/licenciatura-en-quimico-farmaceutico-biologo" },
    { nombre: "LICENCIATURA EN BIOQUIMICA CLINICA Y MEDICINA DE LABORATORIO", campus: "CUCS", enlace: "https://www.cucs.udg.mx/lbcml" },
    { nombre: "LICENCIATURA EN CIENCIAS FORENSES", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/ciencias-forenses" },
    { nombre: "LICENCIATURA EN CIENCIAS FORENSES", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/ciencias-forenses" },
    { nombre: "LICENCIATURA EN CIBERSEGURIDAD", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/lcs" },
    { nombre: "LICENCIATURA EN INTELIGENCIA ARTIFICIAL Y CIENCIA DE LOS DATOS", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/licenciatura-en-inteligencia-artificial-y-ciencia-de-los-datos" },
    { nombre: "LICENCIATURA EN TECNOLOGIAS BIOMEDICAS", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/licenciatura-en-tecnologias-biomedicas" },
    { nombre: "INGENIERIA EN CIENCIAS COMPUTACIONALES", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/ciencias-computacionales" },
  ],

  artistico: [
    { nombre: "LICENCIATURA EN ARQUITECTURA", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/la" },
    { nombre: "LICENCIATURA EN ARQUITECTURA", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/arquitectura" },
    { nombre: "LICENCIATURA EN DISEÑO DE INTERIORES  Y AMBIENTACION", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/ldia" },
    { nombre: "LICENCIATURA EN DISEÑO DE MODAS", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/ldm" },
    { nombre: "LICENCIATURA EN DISEÑO INDUSTRIAL", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/ldi" },
    { nombre: "LICENCIATURA EN DISEÑO PARA LA COMUNICACION GRAFICA", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/ldcg" },
    { nombre: "LICENCIATURA EN DISEÑO, ARTE Y TECNOLOGIAS INTERACTIVAS", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=presentacion-0" },
    { nombre: "LICENCIATURA EN MUSICA", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/lm" },
    { nombre: "LICENCIATURA EN ARTES ESCENICAS PARA LA EXPRESION DANCISTICA", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/laeed" },
    { nombre: "LICENCIATURA EN ARTES ESCENICAS PARA LA EXPRESION TEATRAL", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/laeet" },
    { nombre: "LICENCIATURA EN ARTES VISUALES PARA LA EXPRESION FOTOGRAFICA", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/lavef" },
    { nombre: "LICENCIATURA EN ARTES VISUALES PARA LA EXPRESION PLASTICA", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/lavep" },
    { nombre: "LICENCIATURA EN ESCRITURA CREATIVA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Escritura%20Creativa" },
    { nombre: "LICENCIATURA EN CREATIVIDAD DIGITAL", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/licenciatura-en-creatividad-digital" },
    { nombre: "LICENCIATURA EN DISEÑO DE ARTESANIA", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/diseno-artesanias" },
    { nombre: "LICENCIATURA EN HISTORIA DEL ARTE", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/historia-del-arte" },
  ],

  social: [
    { nombre: "LICENCIATURA EN CIRUJANO DENTISTA", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/cirujano-dentista-cucs" },
    { nombre: "LICENCIATURA EN CULTURA FISICA Y DEPORTES", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/cultura-fisica-y-deportes" },
    { nombre: "LICENCIATURA EN ENFERMERIA", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/enfermeria-cucs" },
    { nombre: "LICENCIATURA EN ENFERMERIA", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/lic_enfermeria" },
    { nombre: "LICENCIATURA EN ENFERMERIA (MODALIDAD A DISTANCIA)", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/licenciatura-en-enfermeria-modalidad-distancia" },
    { nombre: "LICENCIATURA EN NUTRICION", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/licenciatura-en-nutricion" },
    { nombre: "LICENCIATURA EN NUTRICION", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/nutricion" },
    { nombre: "LICENCIATURA EN PODOLOGIA", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/podologia" },
    { nombre: "LICENCIATURA EN PSICOLOGIA", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/psicologia-0" },
    { nombre: "LICENCIATURA EN RADIOLOGIA E IMAGEN", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/radiologia-e-imagen" },
    { nombre: "LICENCIATURA EN TERAPIA FISICA", campus: "CUCS", enlace: "http://www.pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/terapia-fisica-lic/" },
    { nombre: "LICENCIATURA EN TERAPIA RESPIRATORIA", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/terapia-respiratoria-cucs-tsu" },
    { nombre: "MEDICO CIRUJANO Y PARTERO", campus: "CUCS", enlace: "http://pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/licenciatura-en-medico-cirujano-y-partero" },
    { nombre: "MEDICO CIRUJANO Y PARTERO", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/medico-cirujano-partero" },
    { nombre: "TECNICO SUPERIOR UNIVERSITARIO EN EMERGENCIAS SEGURIDAD LABORAL Y RESCATES (NIVELACION)", campus: "CUCS", enlace: "" },
    { nombre: "TECNICO SUPERIOR UNIVERSITARIO EN PROTESIS DENTAL", campus: "CUCS", enlace: "http://www.pregrado.udg.mx/Centros/Tem%C3%A1ticos/CUCS/protesis-dental-cucs-tsu" },
    { nombre: "LICENCIATURA EN GERONTOLOGIA", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/gerontologia" },
    { nombre: "LICENCIATURA EN SALUD PUBLICA", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/salud-publica" },
    { nombre: "LICENCIATURA EN TRABAJO SOCIAL", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Trabajo%20Social" },
    { nombre: "LICENCIATURA EN TRABAJO SOCIAL (NIVELACION)", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Nivelaci%C3%B3n%20a%20la%20Licenciatura%20en%20Trabajo%20Social%20%28NiLiTS%29" },
  ],

  emprendedor: [
    { nombre: "LICENCIATURA EN AGRONEGOCIOS", campus: "CUCBA", enlace: "https://cucba.udg.mx/oferta-academica/licenciaturas/licenciatura-en-agronegocios" },
    { nombre: "INGENIERIA EN NEGOCIOS", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lneg" },
    { nombre: "LICENCIATURA EN ADMINISTRACION", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/liad" },
    { nombre: "LICENCIATURA EN ADMINISTRACION FINANCIERA Y SISTEMAS", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lafi" },
    { nombre: "LICENCIATURA EN ADMINISTRACION GUBERNAMENTAL Y POLITICAS PUBLICAS", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/LAGP" },
    { nombre: "LICENCIATURA EN AUDITORIA Y CONTABILIDAD GUBERNAMENTAL", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lacg" },
    { nombre: "LICENCIATURA EN CONTADURIA PUBLICA", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lcop" },
    { nombre: "LICENCIATURA EN CONTADURIA PUBLICA", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/contaduria" },
    { nombre: "LICENCIATURA EN ECONOMIA", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/leco" },
    { nombre: "LICENCIATURA EN GESTION DE NEGOCIOS GASTRONOMICOS", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lgng" },
    { nombre: "LICENCIATURA EN GESTION Y ECONOMIA AMBIENTAL", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/liga" },
    { nombre: "LICENCIATURA EN MERCADOTECNIA", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lime" },
    { nombre: "LICENCIATURA EN NEGOCIOS INTERNACIONALES", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lini" },
    { nombre: "LICENCIATURA EN RECURSOS HUMANOS", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lirh" },
    { nombre: "LICENCIATURA EN RELACIONES PUBLICAS Y COMUNICACION", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lrpc" },
    { nombre: "LICENCIATURA EN TURISMO", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/turi" },
    { nombre: "LICENCIATURA EN MERCADOTECNIA DIGITAL", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/lmd" },
    { nombre: "LICENCIATURA EN INTELIGENCIA FINANCIERA Y DE NEGOCIOS", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/licenciatura-en-inteligencia-financiera-y-de-negocios" },
    { nombre: "LICENCIATURA EN ADMINISTRACION DE LAS ORGANIZACIONES", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/lao" },
    { nombre: "LICENCIATURA EN GESTION CULTURAL", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/lgc" },
    { nombre: "LICENCIATURA EN ADMINISTRACION DE NEGOCIOS", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/administracion-negocios" },
  ],

  convencional: [
    { nombre: "LICENCIATURA EN URBANISTICA Y MEDIO AMBIENTE", campus: "CUAAD", enlace: "https://cuaad.udg.mx/?q=oferta/licenciaturas/luma" },
    { nombre: "LICENCIATURA EN TECNOLOGIAS DE LA INFORMACION", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/ltin" },
    { nombre: "TECNICO SUPERIOR UNIVERSITARIO EN TECNOLOGIAS DE LA INFORMACION", campus: "CUCEA", enlace: "https://www.cucea.udg.mx/oferta-academica/tsti" },
    { nombre: "LICENCIATURA EN DESARROLLO DE SISTEMAS WEB", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/carreras/desarrolloweb/" },
    { nombre: "LICENCIATURA EN TECNOLOGIAS E INFORMACION", campus: "CUCEI", enlace: "https://www.cucei.udg.mx/carreras/tecnologias/" },
    { nombre: "ABOGADO", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Carrera%20en%20Abogado" },
    { nombre: "ABOGADO", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/abogado" },
    { nombre: "ABOGADO (SEMIESCOLARIZADO)", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Carrera%20de%20Abogado%20Semiescolarizado" },
    { nombre: "LICENCIATURA EN ANTROPOLOGIA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Antropolog%C3%ADa" },
    { nombre: "LICENCIATURA EN CRIMINOLOGIA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Criminolog%C3%ADa" },
    { nombre: "LICENCIATURA EN DIDACTICA DEL FRANCES COMO LENGUA EXTRANJERA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Did%C3%A1ctica%20del%20Franc%C3%A9s%20como%20Lengua%20Extranjera" },
    { nombre: "LICENCIATURA EN DOCENCIA DEL INGLES COMO LENGUA EXTRANJERA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Docencia%20del%20Ingl%C3%A9s%20como%20Lengua%20Extranjera" },
    { nombre: "LICENCIATURA EN ESTUDIOS POLITICOS Y GOBIERNO", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Estudios%20Pol%C3%ADticos%20y%20Gobierno" },
    { nombre: "LICENCIATURA EN FILOSOFIA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Filosof%C3%ADa" },
    { nombre: "LICENCIATURA EN GEOGRAFIA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Geograf%C3%ADa" },
    { nombre: "LICENCIATURA EN HISTORIA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Historia" },
    { nombre: "LICENCIATURA EN LETRAS HISPANICAS", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Letras%20Hisp%C3%A1nicas" },
    { nombre: "LICENCIATURA EN RELACIONES INTERNACIONALES", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Relaciones%20Internacionales" },
    { nombre: "LICENCIATURA EN SOCIOLOGIA", campus: "CUCSH", enlace: "https://www.cucsh.udg.mx/licenciaturas/Licenciatura%20en%20Sociolog%C3%ADa" },
    { nombre: "LICENCIATURA EN BIBLIOTECOLOGIA Y GESTION DEL CONOCIMIENTO", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/lbgc" },
    { nombre: "LICENCIATURA EN DESARROLLO EDUCATIVO", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/lde" },
    { nombre: "LICENCIATURA EN PERIODISMO DIGITAL", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/lpd" },
    { nombre: "LICENCIATURA EN SEGURIDAD CIUDADANA", campus: "CUGDL", enlace: "https://cugdl.udg.mx/oferta-academica/lsc" },
    { nombre: "LICENCIATURA EN ESTUDIOS LIBERALES", campus: "CUTONALA", enlace: "https://cutonala.udg.mx/oferta/licenciaturas/estudios-liberales" },
  ],
};