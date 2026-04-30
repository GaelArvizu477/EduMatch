// Este arreglo se usa para testear
const preguntas = [
  // REALISTA
  { texto: "¿Te gustaría diseñar los planos de una casa o estructura?", area: "realista" },
  { texto: "¿Te interesa el funcionamiento de circuitos electrónicos o motores?", area: "realista" }
  ]
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

const riasecRamas = {
  realista: ["ingenieria", "tecnologia"],
  investigador: ["ciencias", "salud"],
  artistico: ["arte", "humanidades"],
  social: ["salud", "humanidades"],
  emprendedor: ["negocios", "administracion"],
  convencional: ["administracion", "negocios"]
};