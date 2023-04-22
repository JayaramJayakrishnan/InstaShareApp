import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import InstaShareContext from './context/instaShareContext'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import SearchRouteLarge from './components/SearchRouteLarge'
import SearchRouteSmall from './components/SearchRouteSmall'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {searchInput: ''}

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {searchInput} = this.state

    return (
      <InstaShareContext.Provider
        value={{
          searchInput,
          onChangeSearchInput: this.onChangeSearchInput,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute
            exact
            path="/search-large"
            component={SearchRouteLarge}
          />
          <ProtectedRoute
            exact
            path="/search-small"
            component={SearchRouteSmall}
          />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </InstaShareContext.Provider>
    )
  }
}

export default App
