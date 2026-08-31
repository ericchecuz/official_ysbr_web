import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import JoinUs from './components/JoinUs';
import Footer from './components/Footer';
import NextEvents from './components/NextEvents';
import Courses from './components/Courses';
import logoImage from './assets/ysbr-logo.png';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

import slide1 from './assets/slide1.jpg';
import slide2 from './assets/slide2.jpg';
import slide3 from './assets/slide3.jpg';
import slide4 from './assets/slide4.jpg';

const CATEGORIES = ["FAM", "SPORT", "MUSICA", "NATURA"];
const CATEGORY_IMAGES = [slide1, slide2, slide3, slide4];

function AppContent() {
  const { t } = useLanguage();

  const responsiveStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const leftItems = [
    { label: t("header.aboutUs"), href: '#about' },
    { label: t("header.events"), href: '#events' },
    { label: t("header.courses"), href: '#courses' },
  ];

  const rightItems = [
    { label: t("header.projects"), href: '#projects', type: 'link', locked: true },
  //  { label: t("header.shop"), href: '#shop', type: 'link', locked: true },
    { label: t("header.joinButton"), href: '#joinus', type: 'button', class: 'joinButton' },
  ];

  const logoSrc = logoImage;

  const items = CATEGORIES.map((category, i) => ({
    title: t(`aboutUs.items.${category}.title`),
    description: t(`aboutUs.items.${category}.description`),
    image: CATEGORY_IMAGES[i],
    category,
  }));

  return (
    <div style={responsiveStyle}>
      <Header leftItems={leftItems} rightItems={rightItems} logoSrc={logoSrc} />
      <main>
        <Hero />
        <section id="about">
          <AboutUs items={items} />
        </section>
        <section id="joinus">
          <JoinUs />
        </section>
        <section id="events">
          <NextEvents />
        </section>
        <section id="courses">
          <Courses />
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

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
