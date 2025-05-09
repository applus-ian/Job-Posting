import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define types for our employee data structure
interface Address {
  full_address: string;
  street: string;
  barangay: string;
  city_or_municipality: string;
  province: string;
  region: string;
}

interface Contact {
  email: string;
  phone_number: string;
  emergency_contact1: string;
  emergency_contact2: string;
}

interface JobPosition {
  id: number;
  title: string;
}

interface EmploymentType {
  id: number;
  name: string;
}

interface Employment {
  job_position: JobPosition;
  date_hired: string;
  employment_type: EmploymentType;
  department: null | string;
}

interface Manager {
  id: number;
  name: string;
}

interface Employee {
  id: number;
  full_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string | null;
  gender: string;
  birthdate: string;
  civil_status: string;
  contact: Contact;
  address: Address;
  nationality: string;
  employment: Employment;
  manager?: Manager;
  profile_pic_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface ApiResponse {
  data: Employee[];
  meta: any;
  links: any;
}

// Main component to display employee list
const EmployeeList: React.FC = () => {
  // State to store employee data
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch employee data from the API proxy
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        // Use our internal API proxy instead of directly accessing the external API
        // This helps avoid CORS issues
        const response = await axios.get<ApiResponse>('/api/employees');
        setEmployees(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employee data. Please try again later.');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Loading state
  if (loading) {
    return <div className="p-4 text-center">Loading employee data...</div>;
  }

  // Error state
  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employees List</h1>
      
      {/* Display total employees count */}
      <p className="mb-4">Total Employees: {employees.length}</p>
      
      {/* Employee table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Position</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Date Hired</th>
              <th className="px-4 py-2 text-left">Manager</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{employee.id}</td>
                <td className="px-4 py-2 font-medium">{employee.full_name}</td>
                <td className="px-4 py-2">{employee.employment.job_position.title}</td>
                <td className="px-4 py-2">{employee.contact.email}</td>
                <td className="px-4 py-2">{employee.contact.phone_number}</td>
                <td className="px-4 py-2">{new Date(employee.employment.date_hired).toLocaleDateString()}</td>
                <td className="px-4 py-2">{employee.manager ? employee.manager.name : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList; 