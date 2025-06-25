import { useState } from 'react';

const books = [
  {
    id: 1,
    title: "COMPRENSIÓN DE DIVERSOS TIPOS DE TEXTOS",
    cover: "/covers/libro1.png",
    pdfPath: "/pdfs/libro1.pdf"
  },
  {
    id: 2,
    title: "El misterio del tesoro perdido",
    cover: "/covers/libro2.png",
    pdfPath: "/pdfs/libro2.pdf"
  },
  // Puedes agregar más libros aquí
];

export default function BookSelector({ onBookSelect }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSelect = (book) => {
    setSelectedBook(book.id);
    onBookSelect(book);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 relative z-20">
      {/* Títulos */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 animate-bounce">📚 Biblioteca Mágica</h1>
        <h2 className="text-xl sm:text-2xl text-yellow-300 font-medium">¡Disfruta tu lectura!</h2>
      </div>
      
      {/* Contenedor de libros */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => handleSelect(book)}
              className={`group cursor-pointer transition-all duration-300 ${selectedBook === book.id ? 'transform scale-95' : 'hover:scale-105'}`}
            >
              <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-yellow-400/30 flex flex-col">
                {/* Imagen del libro con efecto hover */}
                <div className="relative pt-[150%] overflow-hidden">
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:p-2 transition-all duration-300"
                  />
                </div>
                
                {/* Contenido de la card */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-white text-center mb-4 line-clamp-2">
                    {book.title}
                  </h3>
                  <button 
                    className="mt-auto px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-yellow-500/20 self-stretch"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(book);
                    }}
                  >
                    Leer ahora
                  </button>
                </div>
                
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Créditos */}
      <div className="mt-16 text-center text-white/70 text-sm">
        <p>Creado por: Ing. Livan Torres, Lic. María Córdoba y Lic. Beatriz Perez</p>
        <p className="mt-2">© {new Date().getFullYear()} InnovRed Books</p>
      </div>
    </div>
  );
}

