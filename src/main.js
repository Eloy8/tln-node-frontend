import React from 'react'
import UserService from './services/UserService'

class Main extends React.Component {
  state = {
    count: this.props.count || 0,
    user: null,
    token: null,
    profile: null
  }

  updateCount = increment => {
    const { count } = this.state

    if (increment) {
      this.setState({
        count: count + 1
      })
    } else {
      this.setState({
        count: count - 1
      })
    }
  }

  login = async () => {
    try {
      return await UserService.login()
      .then((response) => {
        this.setState({
          token: response.token,
          user: response.user
        })
        sessionStorage.setItem('token', response.token)     
      })
    } catch (e) {
      console.log(e)
    }
  }

  logout = async () => {
    const { token } = this.state
    try {
      return await UserService.logout(token)
      .then(() => {
        this.setState({
          token: null,
          user: null
        })
        sessionStorage.removeItem('token')     
      })
    } catch (e) {
      console.log(e)
    }
  }

  checkLoggedIn = () => {
    console.log('Logged in?', sessionStorage.getItem('token'))
  }

  fetchProfile = async () => {
    const { token } = this.state
    try {
    return await UserService.fetchProfile(token)
      .then((response) => {
        console.log('Fetch profile', response)
        this.setState({
          profile: response
        })
      })
   } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { token, user, count, profile } = this.state

    if (token) {
      return(
        <>
          <h1>You are logged in now! :D</h1>
          <button onClick={profile ? () => this.setState({profile: null}) : () => this.fetchProfile()}>Check your profile out!</button>
          <button onClick={() => this.logout()}>Logout</button>
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
        <button onClick={() => this.login()}>Login!</button>
        <button onClick={() => this.checkLoggedIn()}>Check if logged in!</button>
        {token && <p>{token} test {user.name}</p>}
        <p>The current count is {count}</p>
        <button onClick={() => this.updateCount(true)}>Increment</button>
        <button onClick={() => this.updateCount(false)}>Decrement</button>
      </div>
    )
  }
}

export default Main