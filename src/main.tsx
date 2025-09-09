import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Thai from './component/Thai.tsx'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <Thai />
  </StrictMode>,
)
