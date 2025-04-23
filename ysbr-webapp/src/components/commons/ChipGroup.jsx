import React from 'react';
import Chip from './Chip';
import styles from '../../styles/chip_group.module.css';

const ChipGroup = ({ categories = [], selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.container}>
      {categories.map((category, index) => (
        <Chip
          key={category}
          label={category}
          selected={selectedCategory === index}
          onClick={() => onCategoryChange(index)}
        />
      ))}
    </div>
  );
};

export default ChipGroup;
