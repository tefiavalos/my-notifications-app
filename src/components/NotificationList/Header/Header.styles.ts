import styled from 'styled-components/native';

export const HeaderRow = styled.View`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333333;
`;

export const ButtonRow = styled.View`
  flex-direction: row;
  gap: 8px;
  padding: 16px;
  flex-wrap: wrap;
`;

export const HeaderButton = styled.TouchableOpacity`
  background-color: #2196f3;
  padding: 8px 16px;
  border-radius: 6px;
  min-width: 120px;
`;

export const HeaderButtonText = styled.Text`
  color: #ffffff;
  font-weight: 600;
  text-align: center;
`;

export const HeaderButtonDanger = styled(HeaderButton)`
  background-color: #e53935;
`; 