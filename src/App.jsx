import { useState, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingFinish = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {loading ? (
            <LoadingScreen onFinish={handleLoadingFinish} />
          ) : (
            <AppRoutes />
          )}
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
