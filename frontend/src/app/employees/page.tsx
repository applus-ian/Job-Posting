'use client';

import React from 'react';
import EmployeeList from '@/components/employees/EmployeeList';

// Page component to display employee data from external API
const EmployeesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 px-4">Employee Directory</h1>
        <div className="bg-white rounded-lg shadow-md">
          <EmployeeList />
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage; 