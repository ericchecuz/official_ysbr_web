import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";
import styles from "../styles/privacy_modal.module.css";

function PrivacyModal({ isOpen, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (top) {
        window.scrollTo(0, parseInt(top, 10) * -1);
      }
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      if (top) {
        window.scrollTo(0, parseInt(top, 10) * -1);
      }
    };
  }, [isOpen]);

  const sections = t("privacy.sections");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
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
