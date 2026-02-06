import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";


import { Toaster } from "sonner";
import { store } from './redux/store.ts';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster richColors position="top-center" />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);