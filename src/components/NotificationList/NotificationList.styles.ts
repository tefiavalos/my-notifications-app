import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const NotificationItem = styled.TouchableOpacity<{ unread?: boolean }>`
  background-color: #ffffff;
  margin: 8px 16px;
  padding: 16px;
  border-radius: 8px;
  border-left-width: 4px;
  border-left-color: ${props => (props.unread ? '#2196f3' : '#e0e0e0')};
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const NotificationHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const NotificationMeta = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const CategoryIcon = styled.Text`
  font-size: 20px;
  margin-right: 12px;
`;

export const NotificationInfo = styled.View`
  flex: 1;
`;

export const NotificationTitle = styled.Text<{ unread?: boolean }>`
  font-size: 16px;
  font-weight: ${props => (props.unread ? 'bold' : '500')};
  color: #333333;
  margin-bottom: 4px;
`;

export const NotificationTime = styled.Text`
  font-size: 12px;
  color: #666666;
`;

export const NotificationActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const PriorityBadge = styled.View<{ color: string }>`
  background-color: ${props => props.color};
  padding: 4px 8px;
  border-radius: 4px;
`;

export const PriorityText = styled.Text`
  color: #ffffff;
  font-size: 10px;
  font-weight: bold;
`;

export const DeleteButton = styled.TouchableOpacity`
  padding: 4px;
`;

export const DeleteButtonText = styled.Text`
  font-size: 16px;
`;

export const NotificationBody = styled.Text<{ unread?: boolean }>`
  font-size: 14px;
  color: #666666;
  line-height: 20px;
  font-weight: ${props => (props.unread ? '500' : '400')};
`;

export const UnreadIndicator = styled.View`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 8px;
  height: 8px;
  background-color: #2196f3;
  border-radius: 4px;
`;

export const EmptyState = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const EmptyStateIcon = styled.Text`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const EmptyStateTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 8px;
  text-align: center;
`;

export const EmptyStateText = styled.Text`
  font-size: 14px;
  color: #666666;
  text-align: center;
  line-height: 20px;
`; 