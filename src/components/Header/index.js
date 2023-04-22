import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {FiMenu} from 'react-icons/fi'
import {FaSearch} from 'react-icons/fa'
import {AiFillCloseCircle} from 'react-icons/ai'

import InstaShareContext from '../../context/instaShareContext'

import './index.css'

const tabsList = {
  home: 'HOME',
  profile: 'PROFILE',
  search: 'SEARCH',
  default: 'NONE',
}

class Header extends Component {
  state = {hideMenu: true}

  onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickMenu = () => {
    this.setState({hideMenu: false})
  }

  onClickClose = () => {
    this.setState({hideMenu: true})
  }

  render() {
    const {hideMenu} = this.state

    return (
      <InstaShareContext.Consumer>
        {value => {
          const {searchInput, onChangeSearchInput} = value
          const {activeTab, searchButtonCallback} = this.props
          let onClickSearchButton

          if (activeTab === tabsList.search) {
            onClickSearchButton = () => {
              if (searchInput !== '') {
                const {history} = this.props
                history.push(`/search-large?searchInput=${searchInput}`)
                searchButtonCallback(searchInput)
              }
            }
          } else {
            onClickSearchButton = () => {
              if (searchInput !== '') {
                const {history} = this.props
                history.push(`/search-large?searchInput=${searchInput}`)
              }
            }
          }

          return (
            <nav className="nav-container">
              <div className="nav-content">
                <div className="logo-container">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/drm4jcovm/image/upload/v1679896858/Group_l2nodk.png"
                      alt="website logo"
                      className="logo-image"
                    />
                  </Link>
                  <h1 className="logo-title">Insta share</h1>
                </div>
                <ul className="nav-unordered-list-container">
                  <li className="nav-search-container nav-list-item">
                    <input
                      type="search"
                      value={searchInput}
                      placeholder="Search Caption"
                      className="search-caption-input"
                      onChange={onChangeSearchInput}
                    />
                    <button
                      type="button"
                      className="search-button"
                      onClick={onClickSearchButton}
                      data-testid="searchIcon"
                    >
                      <FaSearch className="search-icon" />
                    </button>
                  </li>
                  <li className="nav-list-item">
                    <Link
                      to="/"
                      className={
                        activeTab === tabsList.home
                          ? 'header-link active'
                          : 'header-link'
                      }
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-list-item">
                    <Link
                      to="/my-profile"
                      className={
                        activeTab === tabsList.profile
                          ? 'header-link active'
                          : 'header-link'
                      }
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-list-item">
                    <button
                      type="button"
                      className="logout-button"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
                <button
                  type="button"
                  className="icon-button"
                  onClick={this.onClickMenu}
                >
                  <FiMenu className="menu-icon" />
                </button>
              </div>
              {!hideMenu && (
                <ul className="sm-nav-unordered-list-container">
                  <li className="sm-nav-list-item">
                    <Link
                      to="/"
                      className={
                        activeTab === tabsList.home
                          ? 'header-link active'
                          : 'header-link'
                      }
                    >
                      Home
                    </Link>
                  </li>
                  <li className="sm-nav-list-item">
                    <Link
                      to="/search-small"
                      className={
                        activeTab === tabsList.search
                          ? 'header-link active'
                          : 'header-link'
                      }
                    >
                      Search
                    </Link>
                  </li>
                  <li className="sm-nav-list-item">
                    <Link
                      to="/my-profile"
                      className={
                        activeTab === tabsList.profile
                          ? 'header-link active'
                          : 'header-link'
                      }
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="sm-nav-list-item">
                    <button
                      type="button"
                      className="sm-logout-button"
                      onClick={this.onClickLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="close-icon-container">
                    <button
                      type="button"
                      className="icon-button"
                      onClick={this.onClickClose}
                    >
                      <AiFillCloseCircle className="close-icon" />
                    </button>
                  </li>
                </ul>
              )}
            </nav>
          )
        }}
      </InstaShareContext.Consumer>
    )
  }
}

export default withRouter(Header)
