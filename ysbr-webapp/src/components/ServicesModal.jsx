import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";
import { useScrollLock } from "../hooks/useScrollLock";
import { overlayMotion, panelMotion } from "./commons/modalMotion";
import styles from "../styles/services_modal.module.css";

function ServicesModal({ isOpen, onClose, category }) {
  const { t } = useLanguage();

  useScrollLock(isOpen);

  if (!category) return null;

  const services = t(`services.${category}`) || [];
  const title = t(`services.titles.${category}`);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          {...overlayMotion}
          onClick={onClose}
        >
          <motion.div
            className={styles.panel}
            {...panelMotion}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{title}</h2>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <IoClose size="1.4rem" />
              </button>
            </div>

            <div className={styles.scrollContent}>
              <div className={styles.servicesList}>
                {services.map((service, i) => (
                  <div key={i} className={styles.serviceItem}>
                    <span className={styles.serviceDot} />
                    <span className={styles.serviceName}>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ServicesModal;
