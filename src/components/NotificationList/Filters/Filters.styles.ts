import styled from 'styled-components/native';

export const FilterPanel = styled.View`
  padding: 16px;
  margin-top: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const FilterRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

export const FilterLabel = styled.Text`
  font-weight: 600;
  color: #333333;
  margin-right: 8px;
  min-width: 80px;
`;

export const FilterOption = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${props => (props.selected ? '#2196f3' : '#e0e0e0')};
  padding: 6px 12px;
  border-radius: 4px;
  margin-right: 6px;
  margin-bottom: 4px;
`;

export const FilterOptionText = styled.Text<{ selected?: boolean }>`
  color: ${props => (props.selected ? '#ffffff' : '#333333')};
  font-size: 12px;
  font-weight: ${props => (props.selected ? '600' : '400')};
`; 