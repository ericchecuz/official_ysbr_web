import Header from './Header';
import Footer from './Footer';
import logoImage from '../assets/ysbr-logo.png';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_URL = "https://wa.me/393421545885";

const layoutStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  minHeight: '100vh',
};

// Cornice comune a tutte le pagine del sito: menu in alto, footer in fondo.
// Le voci di menu puntano alle sezioni della home: dalle altre pagine
// l'header ci torna da solo (vedi handleSmoothScroll in Header.jsx).
function SiteLayout({ children }) {
  const { t } = useLanguage();

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

  return (
    <div style={layoutStyle}>
      <Header leftItems={leftItems} rightItems={rightItems} logoSrc={logoImage} />
      <main>{children}</main>
      <Footer
        logoSrc={logoImage}
        address="YESBRO ASD - Via Carlo Cicogna Mozzoni 7, 20161 Milano (MI)"
        piva="P.IVA 13630240961 - C.F. 97970190159"
        statuteLink="https://drive.google.com/file/d/1HyP37VaJhP5icf5Lhzn9VnSTPaMV18nV/view?usp=drivesdk"
        instagramUrl="https://instagram.com/ysbrfam/"
        whatsappUrl={WHATSAPP_URL}
      />
    </div>
  );
}

export default SiteLayout;
