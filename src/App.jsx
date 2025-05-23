import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ApperIcon from './components/ApperIcon'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-surface-900' : 'bg-gradient-to-br from-surface-50 via-white to-primary-50'
    }`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-surface-800/70 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-500 to-accent rounded-xl flex items-center justify-center shadow-lg">
                <ApperIcon name="CheckSquare" className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">
                TaskMaster
              </h1>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 md:p-3 rounded-xl bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-all duration-200 shadow-soft text-surface-700 dark:text-surface-200"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="w-5 h-5 md:w-6 md:h-6 text-surface-700 dark:text-surface-200" 
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="text-sm"
        toastClassName="backdrop-blur-lg"
      />
    </div>
  )
}

export default App