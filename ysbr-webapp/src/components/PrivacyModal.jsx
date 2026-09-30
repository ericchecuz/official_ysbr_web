import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";
import { useScrollLock } from "../hooks/useScrollLock";
import { overlayMotion, panelMotion } from "./commons/modalMotion";
import styles from "../styles/privacy_modal.module.css";

function PrivacyModal({ isOpen, onClose }) {
  const { t } = useLanguage();

  useScrollLock(isOpen);

  const sections = t("privacy.sections");

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
              <h2 className={styles.modalTitle}>{t("privacy.title")}</h2>
              <button
                className={styles.closeBtn}
                onClick={onClose}
                aria-label={t("eventsModal.closeLabel")}
              >
                <IoClose size="1.4rem" />
              </button>
            </div>

            <div className={styles.scrollContent}>
              <p className={styles.lastUpdate}>{t("privacy.lastUpdate")}</p>
              {sections.map((section, i) => (
                <div key={i} className={styles.section}>
                  <h3 className={styles.sectionTitle}>{section.title}</h3>
                  <p className={styles.sectionBody}>{section.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PrivacyModal;
