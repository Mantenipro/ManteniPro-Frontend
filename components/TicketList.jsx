import React, { useState } from 'react';
import TaskCard from './TaskCard'; // Import the TaskCard component
import TicketDetail from './TicketDetail'; // Import the TicketDetail component
import TicketClosed from './TicketClosed'; // Import the TicketClosed component

export default function TicketList({ tasksInProgress, tasksCompleted }) {
  const [activeTab, setActiveTab] = useState('inProgress'); // State to toggle between the two sections
  const [selectedTask, setSelectedTask] = useState(null); // State to hold the selected task

  // Show tasks depending on active tab
  const tasksToDisplay = activeTab === 'inProgress' ? tasksInProgress : tasksCompleted;

  const handleCardClick = (task) => {
    setSelectedTask(task); // Set the selected task when a card is clicked
  };

  // Handle changing the tab and resetting selectedTask
  const handleTabChange = (tab) => {
    setActiveTab(tab); // Change the active tab
    setSelectedTask(null); // Reset the selected task when changing tabs
  };

  // Handle going back to the task list
  const handleBackClick = () => {
    setSelectedTask(null); // Clear the selected task to go back to the list
  };

  return (
    <div className="flex w-full h-[75vh] md:h-[80vh] p-4 overflow-hidden bg-white rounded-xl shadow-lg">
      {/* Task List Section */}
      {!selectedTask && ( // Hide task list when a task is selected
        <div className="flex flex-col w-full max-w-[400px] sm:max-w-[500px] flex-1">
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex flex-col mb-4">
              <div className="flex justify-between items-center">
                {/* En proceso button */}
                <button
                  onClick={() => handleTabChange('inProgress')}
                  className={`w-1/2 text-lg font-bold py-2 rounded-md ${activeTab === 'inProgress' ? 'bg-gray-300 text-gray-800' : 'text-gray-400'}`}
                >
                  En proceso
                </button>
                {/* Completadas button */}
                <button
                  onClick={() => handleTabChange('completed')}
                  className={`w-1/2 text-lg font-bold py-2 rounded-md ${activeTab === 'completed' ? 'bg-gray-300 text-gray-800' : 'text-gray-400'}`}
                >
                  Completadas
                </button>
              </div>
              {/* Línea separadora */}
              <div className="border-b border-gray-300 my-2" />
            </div>

            {/* Scrollable Task List */}
            <div className="relative w-full h-[65vh] md:h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {/* Task cards list */}
              <div className="flex flex-col space-y-5 mt-4">
                {tasksToDisplay.map((task, index) => (
                  <TaskCard
                    key={index}
                    picture={task.picture}
                    title={task.title}
                    idOrder={task.idOrder}
                    date={task.date}
                    onClick={() => handleCardClick(task)} // Add onClick handler to set the selected task
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Detail Section */}
      {selectedTask && (
        <div className="flex flex-col flex-1 max-w-full">
          {/* Back Button */}
          <button
            onClick={handleBackClick} // Handle back button click
            className="text-lg font-bold text-blue-500 mb-4 self-start"
          >
            &larr; Volver
          </button>

          {/* Check if the selected task is from the "Completadas" tab */}
          {activeTab === 'completed' ? (
            <TicketClosed task={selectedTask} /> // Show TicketClosed for completed tasks
          ) : (
            <TicketDetail task={selectedTask} /> // Show TicketDetail for tasks in progress
          )}
        </div>
      )}
    </div>
  );
}















