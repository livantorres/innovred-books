import { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Howl } from 'howler';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const pageFlipSound = new Howl({
  src: ['/sounds/page-flip.mp3'],
  volume: 0.3,
});

export default function BookViewer({ book, onBack }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(800);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset) => {
    const newPageNumber = pageNumber + offset;
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
      pageFlipSound.play();
    }
  };
  // Función para descargar el PDF
  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = book.pdfPath;
    link.download = `${book.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setPageWidth(Math.min(containerWidth - 40, 800));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Controles superiores */}
      <div className="w-full bg-gray-800/50 py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg transition shadow-lg"
          >
            ← Volver a Biblioteca
          </button>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Botón de Descarga */}
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition shadow-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Descargar PDF
            </button>
          <div className="flex items-center gap-4 bg-gray-700/50 px-4 py-2 rounded-lg">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition font-bold"
            >
              Anterior
            </button>
            
            <span className="text-white font-medium min-w-[120px] text-center">
              Página {pageNumber} de {numPages || '--'}
            </span>
            
            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
              className="px-4 py-1 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition font-bold"
            >
              Siguiente
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Contenedor principal centrado */}
      <div className="flex-grow flex items-center justify-center p-4" ref={containerRef}>
        <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-2xl border border-gray-200">
          <Document
            file={book.pdfPath}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex justify-center items-center h-[80vh]">
                <div className="text-gray-700 text-lg animate-pulse">
                  Cargando libro mágico...
                </div>
              </div>
            }
            error={
              <div className="flex justify-center items-center h-[80vh] text-red-500">
                Error al cargar el libro
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber} 
              width={pageWidth}
              loading={
                <div className="flex justify-center items-center h-[80vh]">
                  <div className="text-gray-500">Cargando página...</div>
                </div>
              }
              renderTextLayer={false}
              className="mx-auto shadow-inner"
            />
          </Document>
        </div>
      </div>

      {/* Créditos */}
      <div className="bg-gray-800/50 py-3 text-center text-white/80 text-sm">
        <p>Creado por: Ing. Livan Torres, Lic. María Córdoba y Lic. Beatriz Perez</p>
        <p className="mt-1">InnovRed Books - {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}