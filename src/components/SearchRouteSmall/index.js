import {Component} from 'react'
import Cookie from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

import Header from '../Header'
import LoadingView from '../LoadingView'
import SearchResults from '../SearchResults'
import SearchFailureView from '../SearchFailureView'

import './index.css'

const apiCallStatusList = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchRouteSmall extends Component {
  state = {
    searchInput: '',
    searchResults: [],
    apiCallStatus: apiCallStatusList.initial,
  }

  getSearchResults = async () => {
    this.setState({apiCallStatus: apiCallStatusList.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.posts.map(item => ({
        comments: item.comments.map(comData => ({
          comment: comData.comment,
          userId: comData.user_id,
          username: comData.user_name,
        })),
        createdAt: item.created_at,
        likesCount: item.likes_count,
        postDetails: {
          caption: item.post_details.caption,
          imageUrl: item.post_details.image_url,
        },
        postId: item.post_id,
        profilePic: item.profile_pic,
        userId: item.user_id,
        username: item.user_name,
      }))
      this.setState({
        searchResults: updatedData,
        apiCallStatus: apiCallStatusList.success,
      })
    } else {
      this.setState({apiCallStatus: apiCallStatusList.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderInitialView = () => (
    <div className="initial-view-container">
      <img
        src="https://res.cloudinary.com/drm4jcovm/image/upload/v1681884375/Frame_1473_d6fpfz.png"
        alt="initial search view"
        className="initial-view-image"
      />
      <p className="initial-view-text">Search Results will be appearing here</p>
    </div>
  )

  switchViews = () => {
    const {apiCallStatus, searchResults} = this.state

    switch (apiCallStatus) {
      case apiCallStatusList.inProgress:
        return <LoadingView />
      case apiCallStatusList.success:
        return <SearchResults data={searchResults} />
      case apiCallStatusList.failure:
        return <SearchFailureView retrySearch={this.getSearchResults} />
      default:
        return this.renderInitialView()
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="sm-search-bg">
        <Header activeTab="SEARCH" />
        <div className="sm-search-container">
          <input
            type="search"
            value={searchInput}
            placeholder="Search Caption"
            className="sm-search-input"
            onChange={this.onChangeSearchInput}
          />
          <button
            type="button"
            className="sm-search-button"
            onClick={this.getSearchResults}
            data-testid="searchIcon"
          >
            <FaSearch className="sm-search-icon" />
          </button>
        </div>
        {this.switchViews()}
      </div>
    )
  }
}

export default SearchRouteSmall
