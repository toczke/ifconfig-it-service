import { MantineProvider } from '@mantine/core';
import { AppShell } from '@mantine/core';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Banner } from './components/Banner';
import { Hardware } from './components/Hardware';
import { RepairTimeline } from './components/RepairTimeline';
import { CustomPC } from './components/CustomPC';
import { Pricing } from './components/Pricing';
import { SampleProjects } from './components/SampleProjects';
import { CustomerReviews } from './components/CustomerReviews';
import { Contact } from './components/Contact';
import { Faq } from './components/Faq';
import { ScrollToTop } from './components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RequestStatus } from './components/RequestStatus';

function App() {
  return (
    <MantineProvider>
      <Router>
        <AppShell
          header={{ height: 60 }}
          footer={{ height: { base: 120, sm: 80 } }}
          padding="md"
        >
          <AppShell.Header>
            <Header />
          </AppShell.Header>
          
          <AppShell.Main
            style={{
              width: "100vw",
              maxWidth: "100%", 
              margin: "0", 
              padding: "0", 
              minHeight: "calc(100vh - 140px)",
              paddingBottom: "100px"
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
              <Route path="/job/:requestId" element={<RequestStatus />} />
            </Routes>
          </AppShell.Main>
          
          <AppShell.Footer>
            <Footer />
          </AppShell.Footer>
          
          <ScrollToTop />
        </AppShell>
      </Router>
    </MantineProvider>
  );
}

export default App;