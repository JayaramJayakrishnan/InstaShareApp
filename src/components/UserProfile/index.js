import {Component} from 'react'
import Cookie from 'js-cookie'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import ProfileData from '../ProfileData'
import ProfileStory from '../ProfileStory'
import ProfilePost from '../ProfilePost'

import './index.css'

const apiCallStatusList = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {profileDetails: {}, apiCallStatus: apiCallStatusList.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiCallStatus: apiCallStatusList.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        profileData: {
          followersCount: data.user_details.followers_count,
          followingCount: data.user_details.following_count,
          id: data.user_details.id,
          postsCount: data.user_details.posts_count,
          profilePic: data.user_details.profile_pic,
          userBio: data.user_details.user_bio,
          userId: data.user_details.user_id,
          username: data.user_details.user_name,
        },
        posts: data.user_details.posts,
        stories: data.user_details.stories,
      }
      this.setState({
        profileDetails: updatedData,
        apiCallStatus: apiCallStatusList.success,
      })
    } else {
      this.setState({apiCallStatus: apiCallStatusList.failure})
    }
  }

  renderUserStories = () => {
    const {profileDetails} = this.state
    const {stories} = profileDetails

    return (
      <ul className="user-profile-stories-container">
        {stories.map(item => (
          <ProfileStory
            storyDetails={item}
            key={item.id}
            storyAltValue="user story"
          />
        ))}
      </ul>
    )
  }

  noPostView = () => (
    <div className="no-post-view-container">
      <div className="no-post-icon-container">
        <BiCamera className="no-post-icon" />
      </div>
      <h1 className="no-post-view-text">No Posts Yet</h1>
    </div>
  )

  renderPosts = () => {
    const {profileDetails} = this.state
    const {posts} = profileDetails

    return (
      <div className="user-profile-posts-container">
        <div className="user-profile-post-header-container">
          <BsGrid3X3 className="user-profile-post-icon" />
          <h1 className="user-profile-post-heading">Posts</h1>
        </div>
        {posts.length === 0 ? (
          this.noPostView()
        ) : (
          <ul className="user-profile-posts-ul-container">
            {posts.map(item => (
              <ProfilePost
                postDetails={item}
                key={item.id}
                postAltValue="user post"
              />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderProfileData = () => {
    const {profileDetails} = this.state
    const {profileData} = profileDetails

    return (
      <>
        <ProfileData
          profileData={profileData}
          ProfilePicAltValue="user profile"
        />
        {this.renderUserStories()}
        <hr className="user-profile-hr" />
        {this.renderPosts()}
      </>
    )
  }

  switchViews = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case apiCallStatusList.inProgress:
        return <LoadingView />
      case apiCallStatusList.success:
        return this.renderProfileData()
      case apiCallStatusList.failure:
        return <FailureView retryFunction={this.getProfileDetails} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="user-profile-bg">
        <Header />
        {this.switchViews()}
      </div>
    )
  }
}

export default UserProfile
