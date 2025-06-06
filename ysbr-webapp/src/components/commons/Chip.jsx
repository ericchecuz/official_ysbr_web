import React from 'react';
import styles from '../../styles/chip.module.css';

const Chip = ({ label, selected = false, onClick, className = '', color }) => {
  const chipClass = `${styles.chip} ${selected ? styles.selected : styles.default} ${className}`;
  
  // Stile personalizzato in base al colore fornito
  const customStyle = {};
  
  if (color && selected) {
    customStyle.backgroundColor = color;
    customStyle.borderColor = 'var(--title-color)';
  } else if (color && !selected) {
    // Versione più chiara del colore per lo stato non selezionato
    customStyle.backgroundColor = color;
    customStyle.opacity = 0.7;
    customStyle.borderColor = 'rgba(255, 255, 255, 0.5)';
  }
  
  return (
    <button onClick={onClick} className={chipClass} style={customStyle}>
      {label}
    </button>
  );
};

export default Chip;
