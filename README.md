# MyNotificationsApp

Simulador de sistema de notificaciones push para React Native

---

## 🚀 ¿Qué es este proyecto?
Una app de ejemplo para un challenge técnico que simula la recepción, listado y detalle de notificaciones push, con distinción de leídas/no leídas, filtros, persistencia y arquitectura profesional.

---

## 📦 Requisitos previos
- Node.js >= 16
- Yarn o npm
- React Native CLI
- Xcode (para iOS)
- Android Studio (para Android)
- Una cuenta de Firebase (para pruebas reales de notificaciones)

---

## 🛠️ Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tuusuario/MyNotificationsApp.git
   cd MyNotificationsApp
   ```

2. **Instala las dependencias:**
   ```sh
   yarn install
   # o
   npm install
   ```

3. **Instala pods para iOS:**
   ```sh
   cd ios && pod install && cd ..
   ```

---

## 🔥 Configuración de Firebase (Obligatorio para notificaciones push)

Por seguridad, los archivos de configuración **NO están incluidos** en el repo.

### 1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)

### 2. Agrega una app Android y una iOS en Firebase

### 3. Descarga los archivos de configuración:
- **Android:** `google-services.json`
- **iOS:** `GoogleService-Info.plist`

### 4. Colócalos en las rutas correctas:
- `android/app/google-services.json`
- `ios/MyNotificationsApp/GoogleService-Info.plist`

> **Nota:** Si solo quieres probar la app sin notificaciones reales, puedes omitir este paso y usar la función de "Simular notificación" en la app.

---

## ▶️ ¿Cómo correr la app?

### **Android:**
```sh
yarn android
# o
npm run android
```

### **iOS:**
```sh
yarn ios
# o
npm run ios
```

---

## 🧪 Funcionalidades principales
- Recepción de notificaciones (push y simuladas)
- Listado y detalle de notificaciones
- Filtros por categoría, prioridad y estado
- Distinción leídas/no leídas
- Persistencia local
- Arquitectura modular y profesional

---

## 🛡️ Seguridad
- **No subas tus archivos de configuración de Firebase a repos públicos.**
- `.gitignore` ya está configurado para protegerlos.
- No hay logs de tokens ni datos sensibles en el código.

---

## 📝 Notas
- Si tienes problemas con dependencias nativas, prueba limpiar el proyecto:
  ```sh
  cd android && ./gradlew clean && cd ..
  cd ios && pod install --repo-update && cd ..
  ```
- Si tienes dudas, revisa la documentación oficial de [React Native](https://reactnative.dev/) y [React Native Firebase](https://rnfirebase.io/).

---

¡Éxitos y gracias por revisar el proyecto! 🚀
