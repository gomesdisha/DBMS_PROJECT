import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CelestialObjects from './pages/CelestialObjects';
import Users from './pages/Users';
import Exoplanets from './pages/Exoplanets';
import Stars from './pages/Stars';
import Galaxies from './pages/Galaxies';
import Asteroids from './pages/Asteroids';
import ObservationLogs from './pages/ObservationLogs';
import SpectralData from './pages/SpectralData';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout>
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/celestial-objects" element={<CelestialObjects />} />
              <Route path="/users" element={<Users />} />
              <Route path="/exoplanets" element={<Exoplanets />} />
              <Route path="/stars" element={<Stars />} />
              <Route path="/galaxies" element={<Galaxies />} />
              <Route path="/asteroids" element={<Asteroids />} />
              <Route path="/observation-logs" element={<ObservationLogs />} />
              <Route path="/spectral-data" element={<SpectralData />} />
            </Routes>
          </Box>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
