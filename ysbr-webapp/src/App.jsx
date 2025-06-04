import Header from './components/Header';
import Hero from './components/Hero';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import Partners from './components/Partners';
import JoinUs from './components/JoinUs';
import Footer from './components/Footer';
import ScrollingText from './components/ScrollingText';
import NextEvents from './components/NextEvents';
import logoImage from './assets/ysbr-logo.png'; // Adjust path as needed

import eventImage1 from './assets/Events_Carousel-image_1.png';
import eventImage2 from './assets/Events_Carousel-image_2.png';
import labels from './labels.json';


function App() {
  const responsiveStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const leftItems = [
    { label: labels.header.navigation.aboutUs, href: '#about' },
    { label: labels.header.navigation.events, href: '#events' },
  ];

  const rightItems = [
    { label: labels.header.shop, href: '#shop', type: 'link' },
    { label: labels.header.tesserati, href: '#joinus', type: 'button', class: 'joinButton' }, 
  ];

  const logoSrc = logoImage;
  const itemsNextEvents = [
    {
      id: 1,
      title: 'YSBR',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      image: eventImage1,
      url: 'https://instagram.com/ysbr_official/',
    },
    {
      id: 2,
      title: 'SPORT',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      image: eventImage2,
      url: 'https://instagram.com/ysbr_official/',
    },
  ];

  const items = [
    {
      title: 'YSBR',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      image: 'https://via.placeholder.com/600x300',
      category: 'YSBR',
    },
    {
      title: 'SPORT',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      image: 'https://via.placeholder.com/600x300',
      category: 'SPORT',
    },
    {
      title: 'MUSIC',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      image: 'https://via.placeholder.com/600x300',
      category: 'MUSIC',
    },
    {
      title: 'NATURE',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
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
  // const scrollingItemsIconSponsor = [
  //   {
  //     label: 'ICONE SPONSOR',
  //     icon: null, 
  //   }
  // ];

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
        <section id ="partners">
          <Partners />
          </section>
     
        <section id="joinus" >
          <JoinUs />
        </section>
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