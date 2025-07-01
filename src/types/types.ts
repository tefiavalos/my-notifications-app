export interface Notification {
    id: string
    title: string
    body: string
    category: NotificationCategory
    timestamp: number
    isRead: boolean
    priority: NotificationPriority
    data?: Record<string, any>
  }
  
  export enum NotificationCategory {
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
    SUCCESS = "success",
    SECURITY = "security",
    SYSTEM = "system",
  }
  
  export enum NotificationPriority {
    LOW = "low",
    NORMAL = "normal",
    HIGH = "high",
    URGENT = "urgent",
  }
  
  export interface NotificationFilter {
    category?: NotificationCategory
    isRead?: boolean
    priority?: NotificationPriority
  }
  