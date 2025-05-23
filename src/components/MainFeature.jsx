import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format, isAfter, isBefore, addDays } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks)
  
  const [showForm, setShowForm] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium'
  })

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('deadline')

  const priorityColors = {
    low: 'from-priority-low to-green-600',
    medium: 'from-priority-medium to-orange-600', 
    high: 'from-priority-high to-red-600'
  }

  const priorityIcons = {
    low: 'ArrowDown',
    medium: 'Minus',
    high: 'ArrowUp'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskForm.title.trim()) {
      toast.error("Task title is required")
      return
    }

    const newTask = {
      id: Date.now(),
      ...taskForm,
      createdAt: new Date().toISOString(),
      status: 'not_started',
      completionPercentage: 0
    }

    dispatch({ type: 'ADD_TASK', payload: newTask })
    toast.success("Task created successfully!")
    
    setTaskForm({ title: '', description: '', deadline: '', priority: 'medium' })
    setShowForm(false)
  }

  const toggleTaskComplete = (taskId) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: taskId })
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      toast.success(task.status === 'completed' ? "Task marked as pending" : "Task completed!")
    }
  }

  const deleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId })
    toast.success("Task deleted successfully")
  }

  const getFilteredTasks = () => {
    let filtered = tasks
    
    if (filter === 'completed') {
      filtered = tasks.filter(task => task.status === 'completed')
    } else if (filter === 'pending') {
      filtered = tasks.filter(task => task.status !== 'completed')
    } else if (filter === 'overdue') {
      filtered = tasks.filter(task => 
        task.deadline && 
        isAfter(new Date(), new Date(task.deadline)) && 
        task.status !== 'completed'
      )
    }

    // Sort tasks
    return filtered.sort((a, b) => {
      if (sortBy === 'deadline') {
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return new Date(a.deadline) - new Date(b.deadline)
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }

  const getDashboardStats = () => {
    const completed = tasks.filter(task => task.status === 'completed').length
    const pending = tasks.filter(task => task.status !== 'completed').length
    const overdue = tasks.filter(task => 
      task.deadline && 
      isAfter(new Date(), new Date(task.deadline)) && 
      task.status !== 'completed'
    ).length
    const upcoming = tasks.filter(task =>
      task.deadline &&
      isAfter(new Date(task.deadline), new Date()) &&
      isBefore(new Date(task.deadline), addDays(new Date(), 7)) &&
      task.status !== 'completed'
    ).length

    return { completed, pending, overdue, upcoming, total: tasks.length }
  }

  const stats = getDashboardStats()
  const filteredTasks = getFilteredTasks()

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-2">
            Task Management
          </h2>
          <p className="text-surface-600 dark:text-surface-300 text-sm md:text-base">
            Stay organized and boost your productivity
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary-500 to-accent text-white font-medium rounded-xl hover:from-primary-600 hover:to-pink-600 transition-all duration-200 shadow-card hover:shadow-soft group"
        >
          <ApperIcon name="Plus" className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
          Add Task
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8 border-b border-surface-200 dark:border-surface-700">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`px-4 md:px-6 py-2 md:py-3 font-medium rounded-t-lg transition-all duration-200 text-sm md:text-base ${
            activeView === 'dashboard'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:bg-primary-900/20'
              : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
          }`}
        >
          <ApperIcon name="BarChart3" className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveView('tasks')}
          className={`px-4 md:px-6 py-2 md:py-3 font-medium rounded-t-lg transition-all duration-200 text-sm md:text-base ${
            activeView === 'tasks'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50 dark:bg-primary-900/20'
              : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
          }`}
        >
          <ApperIcon name="CheckSquare" className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
          Tasks ({tasks.length})
        </button>
      </div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 md:p-6 shadow-card hover:shadow-soft transition-all duration-300">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <ApperIcon name="CheckCircle2" className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                <span className="text-xs md:text-sm text-surface-500 dark:text-surface-400 font-medium">COMPLETED</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">{stats.completed}</p>
            </div>

            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 md:p-6 shadow-card hover:shadow-soft transition-all duration-300">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <ApperIcon name="Clock" className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                <span className="text-xs md:text-sm text-surface-500 dark:text-surface-400 font-medium">PENDING</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">{stats.pending}</p>
            </div>

            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 md:p-6 shadow-card hover:shadow-soft transition-all duration-300">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <ApperIcon name="AlertTriangle" className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                <span className="text-xs md:text-sm text-surface-500 dark:text-surface-400 font-medium">OVERDUE</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">{stats.overdue}</p>
            </div>

            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 md:p-6 shadow-card hover:shadow-soft transition-all duration-300">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <ApperIcon name="Calendar" className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
                <span className="text-xs md:text-sm text-surface-500 dark:text-surface-400 font-medium">UPCOMING</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">{stats.upcoming}</p>
            </div>

            <div className="bg-white dark:bg-surface-800 rounded-2xl p-4 md:p-6 shadow-card hover:shadow-soft transition-all duration-300">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <ApperIcon name="List" className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                <span className="text-xs md:text-sm text-surface-500 dark:text-surface-400 font-medium">TOTAL</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">{stats.total}</p>
            </div>
          </div>

          {/* Progress Visualization */}
          <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 md:p-8 shadow-card mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-white mb-6">
              Progress Overview
            </h3>
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm md:text-base font-medium text-surface-700 dark:text-surface-300">Overall Completion</span>
                  <span className="text-sm md:text-base font-semibold text-primary-600">
                    {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-3 md:h-4">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-accent h-3 md:h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tasks View */}
      {activeView === 'tasks' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Filters and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'completed', 'overdue'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all duration-200 ${
                    filter === filterType
                      ? 'bg-primary-500 text-white shadow-card'
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-lg text-surface-900 dark:text-white text-sm md:text-base focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="priority">Sort by Priority</option>
              <option value="created">Sort by Created</option>
            </select>
          </div>

          {/* Tasks List */}
          <div className="space-y-4 md:space-y-6">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-surface-800 rounded-2xl p-4 md:p-6 shadow-card hover:shadow-soft transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex items-start gap-3 md:gap-4 flex-1">
                      <button
                        onClick={() => toggleTaskComplete(task.id)}
                        className={`mt-1 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          task.status === 'completed'
                            ? 'bg-green-500 border-green-500'
                            : 'border-surface-300 dark:border-surface-600 hover:border-primary-500'
                        }`}
                      >
                        {task.status === 'completed' && (
                          <ApperIcon name="Check" className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg md:text-xl font-semibold mb-2 ${
                          task.status === 'completed' 
                            ? 'text-surface-500 dark:text-surface-400 line-through' 
                            : 'text-surface-900 dark:text-white'
                        }`}>
                          {task.title}
                        </h3>
                        
                        {task.description && (
                          <p className="text-surface-600 dark:text-surface-300 mb-3 text-sm md:text-base">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm">
                          <div className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-gradient-to-r ${priorityColors[task.priority]} text-white font-medium`}>
                            <ApperIcon name={priorityIcons[task.priority]} className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            {task.priority.toUpperCase()}
                          </div>
                          
                          {task.deadline && (
                            <div className={`flex items-center gap-1 ${
                              isAfter(new Date(), new Date(task.deadline)) && task.status !== 'completed'
                                ? 'text-red-500'
                                : 'text-surface-500 dark:text-surface-400'
                            }`}>
                              <ApperIcon name="Calendar" className="w-3 h-3 md:w-4 md:h-4" />
                              {format(new Date(task.deadline), 'MMM dd, yyyy')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="self-start p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredTasks.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-surface-100 dark:bg-surface-700 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <ApperIcon name="CheckSquare" className="w-8 h-8 md:w-10 md:h-10 text-surface-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-surface-900 dark:text-white mb-2">
                  No tasks found
                </h3>
                <p className="text-surface-600 dark:text-surface-300 text-sm md:text-base">
                  {filter === 'all' ? "Create your first task to get started!" : `No ${filter} tasks at the moment.`}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Task Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-neu-light dark:shadow-neu-dark"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-surface-900 dark:text-white">
                  Create New Task
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-all duration-200"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl text-surface-900 dark:text-white placeholder-surface-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter task title..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl text-surface-900 dark:text-white placeholder-surface-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter task description..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={taskForm.deadline}
                      onChange={(e) => setTaskForm({...taskForm, deadline: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={taskForm.priority}
                      onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                      className="w-full px-4 py-3 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 text-surface-700 dark:text-surface-300 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 font-medium rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent text-white font-medium rounded-xl hover:from-primary-600 hover:to-pink-600 transition-all duration-200 shadow-card hover:shadow-soft flex items-center justify-center"
                  >
                    <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
                    Create Task
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature