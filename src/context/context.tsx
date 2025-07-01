import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import NotificationService from "../services/NotificationService"
import type { Notification, NotificationFilter } from "../types/types"

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  filter: NotificationFilter
}

type NotificationAction =
  | { type: "SET_NOTIFICATIONS"; payload: Notification[] }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "DELETE_NOTIFICATION"; payload: string }
  | { type: "SET_FILTER"; payload: NotificationFilter }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_ALL" }

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  filter: {},
}

const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case "SET_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter((n) => !n.isRead).length,
      }
    case "ADD_NOTIFICATION":
      const newNotifications = [action.payload, ...state.notifications]
      return {
        ...state,
        notifications: newNotifications,
        unreadCount: newNotifications.filter((n) => !n.isRead).length,
      }
    case "MARK_AS_READ":
      const updatedNotifications = state.notifications.map((n) =>
        n.id === action.payload ? { ...n, isRead: true } : n,
      )
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter((n) => !n.isRead).length,
      }
    case "DELETE_NOTIFICATION":
      const filteredNotifications = state.notifications.filter((n) => n.id !== action.payload)
      return {
        ...state,
        notifications: filteredNotifications,
        unreadCount: filteredNotifications.filter((n) => !n.isRead).length,
      }
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    case "CLEAR_ALL":
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
      }
    default:
      return state
  }
}

interface NotificationContextType {
  state: NotificationState
  simulateNotification: () => void
  markAsRead: (id: string) => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
  setFilter: (filter: NotificationFilter) => void
  getFilteredNotifications: () => Notification[]
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)
  const notificationService = NotificationService.getInstance()

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notifications) => {
      dispatch({ type: "SET_NOTIFICATIONS", payload: notifications })
    })

    dispatch({ type: "SET_NOTIFICATIONS", payload: notificationService.getNotifications() })

    return unsubscribe
  }, [notificationService])

  const simulateNotification = () => {
    notificationService.simulateIncomingNotification()
  }

  const markAsRead = (id: string) => {
    notificationService.markAsRead(id)
    dispatch({ type: "MARK_AS_READ", payload: id })
  }

  const deleteNotification = (id: string) => {
    notificationService.deleteNotification(id)
    dispatch({ type: "DELETE_NOTIFICATION", payload: id })
  }

  const clearAllNotifications = () => {
    notificationService.clearAllNotifications()
    dispatch({ type: "CLEAR_ALL" })
  }

  const setFilter = (filter: NotificationFilter) => {
    dispatch({ type: "SET_FILTER", payload: filter })
  }

  const getFilteredNotifications = (): Notification[] => {
    return notificationService.getNotifications(state.filter)
  }

  const value: NotificationContextType = {
    state,
    simulateNotification,
    markAsRead,
    deleteNotification,
    clearAllNotifications,
    setFilter,
    getFilteredNotifications,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}