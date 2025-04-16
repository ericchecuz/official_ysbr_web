import Header from './components/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import AboutUs from './components/AboutUs'
import Partners from './components/Partners'
import JoinUs from './components/JoinUs'
import Footer from './components/Footer'
import ScrollingText from './components/ScrollingText'
import ImageCarousel from './components/AboutUs'


function App() {
  const responsiveStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
     minHeight: '100vh', 
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

  const items = [
  {
    title: 'SPORT',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.',
    image: 'https://via.placeholder.com/600x300',
  },
  {
    title: 'NATURE',
    description: 'Another description for the second slide.',
    image: 'https://via.placeholder.com/600x300',
  },
  {
    title: 'CITY',
    description: 'Another description for the third slide.',
    image: 'https://via.placeholder.com/600x300',
  },
];
  
  
  return (
    <div style={responsiveStyle}>
    <Header leftItems={leftItems} rightItems={rightItems} logoSrc={logoSrc} />
      <main >
        <Hero />
        <ScrollingText
        text="Next Events"
        speed={20} 
        direction="left" 
        textColor="#2563eb" 
        fontSize="2rem" 
        backgroundColor="#e0e7ff" 
        />
        <AboutUs items={items}/>
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
