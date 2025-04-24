import Header from './components/Header';
import Hero from './components/Hero';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import Partners from './components/Partners';
import JoinUs from './components/JoinUs';
import Footer from './components/Footer';
import ScrollingText from './components/ScrollingText';
import ImageCarousel from './components/AboutUs';
import NextEvents from './components/NextEvents';

function App() {
  const responsiveStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const leftItems = [
    { label: 'ABOUT US', href: '#about' },
    { label: 'EVENTS', href: '#events' },
  ];

  const rightItems = [
    { label: 'SHOP', href: '#shop', type: 'link' },
    { label: 'TESSERATI', href: '#joinus', type: 'button', class: 'joinButton' }, 
  ];

  const logoSrc = 'ysbr-logo.png';
  const itemsNextEvents = [
    {
      title: 'YSBR',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
      image: 'https://via.placeholder.com/600x300',
      category: 'YSBR',
    },
    {
      title: 'SPORT',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.',
      image: 'https://via.placeholder.com/600x300',
      category: 'SPORT',
    },
    {
      title: 'MUSIC',
      description: 'Another description for the third slide.',
      image: 'https://via.placeholder.com/600x300',
      category: 'MUSIC',
    },
    {
      title: 'NATURE',
      description: 'Another description for the second slide.',
      image: 'https://via.placeholder.com/600x300',
      category: 'NATURE',
    },
  ];

  const items = [
    {
      title: 'YSBR',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
      image: 'https://via.placeholder.com/600x300',
      category: 'YSBR',
    },
    {
      title: 'SPORT',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.',
      image: 'https://via.placeholder.com/600x300',
      category: 'SPORT',
    },
    {
      title: 'MUSIC',
      description: 'Another description for the third slide.',
      image: 'https://via.placeholder.com/600x300',
      category: 'MUSIC',
    },
    {
      title: 'NATURE',
      description: 'Another description for the second slide.',
      image: 'https://via.placeholder.com/600x300',
      category: 'NATURE',
    },
  ];

  const scrollingItems = [
    {
      label: 'Balance Board',
      icon: 'https://cdn-icons-png.flaticon.com/512/744/744929.png', 
    },
    {
      label: 'Slack Line',
      icon: 'https://cdn-icons-png.flaticon.com/512/744/744928.png', 
    },
    {
      label: 'Dj',
      icon: 'https://cdn-icons-png.flaticon.com/512/744/744937.png', 
    },
  ];
  const scrollingItemsIconSponsor = [
    {
      label: 'ICONE SPONSOR',
      icon: null, 
    }
  ];

  return (
    <div style={responsiveStyle}>
      <Header leftItems={leftItems} rightItems={rightItems} logoSrc={logoSrc} />
      <main>
        <Hero />
        <ScrollingText
          text="Next Events"
          speed={28}
          direction="left"
          textColor="black"
          fontSize="2rem"
          backgroundColor="var(--title-color)"
        />
        <section id="about">
          <AboutUs items={items} />
        </section>
        <ScrollingText
          items={scrollingItems}
          speed={90}
          direction="left"
          textColor="black"
          fontSize="2rem"
          backgroundColor="var(--green-main)"
        />
        <section id="events">
          <NextEvents items={itemsNextEvents} />
        </section>
        
        
        <section id="joinus">
          <JoinUs />
        </section>
        <ScrollingText
          items={scrollingItemsIconSponsor}
          speed={28}
          direction="left"
          textColor="black"
          fontSize="2rem"
          backgroundColor="white"
        />
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
  );
}

export default App;