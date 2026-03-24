import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import JoinUs from './components/JoinUs';
import Footer from './components/Footer';
import NextEvents from './components/NextEvents';
import logoImage from './assets/ysbr-logo.png';
import labels from './labels.json';

import slide1 from './assets/slide1.jpg';
import slide2 from './assets/slide2.jpg';
import slide3 from './assets/slide3.jpg';
import slide4 from './assets/slide4.jpg';

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

  const items = [
    {
      title: "FAM",
      description: "YESBRO ASD (YSBR) è un'Associazione Sportiva Dilettantistica nata nel 2022. Uniamo sport non convenzionali, musica e natura in esperienze autentiche e inclusive. Dallo snowboard al kitesurf, dalla slackline all'animal flow: muoversi, scoprire e condividere è il nostro mantra. Una community aperta, sostenibile e consapevole. Fai spazio all'avventura. Entra nella Fam.",
      image: slide1,
      category: "FAM",
    },
    {
      title: "SPORT",
      description: "Per YSBR, lo sport non è performance, ma espressione personale e collettiva. Promuoviamo discipline outdoor e attività sportive come strumenti di aggregazione, crescita e libertà. Che sia sull'acqua, sulla terra o immersi nella natura, lo sport diventa un modo per conoscersi, superare limiti e condividere esperienze autentiche. Non importa il livello: conta l'attitudine. Partecipare, spingersi oltre, farlo insieme. Lo sport è il nostro linguaggio universale. È ciò che ci muove, sempre.",
      image: slide2,
      category: "SPORT",
    },
    {
      title: "MUSICA",
      description: "La musica è connessione, cultura, vibrazione e identità. Attraverso eventi, DJ set e progetti sonori, creiamo spazi in cui le persone possono incontrarsi, ballare e sentirsi parte di qualcosa di unico. YSBR supporta la scena underground e indipendente, valorizzando artisti, crew e realtà che condividono la nostra visione. Ogni evento è un'esperienza: suoni, energia e libertà che si fondono in un momento indimenticabile. La musica è il battito della nostra community e ciò che accende tutto il resto.",
      image: slide3,
      category: "MUSICA",
    },
    {
      title: "NATURA",
      description: "YSBR nasce e cresce con un legame profondo con l'ambiente, il mare, la montagna e gli spazi aperti. Crediamo in uno stile di vita attivo e consapevole, che rispetta il territorio e ne celebra la bellezza. Perchè per noi la natura è casa è parte fondamentale della nostra identità. È equilibrio, libertà e ispirazione. Le nostre attività outdoor sono un invito a rallentare, respirare e vivere esperienze autentiche, lontano dal rumore.",
      image: slide4,
      category: "NATURA",
    },
  ];

  return (
    <div style={responsiveStyle}>
      <Header leftItems={leftItems} rightItems={rightItems} logoSrc={logoSrc} />
      <main>
        <Hero />
        <section id="events">
          <NextEvents />
        </section>
        <section id="joinus">
          <JoinUs />
        </section>
        <section id="about">
          <AboutUs items={items} />
        </section>
      </main>
      <Footer
        logoSrc={logoSrc}
        address="YESBRO ASD - Via Carlo Cicogna Mozzoni 7, 20161 Milano (MI)"
        piva="P.IVA 13630240961 - C.F. 97970190159"
        statuteLink="https://drive.google.com/file/d/1HyP37VaJhP5icf5Lhzn9VnSTPaMV18nV/view?usp=drivesdk"
        instagramUrl="https://instagram.com/ysbrfam/"
        whatsappUrl="https://wa.me/393421545885"
      />
    </div>
  );
}

export default App;
