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