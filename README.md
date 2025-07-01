# MyNotificationsApp

## English

---

### 🚀 What is this project?
A sample app for a technical challenge that simulates receiving, listing, and viewing push notifications, with read/unread distinction, filters, persistence, and a professional modular architecture.

---

### 📦 Prerequisites
- Node.js >= 16
- Yarn or npm
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)
- A Firebase account (for real push notification tests)

---

### 🛠️ Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/youruser/MyNotificationsApp.git
   cd MyNotificationsApp
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   # or
   npm install
   ```

3. **Install pods for iOS:**
   ```sh
   cd ios && pod install && cd ..
   ```

---

### 🔥 Firebase Configuration (Required for push notifications)

For security reasons, configuration files are **NOT included** in the repo.

1. Create a project in [Firebase Console](https://console.firebase.google.com/)
2. Add an Android and an iOS app in Firebase
3. Download the configuration files:
   - **Android:** `google-services.json`
   - **iOS:** `GoogleService-Info.plist`
4. Place them in the correct paths:
   - `android/app/google-services.json`
   - `ios/MyNotificationsApp/GoogleService-Info.plist`

> **Note:** If you just want to test the app without real notifications, you can skip this step and use the "Simulate notification" button in the app.

---

### ▶️ How to run the app?

#### **Android:**
```sh
yarn android
# or
npm run android
```

#### **iOS:**
```sh
yarn ios
# or
npm run ios
```

---

### 🧪 Main Features
- Receive notifications (push and simulated)
- List and view notification details
- Filter by category, priority, and status
- Read/unread distinction
- Local persistence
- Modular and professional architecture

---

### 🛡️ Security
- **Do not upload your Firebase configuration files to public repos.**
- `.gitignore` is already set up to protect them.
- There are no logs of tokens or sensitive data in the code.

---

### 📝 Notes
- If you have issues with native dependencies, try cleaning the project:
  ```sh
  cd android && ./gradlew clean && cd ..
  cd ios && pod install --repo-update && cd ..
  ```
- If you have questions, check the official docs for [React Native](https://reactnative.dev/) and [React Native Firebase](https://rnfirebase.io/).

---

Good luck and thanks for checking out the project! 🚀

---

## Español Argentino

---

### 🚀 ¿Qué es este proyecto?
Una app de ejemplo para un challenge técnico que simula la recepción, listado y detalle de notificaciones push, con distinción de leídas/no leídas, filtros, persistencia y arquitectura profesional y modular.

---

### 📦 Requisitos previos
- Node.js >= 16
- Yarn o npm
- React Native CLI
- Xcode (para iOS)
- Android Studio (para Android)
- Una cuenta de Firebase (para pruebas reales de notificaciones)

---

### 🛠️ Instalación

1. **Cloná el repositorio:**
   ```sh
   git clone https://github.com/tuusuario/MyNotificationsApp.git
   cd MyNotificationsApp
   ```

2. **Instalá las dependencias:**
   ```sh
   yarn install
   # o
   npm install
   ```

3. **Instalá los pods para iOS:**
   ```sh
   cd ios && pod install && cd ..
   ```

---

### 🔥 Configuración de Firebase (Obligatorio para notificaciones push)

Por seguridad, los archivos de configuración **NO están incluidos** en el repo.

1. Creá un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Agregá una app Android y una iOS en Firebase
3. Descargá los archivos de configuración:
   - **Android:** `google-services.json`
   - **iOS:** `GoogleService-Info.plist`
4. Ponelos en las rutas correctas:
   - `android/app/google-services.json`
   - `ios/MyNotificationsApp/GoogleService-Info.plist`

> **Nota:** Si solo querés probar la app sin notificaciones reales, podés omitir este paso y usar la función de "Simular notificación" en la app.

---

### ▶️ ¿Cómo correr la app?

#### **Android:**
```sh
yarn android
# o
npm run android
```

#### **iOS:**
```sh
yarn ios
# o
npm run ios
```

---

### 🧪 Funcionalidades principales
- Recepción de notificaciones (push y simuladas)
- Listado y detalle de notificaciones
- Filtros por categoría, prioridad y estado
- Distinción leídas/no leídas
- Persistencia local
- Arquitectura modular y profesional

---

### 🛡️ Seguridad
- **No subas tus archivos de configuración de Firebase a repos públicos.**
- `.gitignore` ya está configurado para protegerlos.
- No hay logs de tokens ni datos sensibles en el código.

---

### 📝 Notas
- Si tenés problemas con dependencias nativas, probá limpiar el proyecto:
  ```sh
  cd android && ./gradlew clean && cd ..
  cd ios && pod install --repo-update && cd ..
  ```
- Si tenés dudas, revisá la documentación oficial de [React Native](https://reactnative.dev/) y [React Native Firebase](https://rnfirebase.io/).

---

¡Éxitos y gracias por revisar el proyecto! 🚀
