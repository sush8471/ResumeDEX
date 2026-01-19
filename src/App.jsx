import { useState } from 'react';
import UploadForm from './components/UploadForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorMessage from './components/ErrorMessage';
import { optimizeResume } from './utils/api';
import './index.css';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (resumeFile, jobDescription) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await optimizeResume(resumeFile, jobDescription);
      setResults(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      console.error('Optimization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setResults(null);
  };

  return (
    <div className="app">
      {isLoading && <LoadingOverlay />}
      
      <div className="container">
        {error ? (
          <ErrorMessage error={error} onRetry={handleRetry} />
        ) : results ? (
          <ResultsDisplay results={results} />
        ) : (
          <UploadForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}
      </div>
      
      <footer className="app-footer">
        <p>Built with ❤️ for professionals seeking their next opportunity</p>
      </footer>
    </div>
  );
}

export default App;
