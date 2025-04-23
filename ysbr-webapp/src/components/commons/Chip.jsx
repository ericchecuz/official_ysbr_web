import React from 'react';
import styles from '../../styles/chip.module.css';

const Chip = ({ label, selected = false, onClick, className = '' }) => {
  const chipClass = `${styles.chip} ${selected ? styles.selected : styles.default} ${className}`;
  return (
    <button onClick={onClick} className={chipClass}>
      {label}
    </button>
  );
};

export default Chip;
