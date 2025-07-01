import AsyncStorage from "@react-native-async-storage/async-storage"
import PushNotification from "react-native-push-notification"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import { Platform } from "react-native"
import { type Notification, NotificationCategory, NotificationPriority } from "../types/types"
import messaging from '@react-native-firebase/messaging'

class NotificationService {
  private static instance: NotificationService
  private notifications: Notification[] = []
  private listeners: ((notifications: Notification[]) => void)[] = []

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  constructor() {
    this.initializeFirebase()
    this.initializePushNotifications()
    this.loadNotifications()
  }

  private async initializeFirebase() {
    try {
      // Request permission for iOS
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission()
        if (__DEV__) {
          console.log('Authorization status:', authStatus)
        }
      }

      // Listen for token refresh
      messaging().onTokenRefresh((newToken: string) => {
        if (__DEV__) {
          console.log('FCM Token refreshed:', newToken)
        }
      })

      // Handle background messages
      messaging().setBackgroundMessageHandler(async () => {
      })

      // Handle foreground messages
      messaging().onMessage(async remoteMessage => {
        const notification: Notification = {
          id: remoteMessage.messageId || Date.now().toString(),
          title: remoteMessage.notification?.title || 'Nueva notificación',
          body: remoteMessage.notification?.body || '',
          category: NotificationCategory.INFO,
          priority: NotificationPriority.NORMAL,
          timestamp: Date.now(),
          isRead: false,
          data: remoteMessage.data
        }
        this.addNotification(notification)
        this.showPushNotification(notification)
      })
    } catch (error) {
      if (__DEV__) {
        console.error('Error initializing Firebase:', error)
      }
    }
  }

  private initializePushNotifications() {
    if (Platform.OS === "ios") {
      PushNotificationIOS.addEventListener("register", (pushToken: string) => {
        if (__DEV__) {
          console.log("iOS Push Token:", pushToken)
        }
      })

      PushNotificationIOS.addEventListener("notification", (notification) => {
        if (__DEV__) {
          console.log("iOS Notification received:", notification)
        }
        if (notification.getData().userInteraction) {
          this.handleNotificationTap(notification.getData())
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      })

      PushNotificationIOS.addEventListener("registrationError", (error) => {
        if (__DEV__) {
          console.error("iOS Registration Error:", error)
        }
      })

      // Request permissions for iOS
      PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
      }).then((permissions) => {
        if (__DEV__) {
          console.log("iOS Permissions:", permissions)
        }
      })
    }

    // Configuration
    PushNotification.configure({
      onNotification: (notification: any) => {
        if (__DEV__) {
          console.log("Notification received:", notification)
        }
        if (notification.userInteraction) {
          this.handleNotificationTap(notification)
        }
      },
      requestPermissions: Platform.OS === "android",
    })

    // Create notification channel for Android
    if (Platform.OS === "android") {
      PushNotification.createChannel(
        {
          channelId: "default-channel",
          channelName: "Default Channel",
          channelDescription: "Default notification channel",
          soundName: "default",
          importance: 4,
          vibrate: true,
        },
        (created: boolean) => {
          if (__DEV__) {
            console.log(`Android Channel created: ${created}`)
          }
        },
      )
    }
  }

  private async loadNotifications() {
    try {
      const stored = await AsyncStorage.getItem("notifications")
      if (stored) {
        this.notifications = JSON.parse(stored)
        this.notifyListeners()
      }
    } catch (error) {
      if (__DEV__) {
        console.error("Error loading notifications:", error)
      }
    }
  }

  private async saveNotifications() {
    try {
      await AsyncStorage.setItem("notifications", JSON.stringify(this.notifications))
    } catch (error) {
      if (__DEV__) {
        console.error("Error saving notifications:", error)
      }
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener([...this.notifications]))
  }

  private handleNotificationTap(notification: any) {
    if (notification.data?.id || notification.id) {
      this.markAsRead(notification.data?.id || notification.id)
    }
  }

  simulateIncomingNotification() {
    const mockNotifications = [
      {
        title: "Sistema de Seguridad",
        body: "Acceso no autorizado detectado en el servidor principal",
        category: NotificationCategory.SECURITY,
        priority: NotificationPriority.URGENT,
      },
      {
        title: "Actualización del Sistema",
        body: "Nueva versión disponible para descarga",
        category: NotificationCategory.INFO,
        priority: NotificationPriority.NORMAL,
      },
      {
        title: "Error de Conexión",
        body: "Fallo en la conexión con la base de datos",
        category: NotificationCategory.ERROR,
        priority: NotificationPriority.HIGH,
      },
      {
        title: "Backup Completado",
        body: "Respaldo de datos completado exitosamente",
        category: NotificationCategory.SUCCESS,
        priority: NotificationPriority.LOW,
      },
      {
        title: "Advertencia de Memoria",
        body: "Uso de memoria del servidor al 85%",
        category: NotificationCategory.WARNING,
        priority: NotificationPriority.HIGH,
      },
    ]

    const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)]

    const notification: Notification = {
      id: Date.now().toString(),
      title: randomNotification.title,
      body: randomNotification.body,
      category: randomNotification.category,
      priority: randomNotification.priority,
      timestamp: Date.now(),
      isRead: false,
      data: { source: "mock" },
    }

    this.addNotification(notification)
    this.showPushNotification(notification)
  }

  private showPushNotification(notification: Notification) {
    if (Platform.OS === "ios") {
      // iOS Local Notification
      PushNotificationIOS.addNotificationRequest({
        id: notification.id,
        title: notification.title,
        body: notification.body,
        sound: "default",
        badge: this.getUnreadCount() + 1,
        userInfo: { id: notification.id },
      })
    } else {
      // Android Local Notification
      PushNotification.localNotification({
        channelId: "default-channel",
        title: notification.title,
        message: notification.body,
        playSound: true,
        soundName: "default",
        userInfo: { id: notification.id },
        priority: this.getPriorityValue(notification.priority),
      })
    }
  }

  private getPriorityValue(priority: NotificationPriority): number {
    switch (priority) {
      case NotificationPriority.LOW:
        return 1
      case NotificationPriority.NORMAL:
        return 2
      case NotificationPriority.HIGH:
        return 3
      case NotificationPriority.URGENT:
        return 4
      default:
        return 2
    }
  }

  addNotification(notification: Notification) {
    this.notifications.unshift(notification)
    this.saveNotifications()
    this.notifyListeners()

    // Update iOS badge
    if (Platform.OS === "ios") {
      PushNotificationIOS.setApplicationIconBadgeNumber(this.getUnreadCount())
    }
  }

  markAsRead(id: string) {
    const notification = this.notifications.find((n) => n.id === id)
    if (notification && !notification.isRead) {
      notification.isRead = true
      this.saveNotifications()
      this.notifyListeners()

      // Update iOS badge
      if (Platform.OS === "ios") {
        PushNotificationIOS.setApplicationIconBadgeNumber(this.getUnreadCount())
      }
    }
  }

  markAllAsRead() {
    this.notifications.forEach((n) => (n.isRead = true))
    this.saveNotifications()
    this.notifyListeners()

    // Clear iOS badge
    if (Platform.OS === "ios") {
      PushNotificationIOS.setApplicationIconBadgeNumber(0)
    }
  }

  deleteNotification(id: string) {
    this.notifications = this.notifications.filter((n) => n.id !== id)
    this.saveNotifications()
    this.notifyListeners()

    // Update iOS badge
    if (Platform.OS === "ios") {
      PushNotificationIOS.setApplicationIconBadgeNumber(this.getUnreadCount())
    }
  }

  clearAllNotifications() {
    this.notifications = []
    this.saveNotifications()
    this.notifyListeners()

    // Clear iOS badge
    if (Platform.OS === "ios") {
      PushNotificationIOS.setApplicationIconBadgeNumber(0)
    }
  }

  getNotifications(filter?: any): Notification[] {
    let filtered = [...this.notifications]

    if (filter?.category) {
      filtered = filtered.filter((n) => n.category === filter.category)
    }

    if (filter?.isRead !== undefined) {
      filtered = filtered.filter((n) => n.isRead === filter.isRead)
    }

    if (filter?.priority) {
      filtered = filtered.filter((n) => n.priority === filter.priority)
    }

    return filtered.sort((a, b) => b.timestamp - a.timestamp)
  }

  getUnreadCount(): number {
    return this.notifications.filter((n) => !n.isRead).length
  }

  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  // Simulate a mock notification for testing without backend or Firebase.
  simulateMockNotification() {
    const notification: Notification = {
      id: Date.now().toString(),
      title: "Mock Notificación",
      body: "Esto es una notificación simulada (mock)",
      category: NotificationCategory.INFO,
      priority: NotificationPriority.NORMAL,
      timestamp: Date.now(),
      isRead: false,
      data: { source: "mock" },
    }
    this.showPushNotification(notification)
  }
}

export default NotificationService
