import { NextResponse } from 'next/server';

// API route to proxy requests to the external employee API
export async function GET() {
  try {
    // Make request to the external API
    const response = await fetch('http://127.0.0.1:8001/api/employees', {
      headers: {
        'Content-Type': 'application/json',
      },
      // Include credentials if needed (e.g., for authentication)
      // credentials: 'include',
    });

    // Check if the request was successful
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch employee data' },
        { status: response.status }
      );
    }

    // Parse and return the response data
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 