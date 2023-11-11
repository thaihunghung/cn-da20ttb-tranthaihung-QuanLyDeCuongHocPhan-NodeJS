// Assume this script runs on the client side (browser)

// Function to handle login
async function handleLogin(username, password) {
    try {
      // Send login request to server
      const response = await axios.post('/login', { username, password });
  
      // Extract token and user data from the response
      const { token, user } = response.data;
  
      // Save token to localStorage
      localStorage.setItem('token', token);
  
      // Set Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      console.log('Login successful:', user);
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  }
  
  // Example usage:
  const usernameInput = 'example_user';
  const passwordInput = 'example_password';
  
  handleLogin(usernameInput, passwordInput);
  