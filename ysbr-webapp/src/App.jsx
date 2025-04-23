import Header from './components/Header'
import Hero from './components/Hero'
import Events from './components/Events'
import AboutUs from './components/AboutUs'
import Partners from './components/Partners'
import JoinUs from './components/JoinUs'
import Footer from './components/Footer'
import ScrollingText from './components/ScrollingText'
import ImageCarousel from './components/AboutUs'
import NextEvents from './components/NextEvents'





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
  const itemsNextEvents = [
    {title: 'YSBR',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
    image: 'https://via.placeholder.com/600x300',
      category: "YSBR"
    },
    {
    title: 'SPORT',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.',
    image: 'https://via.placeholder.com/600x300',
    category: "SPORT"
    },
  {
    title: 'MUSIC',
    description: 'Another description for the third slide.',
    image: 'https://via.placeholder.com/600x300',
    category: "MUSIC"
    },
  {
    title: 'NATURE',
    description: 'Another description for the second slide.',
    image: 'https://via.placeholder.com/600x300',
    category: "NATURE"
  },
  ]
  const items = [
  {
    title: 'YSBR',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
    image: 'https://via.placeholder.com/600x300',
    category: "YSBR"
  },
  {
    title: 'SPORT',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.',
    image: 'https://via.placeholder.com/600x300',
    category: "SPORT"
    },
  {
    title: 'MUSIC',
    description: 'Another description for the third slide.',
    image: 'https://via.placeholder.com/600x300',
    category: "MUSIC"
    },
  {
    title: 'NATURE',
    description: 'Another description for the second slide.',
    image: 'https://via.placeholder.com/600x300',
    category: "NATURE"
  },
  ];
    const scrollingItems = [
    { 
      label: 'Balance Board', 
      icon: 'https://cdn-icons-png.flaticon.com/512/744/744929.png' // Icona di bilanciamento
    },
    { 
      label: 'Slack Line', 
      icon: 'https://cdn-icons-png.flaticon.com/512/744/744928.png' // Icona di slackline
    },
    { 
      label: 'Dj', 
      icon: 'https://cdn-icons-png.flaticon.com/512/744/744937.png' // Icona di DJ
    },
  ];
  
  
  return (
    <div style={responsiveStyle}>
    <Header leftItems={leftItems} rightItems={rightItems} logoSrc={logoSrc} />
      <main >
        <Hero />
        <ScrollingText
        text="Next Events "
        speed={28} 
        direction="left" 
        textColor="black" 
          fontSize="2rem" 
          backgroundColor='var(--title-color)'
        />
        <AboutUs items={items}/>
        {/* <Events />
        <AboutUs />
        <Partners />
        <JoinUs /> */}
        <ScrollingText
          items={scrollingItems}
        text="Balance Board  🏄     Slack Line 🤸     Dj  🎧"
        speed={90} 
        direction="left" 
        textColor="black" 
          fontSize="2rem" 
          backgroundColor='var(--green-main)'
        />
        <NextEvents items={itemsNextEvents}></NextEvents>
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
