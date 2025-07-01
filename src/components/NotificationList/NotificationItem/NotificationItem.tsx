import React from 'react';
import {
  NotificationItemContainer,
  NotificationHeader,
  NotificationMeta,
  CategoryIcon,
  NotificationInfo,
  NotificationTitle,
  NotificationTime,
  NotificationActions,
  PriorityBadge,
  PriorityText,
  DeleteButton,
  DeleteButtonText,
  NotificationBody,
  UnreadIndicator,
} from './NotificationItem.styles';
import { Notification } from '../../../types/types';

interface NotificationItemProps {
  item: Notification;
  onPress: (item: Notification) => void;
  onDelete: (id: string) => void;
  getCategoryIcon: (category: string) => string;
  getPriorityColor: (priority: string) => string;
  formatTimestamp: (timestamp: number) => string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  item,
  onPress,
  onDelete,
  getCategoryIcon,
  getPriorityColor,
  formatTimestamp,
}) => (
  <NotificationItemContainer
    unread={!item.isRead}
    onPress={() => onPress(item)}
  >
    <NotificationHeader>
      <NotificationMeta>
        <CategoryIcon>{getCategoryIcon(item.category)}</CategoryIcon>
        <NotificationInfo>
          <NotificationTitle unread={!item.isRead}>
            {item.title}
          </NotificationTitle>
          <NotificationTime>
            {formatTimestamp(item.timestamp)}
          </NotificationTime>
        </NotificationInfo>
      </NotificationMeta>
      <NotificationActions>
        <PriorityBadge color={getPriorityColor(item.priority)}>
          <PriorityText>{item.priority.toUpperCase()}</PriorityText>
        </PriorityBadge>
        <DeleteButton onPress={() => onDelete(item.id)}>
          <DeleteButtonText>🗑️</DeleteButtonText>
        </DeleteButton>
      </NotificationActions>
    </NotificationHeader>
    <NotificationBody unread={!item.isRead}>{item.body}</NotificationBody>
    {!item.isRead && <UnreadIndicator />}
  </NotificationItemContainer>
);

export default NotificationItem; 