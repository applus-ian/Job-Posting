import { NextResponse } from 'next/server';
import axios from 'axios';

// Define interface for employee data structure
interface EmployeeContact {
  email: string;
  phone_number: string;
  emergency_contact1: string;
  emergency_contact2: string;
}

interface Employee {
  id: number;
  full_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  contact: EmployeeContact;
  [key: string]: any; // Allow for other properties
}

// API route to handle unified login for both HR (8000) and Employee (8001) users
export async function POST(request: Request) {
  try {
    // Parse the request body to get login credentials
    const body = await request.json();
    const { email, password } = body;
    
    console.log(`Attempting unified auth for email: ${email}`);
    
    // Try to authenticate with HR server (8000) first
    try {
      console.log('Trying HR server (8000) authentication...');
      // Attempt HR authentication
      const hrResponse = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      
      // If successful, return HR user data with a type flag
      if (hrResponse.status === 200) {
        console.log('HR authentication successful!');
        const userData = hrResponse.data;
        return NextResponse.json({
          ...userData,
          userType: 'hr', // Add a flag to identify user type
          server: '8000'
        });
      }
    } catch (hrError) {
      // If HR authentication fails, try employee server next
      // We'll just continue to the next try block
      console.log('HR auth failed, trying employee auth');
      if (axios.isAxiosError(hrError)) {
        console.error('HR auth error details:', {
          status: hrError.response?.status,
          message: hrError.message,
          data: hrError.response?.data
        });
      }
    }
    
    // Try to authenticate with Employee server (8001)
    try {
      console.log('Trying Employee server (8001) authentication...');
      
      // Direct authentication with 8001 server using login endpoint
      const employeeAuthResponse = await axios.post('http://127.0.0.1:8001/api/auth/login', {
        email,
        password
      });
      
      console.log('Employee server response:', employeeAuthResponse.data);
      
      // Check if the response has the expected success format
      if (employeeAuthResponse.data && employeeAuthResponse.data.success) {
        console.log('Employee authentication successful via login endpoint!');
        const responseData = employeeAuthResponse.data.data;
        
        // Extract all employee data including department
        const employeeData = responseData.user.employee;
        
        // Log the complete employee data to verify department is present
        console.log('Employee data from response:', employeeData);
        
        // Extract user data in the format shown in the screenshot
        return NextResponse.json({
          id: responseData.user.id,
          email: responseData.user.email,
          name: employeeData?.full_name || responseData.user.email.split('@')[0],
          full_name: employeeData?.full_name,
          token: responseData.token,
          token_type: responseData.token_type,
          userType: 'employee',
          server: '8001',
          employee: {
            ...employeeData,
            // Ensure department is explicitly included
            department: employeeData?.department || "Not specified"
          }
        });
      }
    } catch (directAuthError) {
      console.log('Direct employee auth failed, trying employee data lookup method');
      if (axios.isAxiosError(directAuthError)) {
        console.error('Direct auth error details:', {
          status: directAuthError.response?.status,
          message: directAuthError.message,
          data: directAuthError.response?.data
        });
      }
      
      // Fall back to the original method of looking up employees
      try {
        // Fetch all employees from 8001 server
        const employeesResponse = await axios.get('http://127.0.0.1:8001/api/employees');
        
        if (employeesResponse.status === 200) {
          console.log('Got employee list from 8001 server');
          const employees = employeesResponse.data.data as Employee[];
          
          // Find the employee with matching email
          const employee = employees.find((emp: Employee) => 
            emp.contact && emp.contact.email && 
            emp.contact.email.toLowerCase() === email.toLowerCase()
          );
          
          // If employee found and we're using a test/hardcoded password for this server
          // Note: In a real app, you would never do this. This is just for demo purposes.
          if (employee && password === 'StrongPassword123!') {
            console.log('Employee authentication successful!', employee.id);
            return NextResponse.json({
              id: employee.id,
              full_name: employee.full_name,
              email: employee.contact.email,
              name: employee.full_name,
              token: 'employee-token-' + employee.id, // Generate a mock token
              userType: 'employee', // Add a flag to identify user type
              server: '8001',
              employee: employee
            });
          } else {
            console.log('Employee found but password mismatch or employee not found');
          }
        }
        
        // Employee not found or password doesn't match
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      } catch (employeeLookupError) {
        // Both authentication attempts failed
        console.error('Employee auth failed:');
        if (axios.isAxiosError(employeeLookupError)) {
          console.error('Employee auth error details:', {
            status: employeeLookupError.response?.status,
            message: employeeLookupError.message,
            data: employeeLookupError.response?.data
          });
        } else {
          console.error(employeeLookupError);
        }
        
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }
    }
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 