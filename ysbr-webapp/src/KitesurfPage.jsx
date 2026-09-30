import { motion, MotionConfig } from 'framer-motion';
import SiteLayout from './components/SiteLayout';
import PriceList from './components/PriceList';
import BookingBand from './components/BookingBand';
import FaqItem from './components/FaqItem';
import TravelingVan from './components/TravelingVan';
import RollingNumber from './components/commons/RollingNumber';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { useSectionUrl } from './hooks/useSectionUrl';
import { scrollToSection } from './utils/sections';
import { MEMBERS_COUNT } from './data/stats';
import styles from './styles/kitesurf_page.module.css';

import kiteRide from './assets/kitesurf/kite-ride.jpg';
import kiteAir from './assets/kitesurf/kite-air.jpg';
import kiteCarve from './assets/kitesurf/kite-carve.jpg';
import kiteBeach from './assets/kitesurf/kite-beach.jpg';
import famBeach from './assets/kitesurf/fam-beach.jpg';

// Sezioni raggiungibili con un link diretto, es. www.ysbr.it/kitesurf/#prezzi
const SECTION_IDS = ['storia', 'come-funziona', 'prezzi', 'faq'];

// Le didascalie (alt) sono nelle traduzioni, nello stesso ordine
const GALLERY = [kiteRide, kiteAir, kiteCarve];

/*
 * Un'unica entrata di tutta la pagina al caricamento: dissolvenza e leggera
 * salita, come i modali del sito. Niente comparse sezione per sezione durante
 * lo scroll, che nel resto del sito non ci sono.
 * La salita è solo sul contenuto: una trasformazione sul contenitore
 * dell'header fisso lo farebbe scorrere via con la pagina.
 */
const ENTRANCE = { duration: 0.6, ease: 'easeOut' };
const PageFade = motion.div;
const ContentRise = motion.div;

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

// Pagina dedicata ai corsi di kitesurf (www.ysbr.it/kitesurf/): ha un indirizzo
// suo, così può comparire da sola nelle ricerche ed essere il link della
// scheda Google della scuola.
function KitesurfContent() {
  const { t } = useLanguage();
  useSectionUrl(SECTION_IDS);

  const text = (key) => t(`kitesurfPage.${key}`);
  const list = (key) => toArray(text(key));
  const galleryAlts = list('gallery');
  const priceSections = toArray(t('courses.items.KITE.priceSections'));

  // Link interni alla pagina: stesso scorrimento morbido del menu, che tiene
  // conto dell'header fisso
  const goTo = (id) => (e) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    // "user": chi ha chiesto meno animazioni nel sistema vede solo la dissolvenza
    <MotionConfig reducedMotion="user">
      <PageFade initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={ENTRANCE}>
        <SiteLayout>
          <ContentRise initial={{ y: 40 }} animate={{ y: 0 }} transition={ENTRANCE}>
            {/* ===== Apertura ===== */}
            <section className={styles.hero}>
              <span className={styles.kicker}>{text('kicker')}</span>
              <h1 className={styles.title}>{text('title')}</h1>
              <p className={styles.subtitle}>{text('subtitle')}</p>
              <p className={styles.lead}>{text('lead')}</p>

              <ul className={styles.highlights}>
                {list('highlights').map((highlight) => (
                  <li key={highlight} className={styles.highlight}>
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className={styles.actions}>
                <a href="#prezzi" className={styles.buttonPrimary} onClick={goTo('prezzi')}>
                  {text('ctaPrices')}
                </a>
                <a
                  href="#come-funziona"
                  className={styles.buttonSecondary}
                  onClick={goTo('come-funziona')}
                >
                  {text('ctaSteps')}
                </a>
              </div>

              <div className={styles.gallery}>
                {GALLERY.map((photo, i) => (
                  <img
                    key={photo}
                    src={photo}
                    alt={galleryAlts[i] ?? ''}
                    className={styles.photo}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ))}
              </div>
            </section>

            {/* ===== Storia e istruttore ===== */}
            <section id="storia" className={styles.story}>
              <div className={styles.storyGrid}>
                <img
                  src={kiteBeach}
                  alt={text('storyImageAlt')}
                  className={`${styles.photo} ${styles.storyPhoto}`}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h2 className={styles.blockTitle}>{text('storyTitle')}</h2>
                  {list('story').map((paragraph) => (
                    <p key={paragraph} className={styles.body}>
                      {paragraph}
                    </p>
                  ))}
                  <blockquote className={styles.quote}>{text('storyQuote')}</blockquote>
                  {list('storyOutro').map((paragraph) => (
                    <p key={paragraph} className={styles.body}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <h2 className={styles.sectionTitle}>{text('peopleTitle')}</h2>
              <div className={styles.people}>
                {list('people').map((person) => (
                  <article key={person.name} className={styles.person}>
                    <span className={styles.personRole}>{person.role}</span>
                    <h3 className={styles.personName}>{person.name}</h3>
                    <span className={styles.personFact}>{person.fact}</span>
                    <p className={styles.personBio}>{person.bio}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* ===== Come funziona ===== */}
            <section id="come-funziona" className={styles.steps}>
              <h2 className={styles.sectionTitle}>{text('stepsTitle')}</h2>
              <p className={styles.sectionIntro}>{text('stepsIntro')}</p>
              <ol className={styles.stepList}>
                {list('steps').map((step, i) => (
                  <li key={step.title} className={styles.step}>
                    <span className={styles.stepNumber} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* ===== Listino: qui c'è spazio per affiancare i riquadri ===== */}
            <section id="prezzi" className={styles.prices}>
              <h2 className={styles.sectionTitle}>{text('pricesTitle')}</h2>
              <div className={styles.pricesInner}>
                <PriceList sections={priceSections} layout="row" />
                <BookingBand />
              </div>
            </section>

            {/* ===== Comunità e sogno ===== */}
            <section className={styles.community}>
              <div className={styles.communityGrid}>
                <div>
                  <h2 className={styles.blockTitle}>{text('communityTitle')}</h2>
                  <p className={styles.body}>{text('community')}</p>
                  <div className={styles.members}>
                    <RollingNumber value={MEMBERS_COUNT} className={styles.membersNumber} />
                    <span className={styles.membersLabel}>{t('joinUs.membersLabel')}</span>
                  </div>
                </div>
                <img
                  src={famBeach}
                  alt={text('communityImageAlt')}
                  className={`${styles.photo} ${styles.communityPhoto}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className={styles.dream}>
                <span className={styles.dreamKicker}>{text('dreamKicker')}</span>
                <h3 className={styles.dreamTitle}>{text('dreamTitle')}</h3>
                <p className={styles.dreamText}>{text('dreamText')}</p>
                <TravelingVan />
              </div>
            </section>

            {/* ===== Domande frequenti e chiusura ===== */}
            <section id="faq" className={styles.faq}>
              <h2 className={styles.sectionTitle}>{text('faqTitle')}</h2>
              <div className={styles.faqList}>
                {list('faq').map((item) => (
                  <FaqItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>

              <div className={styles.finale}>
                <p className={styles.closing}>{text('closing')}</p>
                <BookingBand />
              </div>
            </section>
          </ContentRise>
        </SiteLayout>
      </PageFade>
    </MotionConfig>
  );
}

function KitesurfPage() {
  return (
    <LanguageProvider page="kitesurf">
      <KitesurfContent />
    </LanguageProvider>
  );
}

export default KitesurfPage;
