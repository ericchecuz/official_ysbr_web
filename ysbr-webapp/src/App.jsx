import Header from './components/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import AboutUs from './components/AboutUs'
import Partners from './components/Partners'
import JoinUs from './components/JoinUs'
import Footer from './components/Footer'


function App() {
  const responsiveStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  };
  
  const leftItems = [
    { label: 'About Us', href: '#about' },
    { label: 'Events', href: '#events' },
  ];
  
  const rightItems = [
    { label: 'Shop', href: '#shop', type: 'link' },
    { label: 'Tesserati', type: 'button', class: 'joinButton' },
  ];
  
  const logoSrc = 'ysbr-logo.png';
  
  return (
    <div style={responsiveStyle}>
    <Header leftItems={leftItems} rightItems={rightItems} logoSrc={logoSrc} />
      <main >
        <Hero />
        {/* <Events />
        <AboutUs />
        <Partners />
        <JoinUs /> */}
      </main>
      <Footer
        logoSrc={logoSrc}
        address="YSBR - Via Volta 7, 20836 Briosco (MB)"
        piva="P.IVA 13175720963"
        statuteLink="#statute" 
        instagramUrl="https://instagram.com" 
        whatsappUrl="https://whatsapp.com" 
      />
    </div>
  )
}

export default App
