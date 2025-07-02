import React from 'react';
import { FlatList } from 'react-native';
import NotificationService from '../../services/NotificationService';
import { type Notification, type NotificationFilter, NotificationCategory, NotificationPriority } from '../../types/types';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../types/navigation';
import {
  Container,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
} from './NotificationList.styles';
import { getCategoryIcon } from '../../utils/notificationIcons';
import Header from './Header/Header';
import Filters from './Filters/Filters';
import NotificationItem from './NotificationItem/NotificationItem';

const CATEGORIES = Object.values(NotificationCategory);
const PRIORITIES = Object.values(NotificationPriority);

interface NotificationListProps {
  filter?: NotificationFilter;
}

const NotificationList: React.FC<NotificationListProps> = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filter, setFilter] = React.useState<NotificationFilter>({});
  const notificationService = NotificationService.getInstance();
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, 'NotificationList'>
    >();

  React.useEffect(() => {
    const unsubscribe = notificationService.subscribe(updatedNotifications => {
      setNotifications(updatedNotifications);
    });
    setNotifications(notificationService.getNotifications());
    return unsubscribe;
  }, [notificationService]);

  const handleSimulateNotification = () => {
    notificationService.simulateIncomingNotification();
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilter(prev => ({
      ...prev,
      [key as keyof NotificationFilter]: prev[key as keyof NotificationFilter] === value ? undefined : value,
    }));
  };

  const handleReadFilter = (isRead: boolean) => {
    setFilter(prev => ({
      ...prev,
      isRead: prev.isRead === isRead ? undefined : isRead,
    }));
  };

  const clearFilters = () => setFilter({});

  const filteredNotifications = notifications.filter(n => {
    if (filter.category && n.category !== filter.category) return false;
    if (filter.priority && n.priority !== filter.priority) return false;
    if (filter.isRead !== undefined && n.isRead !== filter.isRead) return false;
    return true;
  });

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.isRead) {
      notificationService.markAsRead(notification.id);
    }
    navigation.navigate('NotificationDetail', { notification });
  };

  const handleDeleteNotification = (id: string) => {
    notificationService.deleteNotification(id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#FF4444';
      case 'high':
        return '#FF8800';
      case 'normal':
        return '#2196F3';
      case 'low':
        return '#4CAF50';
      default:
        return '#666666';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (diffInHours < 1) {
      return 'Ahora';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderEmptyState = () => (
    <EmptyState>
      <EmptyStateIcon>📱</EmptyStateIcon>
      <EmptyStateTitle>No hay notificaciones</EmptyStateTitle>
      <EmptyStateText>
        {showFilters && Object.keys(filter).length > 0
          ? 'No se encontraron notificaciones con los filtros aplicados'
          : 'Las notificaciones aparecerán aquí cuando lleguen'}
      </EmptyStateText>
    </EmptyState>
  );

  return (
    <Container>
      <Header
        showFilters={showFilters}
        onSimulateNotification={handleSimulateNotification}
        onToggleFilters={() => setShowFilters(f => !f)}
        onClearFilters={clearFilters}
        hasActiveFilters={Object.keys(filter).length > 0}
        unreadCount={unreadCount}
      />
      {showFilters && (
        <Filters
          categories={CATEGORIES}
          priorities={PRIORITIES}
          filter={filter}
          onFilterChange={handleFilterChange}
          onReadFilter={handleReadFilter}
        />
      )}
      <FlatList
        data={filteredNotifications}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={handleNotificationPress}
            onDelete={handleDeleteNotification}
            getCategoryIcon={getCategoryIcon}
            getPriorityColor={getPriorityColor}
            formatTimestamp={formatTimestamp}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default NotificationList; 