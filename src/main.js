import React, { useState } from 'react'
import UserService from './services/UserService'

const Main = ({ appCount }) => {
  const [count, setCount] = useState(appCount || 0);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  const updateCount = increment => setCount(increment ? count + 1 : count - 1)

  const login = async () => {
    try {
      return await UserService.login()
      .then((response) => {
          setToken(response.token)
          setUser(response.user)
          sessionStorage.setItem('token', response.token)     
        })
      } catch (e) {
      console.log(e)
    }
  }

  const logout = async () => {
    try {
      return await UserService.logout(token)
      .then(() => {
        setToken(null)
        setUser(null)
        sessionStorage.removeItem('token')     
      })
    } catch (e) {
      console.log(e)
    }
  }

  const checkLoggedIn = () => {
    console.log('Logged in?', sessionStorage.getItem('token'))
  }

  const fetchProfile = async () => {
    try {
    return await UserService.fetchProfile(token)
      .then((response) => {
        console.log('Fetch profile', response)
        setProfile(response)
      })
   } catch (e) {
      console.log(e)
    }
  }

  if (token) {
    return(
      <>
        <h1>You are logged in now! :D</h1>
        <button onClick={profile ? () => setProfile(null) : () => fetchProfile()}>Check your profile out!</button>
        <button onClick={() => logout()}>Logout</button>
        {profile && (
          <>
            <h1>Your profile</h1>
            <p>Name: {profile.name}</p>
            <p>Age: {profile.age}</p>
            <p>Email: {profile.email}</p>
            <p>Created at: {profile.createdAt}</p>
            <p>Updated at: {profile.updatedAt}</p>
            <p>ID: {profile._id}</p>
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <button onClick={() => login()}>Login!</button>
      <button onClick={() => checkLoggedIn()}>Check if logged in!</button>
      {token && <p>{token} test {user.name}</p>}
      <p>The current count is {count}</p>
      <button onClick={() => updateCount(true)}>Increment</button>
      <button onClick={() => updateCount(false)}>Decrement</button>
    </div>
  )
}

export default Main;
