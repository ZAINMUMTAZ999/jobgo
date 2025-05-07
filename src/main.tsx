import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {QueryClient,QueryClientProvider}  from "react-query";
import './index.css'
import {  AppNotifyProvider } from './context/AppNotify.tsx';
import { SearchContextProvider } from './context/SearchContext.tsx';
const client = new QueryClient(
  {
    defaultOptions:{
    mutations:{
        retry:0
      }
    }
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode >
    <QueryClientProvider  client={client}>
      <AppNotifyProvider>
<SearchContextProvider>

    <App />
</SearchContextProvider>
      </AppNotifyProvider>
    </QueryClientProvider>
  // </StrictMode>,
)
