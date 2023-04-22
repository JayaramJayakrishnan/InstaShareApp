import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitUserData = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userData = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookie.set('jwt_token', jwtToken, {expires: 30})

      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errMsg: data.error_msg})
    }
  }

  render() {
    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, errMsg} = this.state

    return (
      <div className="login-bg-container">
        <div className="login-content">
          <img
            src="https://res.cloudinary.com/drm4jcovm/image/upload/v1679896845/OBJECTS_dvwdi5.png"
            alt="website login"
            className="login-image"
          />
          <form
            className="login-form-container"
            onSubmit={this.onSubmitUserData}
          >
            <img
              src="https://res.cloudinary.com/drm4jcovm/image/upload/v1679896858/Group_l2nodk.png"
              alt="website logo"
              className="login-website-logo"
            />
            <h1 className="login-website-heading">Insta Share</h1>
            <div className="login-input-container">
              <label htmlFor="username" className="login-label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                value={username}
                className="login-input"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="login-input-container">
              <label htmlFor="password" className="login-label">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                className="login-input"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
              />
              {errMsg.length !== 0 && (
                <p className="login-error-message">{errMsg}</p>
              )}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
