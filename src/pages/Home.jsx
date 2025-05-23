import React from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-surface-900 dark:text-white mb-4 md:mb-6">
              Master Your{" "}
              <span className="bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">
                Tasks
              </span>
            </h2>
            <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto leading-relaxed">
              Organize, prioritize, and track your tasks with our intelligent task management system. 
              Set deadlines, manage priorities, and watch your productivity soar.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 md:p-8 shadow-card hover:shadow-soft transition-all duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="Clock" className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-surface-900 dark:text-white mb-2 md:mb-3">
                Smart Deadlines
              </h3>
              <p className="text-surface-600 dark:text-surface-300 text-sm md:text-base">
                Set and track deadlines with intelligent reminders to keep you on schedule.
              </p>
            </div>

            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 md:p-8 shadow-card hover:shadow-soft transition-all duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="Flag" className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-surface-900 dark:text-white mb-2 md:mb-3">
                Priority Levels
              </h3>
              <p className="text-surface-600 dark:text-surface-300 text-sm md:text-base">
                Organize tasks by priority levels - low, medium, and high for better focus.
              </p>
            </div>

            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 md:p-8 shadow-card hover:shadow-soft transition-all duration-300 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-accent to-pink-600 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <ApperIcon name="BarChart3" className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-surface-900 dark:text-white mb-2 md:mb-3">
                Progress Tracking
              </h3>
              <p className="text-surface-600 dark:text-surface-300 text-sm md:text-base">
                Visualize your progress with interactive dashboards and completion metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-surface-50 dark:bg-surface-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>
    </div>
  )
}

export default Home