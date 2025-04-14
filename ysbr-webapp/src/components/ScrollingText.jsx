import React from 'react';
import styles from '../styles/scrolling_text.module.css';
import PropTypes from 'prop-types';

const ScrollingText = ({
  text = "Next Events", 
  speed = 20, 
  direction = "left", 
  textColor = "#333", 
  fontSize = "1.5rem", 
  backgroundColor = "#f0f0f0", 
}) => {
  // direzione animazione
  const animationDirection = direction === "right" ? "scrollRight" : "scrollLeft";

    return (
        <section className={styles.section_scrolling_text}>
    <div
      className={styles.scrollContainer}
      style={{ backgroundColor }}
    >
      <div
        className={`${styles.scrollText} ${styles[animationDirection]}`}
        style={{
          animationDuration: `${speed}s`,
          color: textColor,
          fontSize,
        }}
      >
        <span>{text}&nbsp;</span>
                    <span>{text}&nbsp;</span>
                     <span>{text}&nbsp;</span>
                    <span>{text}&nbsp;</span>
                     <span>{text}&nbsp;</span>
                    <span>{text}&nbsp;</span>
                     <span>{text}&nbsp;</span>
                    <span>{text}&nbsp;</span>
                     <span>{text}&nbsp;</span>
                    <span>{text}&nbsp;</span>
                     <span>{text}&nbsp;</span>
                    <span>{text}&nbsp;</span>
                     <span>{text}&nbsp;</span>
                    <span>{text}&nbsp;</span>
                     <span>{text}&nbsp;</span>
        <span>{text}&nbsp;</span>
      </div>
            </div>
    </section>
  );
};

ScrollingText.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['left', 'right']),
  textColor: PropTypes.string,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default ScrollingText;