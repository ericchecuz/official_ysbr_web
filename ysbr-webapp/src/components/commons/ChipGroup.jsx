import React from 'react';
import Chip from './Chip';
import styles from '../../styles/chip_group.module.css';

const ChipGroup = ({
  categories = [],
  categoryLabels,
  selectedCategory,
  onCategoryChange,
  categoryColors = {},
  disabledCategories = [],
  disabledTitle,
}) => {
  return (
    <div className={styles.container}>
      {categories.map((category, index) => {
        const disabled = disabledCategories.includes(category);

        return (
          <Chip
            key={category}
            label={categoryLabels ? categoryLabels[index] : category}
            selected={selectedCategory === index}
            onClick={() => onCategoryChange(index)}
            color={categoryColors[category]}
            disabled={disabled}
            title={disabled ? disabledTitle : undefined}
          />
        );
      })}
    </div>
  );
};

export default ChipGroup;
