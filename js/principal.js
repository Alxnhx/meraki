let currentPage = 0;
const totalPages = []; // Almacenará todas las imágenes como páginas
let isAnimating = false; // Bandera para evitar múltiples animaciones simultáneas

/**
 * Crea la estructura del libro interactivo con vista de libro abierto
 */
function crearLibro() {
  const flipBook = document.getElementById('flip-book');
  if (!flipBook) return;
  
  // Obtener todas las imágenes
  const imgs = Array.from(flipBook.querySelectorAll('img'));
  flipBook.innerHTML = ''; // Limpiamos el contenedor
  
  // Transferimos todas las imágenes a nuestro array de páginas
  for (let i = 0; i < imgs.length; i++) {
    totalPages.push(imgs[i].src);
  }
  
  // Creamos la estructura básica del libro
  const bookWrapper = document.createElement('div');
  bookWrapper.className = 'book-wrapper';
  
  // Creamos las dos páginas visibles (izquierda y derecha)
  const leftPage = document.createElement('div');
  leftPage.className = 'book-page left-page';
  leftPage.id = 'left-page';
  
  const rightPage = document.createElement('div');
  rightPage.className = 'book-page right-page';
  rightPage.id = 'right-page';
  
  // Creamos el elemento para la animación de volteo
  const flipElement = document.createElement('div');
  flipElement.className = 'flip-element';
  flipElement.id = 'flip-element';
  
  // Añadimos las páginas al contenedor
  bookWrapper.appendChild(leftPage);
  bookWrapper.appendChild(rightPage);
  bookWrapper.appendChild(flipElement);
  flipBook.appendChild(bookWrapper);
  
  // Mostramos las primeras dos páginas
  actualizarPaginas();
}

/**
 * Actualiza las páginas mostradas según la posición actual
 */
function actualizarPaginas() {
  const leftPage = document.getElementById('left-page');
  const rightPage = document.getElementById('right-page');
  
  // Determinamos qué páginas mostrar según la posición actual
  const leftIndex = currentPage;
  const rightIndex = currentPage + 1;
  
  // Actualizamos la página izquierda
  if (leftIndex < totalPages.length) {
    leftPage.style.backgroundImage = `url("${totalPages[leftIndex]}")`;
    leftPage.style.display = 'block';
  } else {
    leftPage.style.display = 'none';
  }
  
  // Actualizamos la página derecha
  if (rightIndex < totalPages.length) {
    rightPage.style.backgroundImage = `url("${totalPages[rightIndex]}")`;
    rightPage.style.display = 'block';
  } else {
    rightPage.style.display = 'none';
  }
  
  // Actualizamos los botones de navegación
  actualizarBotonesNavegacion();
}

/**
 * Función para navegar entre las páginas del libro con animación
 */
function flipPage(direction) {
  // Evitamos múltiples animaciones simultáneas
  if (isAnimating) return;
  
  const flipElement = document.getElementById('flip-element');
  
  if (direction === 'next' && currentPage + 2 < totalPages.length) {
    isAnimating = true;
    
    // Configuramos el elemento de animación para "siguiente"
    flipElement.style.backgroundImage = `url("${totalPages[currentPage + 1]}")`;
    flipElement.style.left = '50%';
    flipElement.style.transformOrigin = 'left center';
    
    // Mostramos el elemento de animación
    flipElement.style.display = 'block';
    
    // Iniciamos la animación
    setTimeout(() => {
      flipElement.classList.add('flipping-right-to-left');
      
      // Cambiamos las páginas a mitad de la animación
      setTimeout(() => {
        // Cambiamos la imagen para la segunda mitad de la animación
        flipElement.style.backgroundImage = `url("${totalPages[currentPage + 2]}")`;
      }, 150);
      
      // Finalizamos la animación
      setTimeout(() => {
        currentPage += 2;
        actualizarPaginas();
        flipElement.classList.remove('flipping-right-to-left');
        flipElement.style.display = 'none';
        isAnimating = false;
      }, 500);
    }, 50);
  } 
  else if (direction === 'prev' && currentPage > 0) {
    isAnimating = true;
    
    // Configuramos el elemento de animación para "anterior"
    flipElement.style.backgroundImage = `url("${totalPages[currentPage - 1]}")`;
    flipElement.style.left = '0';
    flipElement.style.transformOrigin = 'right center';
    
    // Mostramos el elemento de animación
    flipElement.style.display = 'block';
    
    // Iniciamos la animación
    setTimeout(() => {
      flipElement.classList.add('flipping-left-to-right');
      
      // Cambiamos las páginas a mitad de la animación
      setTimeout(() => {
        // Cambiamos la imagen para la segunda mitad de la animación
        flipElement.style.backgroundImage = `url("${totalPages[currentPage - 2]}")`;
      }, 150);
      
      // Finalizamos la animación
      setTimeout(() => {
        currentPage -= 2;
        actualizarPaginas();
        flipElement.classList.remove('flipping-left-to-right');
        flipElement.style.display = 'none';
        isAnimating = false;
      }, 500);
    }, 50);
  }
}

/**
 * Actualiza el estado de los botones de navegación según la página actual
 */
function actualizarBotonesNavegacion() {
  const prevBtn = document.querySelector('.nav-button:first-child');
  const nextBtn = document.querySelector('.nav-button:last-child');
  
  if (prevBtn && nextBtn) {
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage + 2 >= totalPages.length;
  }
}

// Inicialización cuando el documento está listo
document.addEventListener('DOMContentLoaded', function() {
  crearLibro();
  
  // Configuración de gestos táctiles si HammerJS está disponible
  if (typeof Hammer !== 'undefined') {
    const flipBook = document.getElementById('flip-book');
    if (flipBook) {
      const hammer = new Hammer(flipBook);
      hammer.on('swipeleft', () => flipPage('next'));
      hammer.on('swiperight', () => flipPage('prev'));
    }
  }
});

/**
 * Genera las tarjetas de información enriquecidas con imagen, título, contenido e ícono.
 */
function generarContenido() {
  const infoGrid = document.getElementById('info-grid');
  if (!infoGrid) return;
  
  const contenido = {
    informacion: [
      {
        titulo: "¿Qué es la Psicopedagogía?",
        contenido: "Disciplina que integra psicología y educación para potenciar el aprendizaje integral.",
        icono: "🧠",
        imagen: "items/psicopedagogia.jpeg"
      },
      {
        titulo: "Enfoque Integral",
        contenido: "Abordamos el proceso educativo considerando las emociones y necesidades individuales.",
        icono: "🎯",
        imagen: "./items/enfoque.png"
      },
      {
        titulo: "Metodología Innovadora",
        contenido: "Utilizamos métodos interactivos y personalizados para optimizar el aprendizaje.",
        icono: "📘",
        imagen: "./items/metodologias.jpeg"
      }
    ]
  };
  
  contenido.informacion.forEach(item => {
    const card = document.createElement('div');
    card.className = 'info-card';
    card.innerHTML = `
      <img src="${item.imagen}" alt="${item.titulo}">
      <h3>${item.icono} ${item.titulo}</h3>
      <p>${item.contenido}</p>
    `;
    infoGrid.appendChild(card);
  });
  
  // Microinteracción en las tarjetas (toggle de clase al hacer click)
  document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });
}

// También inicializamos el contenido si está presente
document.addEventListener('DOMContentLoaded', function() {
  generarContenido();
});