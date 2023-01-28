import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CartingModal from 'components/CartingModal/CartingModal';
import TransActionModal from './components/CartingModal/TransActionModal';
import WalletModal from './components/CartingModal/WalletModal';
const persistor = persistStore(store);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CartingModal />
        <QueryClientProvider client={queryClient}>
          <TransActionModal />
          <WalletModal />
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
