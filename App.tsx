import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import NotificationList from "./src/components/NotificationList/NotificationList"
import NotificationDetail from "./src/components/NotificationDetail/NotificationDetail"

const Stack = createStackNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NotificationList" component={NotificationList} options={{ title: "Notificaciones" }} />
        <Stack.Screen name="NotificationDetail" component={NotificationDetail} options={{ title: "Detalle" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
