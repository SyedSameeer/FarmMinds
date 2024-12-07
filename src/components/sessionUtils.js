import axios from 'axios';

// Fetch the current logged-in user
export const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/current-user', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Include token if stored
        },
      });
  
      if (!response.ok) {
        throw new Error('No user logged in or session expired.');
      }
  
      return await response.json();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  };
  

// Logout function
export async function handleLogout(navigate) {
    try {
        const response = await axios.post('http://localhost:8080/api/logout', {}, { withCredentials: true });
        if (response.status === 200) {
            alert('Logged out successfully');
            navigate('/signin'); // Redirect to sign-in page
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
}
