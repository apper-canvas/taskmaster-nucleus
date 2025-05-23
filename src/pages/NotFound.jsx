import React from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-500 to-accent rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="AlertTriangle" className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-surface-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            The page you're looking for doesn't exist. Let's get you back to managing your tasks.
          </p>
        </div>
        
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent text-white font-medium rounded-xl hover:from-primary-600 hover:to-pink-600 transition-all duration-200 shadow-card hover:shadow-soft"
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound