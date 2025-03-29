import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { AppShell } from '@mantine/core';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { Banner } from './components/sections/Banner/Banner';
import { Hardware } from './components/sections/Hardware/Hardware';
import { RepairTimeline } from './components/sections/RepairTimeline/RepairTimeline';
import { CustomPC } from './components/sections/CustomPC/CustomPC';
import { Pricing } from './components/sections/Pricing/Pricing';
import { SampleProjects } from './components/sections/SampleProjects/SampleProjects';
import { CustomerReviews } from './components/sections/CustomerReviews/CustomerReviews';
import { Contact } from './components/sections/Contact/Contact';
import { Faq } from './components/sections/Faq/Faq';
import { ScrollToTop } from './components/layout/ScrollToTop/ScrollToTop';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { NotFound } from './pages/NotFound/NotFound';
import { JobStatus } from './pages/JobStatus/JobStatus';
import { useEffect, useState } from 'react';

function AppContent() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const location = useLocation();
  const hideHeaderFooter = location.pathname !== '/' && (location.pathname.startsWith('/job/') || location.pathname === '/404' || location.pathname === '/not-found' || location.pathname === '/404.html');

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setColorScheme(savedTheme as 'light' | 'dark');
      return;
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setColorScheme(prefersDark ? 'dark' : 'light');

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <MantineProvider defaultColorScheme={colorScheme}>
      <ColorSchemeScript defaultColorScheme={colorScheme} />
      <AppShell
        header={!hideHeaderFooter ? { height: 60 } : undefined}
        footer={!hideHeaderFooter ? { height: { base: 120, sm: 80 } } : undefined}
        padding="md"
      >
        {!hideHeaderFooter && (
          <AppShell.Header>
            <Header />
          </AppShell.Header>
        )}
        
        <AppShell.Main
          style={{
            width: "100%",
            maxWidth: "100%", 
            margin: "0", 
            padding: "0", 
            minHeight: hideHeaderFooter ? "100vh" : "calc(100vh - 140px)",
            paddingBottom: hideHeaderFooter ? "0" : "100px",
            overflowX: "hidden"
          }}
        >
          <Routes>
            <Route path="/" element={
              <>
                <Banner />
                <Hardware />
                <RepairTimeline />
                <CustomPC />
                <Pricing />
                <SampleProjects />
                <CustomerReviews />
                <Contact />
                <Faq />
              </>
            } />
            <Route path="/job/:uniqueid" element={<JobStatus />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/404.html" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AppShell.Main>
        
        {!hideHeaderFooter && (
          <AppShell.Footer>
            <Footer />
          </AppShell.Footer>
        )}
        
        {!hideHeaderFooter && <ScrollToTop />}
      </AppShell>
    </MantineProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;