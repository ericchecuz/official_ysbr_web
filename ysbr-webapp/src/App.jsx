import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import JoinUs from './components/JoinUs';
import NextEvents from './components/NextEvents';
import Courses from './components/Courses';
import SiteLayout from './components/SiteLayout';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { useSectionUrl } from './hooks/useSectionUrl';

import slide1 from './assets/slide1.jpg';
import slide2 from './assets/slide2.jpg';
import slide3 from './assets/slide3.jpg';
import slide4 from './assets/slide4.jpg';

const CATEGORIES = ["FAM", "SPORT", "MUSICA", "NATURA"];
const CATEGORY_IMAGES = [slide1, slide2, slide3, slide4];

function AppContent() {
  const { t } = useLanguage();

  // Link diretti alle sezioni (ysbr.it/#courses) e hash sempre aggiornato
  useSectionUrl();

  const items = CATEGORIES.map((category, i) => ({
    title: t(`aboutUs.items.${category}.title`),
    description: t(`aboutUs.items.${category}.description`),
    image: CATEGORY_IMAGES[i],
    category,
  }));

  return (
    <SiteLayout>
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
    </SiteLayout>
  );
}

function App() {
  return (
    <LanguageProvider page="home">
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
