require('regenerator-runtime/runtime')
class UserService {
  constructor() {
    this.baseUrl = 'http://localhost:3000'
  }

  // TO DO:
  // Completely logout (settings)
  //
  // CRUD USER
  // Create user
  // Update user
  // Delete user
  //
  // AVATAR
  // Avatar upload
  // Avatar view
  // Avatar delete

  login = async () => {
    return await fetch(`${this.baseUrl}/users/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": "test@test.com",
        "password": "test@test.com"
      })
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('Invalid service response');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    })
  }

  logout = async (token) => {
    return await fetch(`${this.baseUrl}/users/logout`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Invalid service response ${response.status}`)
      }
    })
  }

  fetchProfile = async (token) => {
    return await fetch(`${this.baseUrl}/users/me`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Invalid service response ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    })
  }
}

export default new UserService();
