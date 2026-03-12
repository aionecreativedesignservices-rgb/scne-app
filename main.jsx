import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './app/router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="min-h-screen flex justify-center bg-black">
  <div className="
      w-full max-w-md min-h-screen relative text-white
      bg-gradient-to-b from-[#050508] via-[#07070C] to-[#050508]
      border border-white/10
      shadow-2xl
  ">
    <AppRouter />
  </div>
</div>
    </BrowserRouter>
  </React.StrictMode>,
)