import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store.js'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
			<Toaster position="top-center"></Toaster>
		</PersistGate>
	</Provider>
)
