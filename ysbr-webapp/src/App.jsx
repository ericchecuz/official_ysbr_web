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
  
  /* css prova conetnuto  */
  const prova = {
    display: 'flex',
    width: '100%',
    height: '100%',
    border: '1px solid black',
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
      <main style={prova}>
        {/* <Hero />
        <Events />
        <AboutUs />
        <Partners />
        <JoinUs /> */}
      </main>
      <Footer />
    </div>
  )
}

export default App
