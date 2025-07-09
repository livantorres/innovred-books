import { useState, useEffect } from 'react';
import Modal from './Modal';
import { openURL } from '../utils/capacitorUtils';
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
];

const games = [
  {
    id: 1,
    title: "Froggy Jumps - Desafío Familiar De la Cerda",
    cover: "/covers/juego1.png",
    gameUrl: "https://es.educaplay.com/recursos-educativos/21400214-desafio_familiar_de_la_cerda.html?authuser=0"
  },
  {
    id: 2,
    title: "Completar frases - Completa los Espacios: La Dedicación de la Señora De la Cerda narrativa",
    cover: "/covers/juego2.png",
    gameUrl: "https://es.educaplay.com/recursos-educativos/21399629-completa_los_espacios_la_dedicacion_de_la_senora_de_la_cerda.html?authuser=0"
  },
  {
    id: 3,
    title: "Quiz sobre Rescate Animal",
    cover: "/covers/juego3.png",
    gameUrl: "https://www.educaplay.com/learning-resources/24355620-quiz_sobre_rescate_animal.html"
  },
  {
    id: 4,
    title: "Juego de Refranes",
    cover: "/covers/juego4.png",
    gameUrl: "https://app.nearpod.com/presentation?pin=MCUG6"
  },
];

const videos = [
  {
    id: 1,
    youtubeId: "gyH3lJfxC9U",
    url: "https://www.youtube.com/watch?v=gyH3lJfxC9U"
  },
  {
    id: 2,
    youtubeId: "i-htv81L04g",
    url: "https://www.youtube.com/watch?v=i-htv81L04g"
  }
];

const moocs = [
  {
    id: 1,
    title: "Estrategias Gamificadas para Mejorar la Lectura, Escritura y Pensamiento Crítico en Estudiantes de 5° Grado",
    cover: "/covers/mooc1.png",
    url: "https://innovred.milaulas.com"
  }
];

export default function BookSelector({ onBookSelect }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeTab, setActiveTab] = useState('libros');
  const [selectedContent, setSelectedContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [videoMetadata, setVideoMetadata] = useState({});
  const [loadingVideos, setLoadingVideos] = useState(true);

  // Obtener metadatos de los videos de YouTube
  useEffect(() => {
    const fetchVideoMetadata = async () => {
      const metadata = {};
      for (const video of videos) {
        try {
          const response = await fetch(
            `https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${video.youtubeId}&format=json`
          );
          if (response.ok) {
            const data = await response.json();
            metadata[video.youtubeId] = {
              title: data.title,
              thumbnail: data.thumbnail_url.replace('hqdefault', 'maxresdefault') || data.thumbnail_url
            };
          }
        } catch (error) {
          console.error("Error fetching video metadata:", error);
          metadata[video.youtubeId] = {
            title: `Video ${video.id}`,
            thumbnail: `/covers/default-video.png`
          };
        }
      }
      setVideoMetadata(metadata);
      setLoadingVideos(false);
    };

    if (activeTab === 'videos') {
      fetchVideoMetadata();
    }
  }, [activeTab]);

  const handleSelect = (book) => {
    setSelectedBook(book.id);
    onBookSelect(book);
  };

  const handleContentSelect = (content) => {
  // Si es MOOC, no abrir modal, se manejará con el enlace directo
  if (activeTab !== 'moocs') {
    setSelectedContent(content);
    setShowModal(true);
  }
};

  const closeModal = () => {
    setShowModal(false);
    setSelectedContent(null);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'libros': return '📚 Biblioteca Mágica';
      case 'juegos': return '🎮 Juegos Educativos';
      case 'videos': return '🎥 Videos Didácticos';
      case 'moocs': return '🏫 Cursos en Línea';
      default: return 'Biblioteca Mágica';
    }
  };

  const getTabSubtitle = () => {
    switch (activeTab) {
      case 'libros': return '¡Disfruta tu lectura!';
      case 'juegos': return '¡Aprende jugando!';
      case 'videos': return '¡Conoce más con nuestros videos!';
      case 'moocs': return '¡Amplía tus conocimientos!';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 relative z-20">
      {/* Títulos */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 animate-bounce">
          {getTabTitle()}
        </h1>
        <h2 className="text-xl sm:text-2xl text-yellow-300 font-medium">
          {getTabSubtitle()}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800/50 rounded-lg p-1 inline-flex flex-wrap justify-center">
          <button
            onClick={() => setActiveTab('libros')}
            className={`px-4 py-2 rounded-md text-lg font-medium transition-colors ${activeTab === 'libros' ? 'bg-yellow-500 text-gray-900' : 'text-white hover:bg-gray-700'}`}
          >
            📚 Libros
          </button>
          <button
            onClick={() => setActiveTab('juegos')}
            className={`px-4 py-2 rounded-md text-lg font-medium transition-colors ${activeTab === 'juegos' ? 'bg-green-500 text-gray-900' : 'text-white hover:bg-gray-700'}`}
          >
            🎮 Juegos
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-md text-lg font-medium transition-colors ${activeTab === 'videos' ? 'bg-red-500 text-gray-900' : 'text-white hover:bg-gray-700'}`}
          >
            🎥 Videos
          </button>
          <button
            onClick={() => setActiveTab('moocs')}
            className={`px-4 py-2 rounded-md text-lg font-medium transition-colors ${activeTab === 'moocs' ? 'bg-purple-500 text-gray-900' : 'text-white hover:bg-gray-700'}`}
          >
            🏫 MOOCs
          </button>
        </div>
      </div>
      
      {/* Contenido de los Tabs */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'libros' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => handleSelect(book)}
                className={`group cursor-pointer transition-all duration-300 ${selectedBook === book.id ? 'transform scale-95' : 'hover:scale-105'}`}
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-yellow-400/30 flex flex-col">
                  <div className="relative pt-[150%] overflow-hidden">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:p-2 transition-all duration-300"
                    />
                  </div>
                  
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
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'juegos' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => handleContentSelect(game)}
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-green-400/30 flex flex-col">
                  <div className="relative pt-[150%] overflow-hidden">
                    <img 
                      src={game.cover} 
                      alt={game.title} 
                      className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:p-2 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-white text-center mb-4 line-clamp-2">
                      {game.title}
                    </h3>
                    <button 
                      className="mt-auto px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-green-500/20 self-stretch"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContentSelect(game);
                      }}
                    >
                      Jugar ahora
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : activeTab === 'videos' ? (
          loadingVideos ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-white text-lg">Cargando videos...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {videos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleContentSelect(video)}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-red-400/30 flex flex-col">
                    <div className="relative pt-[150%] overflow-hidden">
                      <img 
                        src={videoMetadata[video.youtubeId]?.thumbnail || '/covers/default-video.png'} 
                        alt={videoMetadata[video.youtubeId]?.title || `Video ${video.id}`}
                        className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-600/80 rounded-full p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-white text-center mb-4 line-clamp-2">
                        {videoMetadata[video.youtubeId]?.title || `Video ${video.id}`}
                      </h3>
                      <button 
                        className="mt-auto px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-red-500/20 self-stretch"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContentSelect(video);
                        }}
                      >
                        Ver Video
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {moocs.map((mooc) => (
              <div
                key={mooc.id}
                className="group transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-purple-400/30 flex flex-col">
                  <div className="relative pt-[150%] overflow-hidden">
                    <img 
                      src={mooc.cover} 
                      alt={mooc.title} 
                      className="absolute top-0 left-0 w-full h-full object-cover p-4 group-hover:p-2 transition-all duration-300"
                    />
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold text-white text-center mb-4 line-clamp-2">
                      {mooc.title}
                    </h3>
                   {/* <a
                      href={mooc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-purple-500/20 self-stretch text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ir al Curso
                    </a>*/}

                      <button
                      onClick={() => openURL(mooc.url)}
                      className="mt-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-purple-500/20 self-stretch"
                    >
                      Ir al Curso
                    </button>
                  </div>
                </div>
              </div>
          
            ))}
          </div>
        )}
      </div>
      
      {/* Modal para contenido */}
      {showModal && selectedContent && (
        <Modal onClose={closeModal}>
          <div className="w-full h-full flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-4">
              {selectedContent.title || videoMetadata[selectedContent.youtubeId]?.title || 'Contenido'}
            </h3>
            <div className="flex-grow">
              {selectedContent.gameUrl ? (
                <iframe 
                  src={selectedContent.gameUrl} 
                  title={selectedContent.title}
                  className="w-full h-full rounded-lg border-none"
                  allowFullScreen
                />
              ) : selectedContent.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedContent.youtubeId}?autoplay=1`}
                  title={videoMetadata[selectedContent.youtubeId]?.title}
                  className="w-full h-full rounded-lg border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <iframe
                  src={selectedContent.url}
                  title={selectedContent.title}
                  className="w-full h-full rounded-lg border-none"
                  allowFullScreen
                />
              )}
            </div>
            <button 
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}

      {/* Créditos */}
      <div className="mt-16 text-center text-white/70 text-sm">
        <p>Creado por: Ing. Livan Torres, Lic. María Córdoba y Lic. Beatriz Perez</p>
        <p className="mt-2">© {new Date().getFullYear()} InnovRed Books</p>
      </div>
    </div>
  );
}