import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import axios from 'axios';
import store from './store';
import AppRoutes from './routes';

// Set default axios settings
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor to include token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;