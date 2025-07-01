import React from 'react';
import { FilterPanel, FilterRow, FilterLabel, FilterOption, FilterOptionText } from './Filters.styles';

interface FiltersProps {
  categories: string[];
  priorities: string[];
  filter: any;
  onFilterChange: (key: string, value: any) => void;
  onReadFilter: (isRead: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  priorities,
  filter,
  onFilterChange,
  onReadFilter,
}) => (
  <FilterPanel>
    <FilterRow>
      <FilterLabel>Categoría:</FilterLabel>
      {categories.map(cat => (
        <FilterOption
          key={cat}
          selected={filter.category === cat}
          onPress={() => onFilterChange('category', cat)}
        >
          <FilterOptionText selected={filter.category === cat}>
            {cat}
          </FilterOptionText>
        </FilterOption>
      ))}
    </FilterRow>
    <FilterRow>
      <FilterLabel>Prioridad:</FilterLabel>
      {priorities.map(pri => (
        <FilterOption
          key={pri}
          selected={filter.priority === pri}
          onPress={() => onFilterChange('priority', pri)}
        >
          <FilterOptionText selected={filter.priority === pri}>
            {pri}
          </FilterOptionText>
        </FilterOption>
      ))}
    </FilterRow>
    <FilterRow>
      <FilterLabel>Estado:</FilterLabel>
      <FilterOption
        selected={filter.isRead === false}
        onPress={() => onReadFilter(false)}
      >
        <FilterOptionText selected={filter.isRead === false}>
          No leídas
        </FilterOptionText>
      </FilterOption>
      <FilterOption
        selected={filter.isRead === true}
        onPress={() => onReadFilter(true)}
      >
        <FilterOptionText selected={filter.isRead === true}>
          Leídas
        </FilterOptionText>
      </FilterOption>
    </FilterRow>
  </FilterPanel>
);

export default Filters; 