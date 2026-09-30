import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoMailOutline } from "react-icons/io5";
import { useLanguage } from "../context/LanguageContext";
import { useScrollLock } from "../hooks/useScrollLock";
import { overlayMotion, panelMotion } from "./commons/modalMotion";
import styles from "../styles/collab_modal.module.css";

function CollabModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useScrollLock(isOpen);

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
          {...overlayMotion}
          onClick={handleClose}
        >
          <motion.div
            className={styles.panel}
            {...panelMotion}
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
