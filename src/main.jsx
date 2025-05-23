import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App.jsx'
import './index.css'

// Simple tasks reducer for state management
const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'UPDATE_TASK':
      return state.map(task => 
        task.id === action.payload.id ? action.payload : task
      )
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload)
    case 'TOGGLE_COMPLETE':
      return state.map(task =>
        task.id === action.payload
          ? { ...task, status: task.status === 'completed' ? 'not_started' : 'completed' }
          : task
      )
    default:
      return state
  }
}

const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)