import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store from './redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


const persistor = persistStore(store);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        
      </PersistGate>
    </Provider>

    <Toaster

      position="top-center"
      richColors
      toastOptions={{
        // default for all toasts
        className: "text-gray-900 text-base font-medium ",

        // success toasts
        success: {
          className: "text-green-700 text-lg font-semibold",
        },

        // error toasts
        error: {
          className: "text-red-700 text-lg font-semibold",
        },

        // info toasts
        info: {
          className: "text-blue-700 text-lg font-semibold",
        },

        // warning toasts
        warning: {
          className: "text-yellow-700 text-lg font-semibold",
        },
      }}
    />
  </StrictMode >
)
