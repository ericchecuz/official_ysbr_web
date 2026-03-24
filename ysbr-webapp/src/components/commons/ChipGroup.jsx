import React from 'react';
import Chip from './Chip';
import styles from '../../styles/chip_group.module.css';

const ChipGroup = ({ categories = [], categoryLabels, selectedCategory, onCategoryChange, categoryColors = {} }) => {
  return (
    <div className={styles.container}>
      {categories.map((category, index) => (
        <Chip
          key={category}
          label={categoryLabels ? categoryLabels[index] : category}
          selected={selectedCategory === index}
          onClick={() => onCategoryChange(index)}
          color={categoryColors[category]}
        />
      ))}
    </div>
  );
};

export default ChipGroup;
