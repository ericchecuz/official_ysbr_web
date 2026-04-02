import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoMailOutline } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";
import styles from "../styles/collab_modal.module.css";

function CollabModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  const handleClose = () => {
    onClose();
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSend = () => {
    const subject = encodeURIComponent("Collaborazione YSBR");
    const body = encodeURIComponent(
      `${t("collab.emailName")}: ${name}\n${t("collab.emailFrom")}: ${email}\n\n${message}`
    );
    window.open(`mailto:ysbrstaff@gmail.com?subject=${subject}&body=${body}`, "_self");
    handleClose();
  };

  const canSend = name.trim() && email.trim() && message.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={handleClose}
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
              <h2 className={styles.modalTitle}>{t("collab.title")}</h2>
              <button
                className={styles.closeBtn}
                onClick={handleClose}
                aria-label="Close"
              >
                <IoClose size="1.4rem" />
              </button>
            </div>

            <div className={styles.scrollContent}>
              <p className={styles.intro}>{t("collab.intro")}</p>

              <div className={styles.form}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder={t("collab.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className={styles.input}
                  placeholder={t("collab.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  className={styles.textarea}
                  placeholder={t("collab.messagePlaceholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <button
                  className={styles.sendBtn}
                  onClick={handleSend}
                  disabled={!canSend}
                >
                  <IoMailOutline style={{ marginRight: "0.5rem" }} />
                  {t("collab.send")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CollabModal;
