import React from 'react';
import styles from '../../styles/chip.module.css';

const Chip = ({ label, selected = false, onClick, className = '', color }) => {
  const chipClass = `${styles.chip} ${selected ? styles.selected : styles.default} ${className}`;
  
  // Handle both simple color strings and color config objects
  const customStyle = {};
  
  if (color) {
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
    if (color && typeof color === 'object' && !selected) {
      e.target.style.backgroundColor = color.hoverBg;
      e.target.style.color = color.hoverText;
    }
  };
  
  const handleMouseLeave = (e) => {
    if (color && typeof color === 'object' && !selected) {
      e.target.style.backgroundColor = color.defaultBg;
      e.target.style.color = color.defaultText;
    }
  };
  
  return (
    <button 
      onClick={onClick} 
      className={chipClass} 
      style={customStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </button>
  );
};

export default Chip;