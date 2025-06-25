import { useState } from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import BookSelector from './components/BookSelector';
import BookViewer from './components/BookViewer';

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <ParticlesBackground />
      
      <div className="relative z-10 min-h-screen">
        {!selectedBook ? (
          <BookSelector onBookSelect={setSelectedBook} />
        ) : (
          <BookViewer book={selectedBook} onBack={() => setSelectedBook(null)} />
        )}
      </div>
    </div>
  );
}