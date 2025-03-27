import { MantineProvider, AppShell } from "@mantine/core";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Banner } from "./components/Banner";
import { RepairTimeline } from "./components/RepairTimeline";
import { Hardware } from "./components/Hardware";
import { CustomPC } from "./components/CustomPC";
import { Pricing } from "./components/Pricing";
import { Contact } from "./components/Contact";
import { CustomerReviews } from "./components/CustomerReviews";
import { SampleProjects } from "./components/SampleProjects";
import { Faq } from "./components/Faq";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "ifConfig - Serwis Komputerowy";
  }, []);

  return (
    <MantineProvider>
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
          <Banner />
          <Hardware />
          <RepairTimeline />
          <CustomPC />
          <Pricing />
          <SampleProjects />
          <CustomerReviews />
          <Contact />
          <Faq />
        </AppShell.Main>
        
        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

export default App;