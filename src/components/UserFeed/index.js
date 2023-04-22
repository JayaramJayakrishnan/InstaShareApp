import {Component} from 'react'
import Cookie from 'js-cookie'

import Post from '../Post'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import './index.css'

const apiCallStatusList = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserFeed extends Component {
  state = {postsList: [], apiCallStatus: apiCallStatusList.initial}

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({apiCallStatus: apiCallStatusList.inProgress})

    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
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
        postsList: updatedData,
        apiCallStatus: apiCallStatusList.success,
      })
    } else {
      this.setState({apiCallStatus: apiCallStatusList.failure})
    }
  }

  renderUserPosts = () => {
    const {postsList} = this.state

    return (
      <ul className="posts-unordered-list-container">
        {postsList.map(item => (
          <Post postData={item} key={item.postId} />
        ))}
      </ul>
    )
  }

  switchViews = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case apiCallStatusList.inProgress:
        return <LoadingView />
      case apiCallStatusList.success:
        return this.renderUserPosts()
      case apiCallStatusList.failure:
        return <FailureView retryFunction={this.getPosts} />
      default:
        return null
    }
  }

  render() {
    return <div className="user-feed">{this.switchViews()}</div>
  }
}

export default UserFeed
