import React from 'react';
import { FaLock } from 'react-icons/fa';
import styles from '../../styles/chip.module.css';

const Chip = ({ label, selected = false, onClick, className = '', color, disabled = false, title }) => {
  const stateClass = disabled ? styles.disabled : selected ? styles.selected : styles.default;
  const chipClass = `${styles.chip} ${stateClass} ${className}`;

  // Handle both simple color strings and color config objects
  const customStyle = {};

  // Una voce disabilitata resta grigia: i colori della categoria non si applicano
  if (color && !disabled) {
    if (typeof color === 'object') {
      // Color is a config object (like your YSBR config)
      if (selected) {
        customStyle.backgroundColor = color.selectedBg;
        customStyle.borderColor = color.selectedBorder;
        customStyle.color = color.selectedText;
      } else {
        customStyle.backgroundColor = color.defaultBg;
        customStyle.borderColor = color.defaultBorder;
        customStyle.color = color.defaultText;
      }
    } else {
      // Color is a simple string (like your other chips)
      if (selected) {
        customStyle.backgroundColor = color;
        customStyle.borderColor = color;
        customStyle.color = '#ffffff';
      } else {
        customStyle.backgroundColor = 'transparent';
        customStyle.borderColor = color;
        customStyle.color = color;
      }
    }
  }

  // Handle hover effects for color objects
  const handleMouseEnter = (e) => {
    if (!disabled && color && typeof color === 'object' && !selected) {
      e.currentTarget.style.backgroundColor = color.hoverBg;
      e.currentTarget.style.color = color.hoverText;
    }
  };

  const handleMouseLeave = (e) => {
    if (!disabled && color && typeof color === 'object' && !selected) {
      e.currentTarget.style.backgroundColor = color.defaultBg;
      e.currentTarget.style.color = color.defaultText;
    }
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      title={title}
      className={chipClass}
      style={customStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
      {disabled && <FaLock className={styles.lockIcon} />}
    </button>
  );
};

export default Chip;
