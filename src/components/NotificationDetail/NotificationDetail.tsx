import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { Notification } from "../../types/types"
import { Container, Icon, Title, Body, Meta } from "./NotificationDetail.styles"
import { getCategoryIcon } from '../../utils/notificationIcons'

interface NotificationDetailRouteParams {
  notification: Notification
}

type NotificationDetailRouteProp = RouteProp<{
  NotificationDetail: NotificationDetailRouteParams
}, 'NotificationDetail'>

const NotificationDetail: React.FC = () => {
  const route = useRoute<NotificationDetailRouteProp>()
  const { notification } = route.params
  const date = new Date(notification.timestamp)

  return (
    <Container>
      <Icon>{getCategoryIcon(notification.category)}</Icon>
      <Title>{notification.title}</Title>
      <Body>{notification.body}</Body>
      <Meta>Prioridad: {notification.priority.toUpperCase()}</Meta>
      <Meta>Categoría: {notification.category}</Meta>
      <Meta>Fecha: {date.toLocaleString()}</Meta>
      {notification.data && (
        <Meta>Extra: {JSON.stringify(notification.data)}</Meta>
      )}
    </Container>
  )
}

export default NotificationDetail 