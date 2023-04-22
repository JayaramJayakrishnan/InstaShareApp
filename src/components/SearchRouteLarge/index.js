import {Component} from 'react'
import Cookie from 'js-cookie'

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

class SearchRouteLarge extends Component {
  state = {
    searchResults: [],
    apiCallStatus: apiCallStatusList.initial,
  }

  componentDidMount() {
    const {location} = this.props
    const {search} = location
    const searchInput = search.split('=')[1]
    this.getSearchResults(searchInput)
  }

  getSearchResults = async searchInput => {
    this.setState({apiCallStatus: apiCallStatusList.inProgress})
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
        return null
    }
  }

  render() {
    return (
      <div className="search-large-bg">
        <Header
          searchButtonCallback={this.getSearchResults}
          activeTab="SEARCH"
        />
        <div className="search-large-content">{this.switchViews()}</div>
      </div>
    )
  }
}

export default SearchRouteLarge
