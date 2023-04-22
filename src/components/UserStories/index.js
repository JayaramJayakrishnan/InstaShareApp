import {Component} from 'react'
import Cookie from 'js-cookie'
import Slider from 'react-slick'

import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import './index.css'

const apiCallStatusList = {
  initial: 'INITIAL',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserStories extends Component {
  state = {userStories: [], apiCallStatus: apiCallStatusList.initial}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiCallStatus: apiCallStatusList.inProgress})
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.users_stories.map(item => ({
        userId: item.user_id,
        username: item.user_name,
        storyUrl: item.story_url,
      }))
      this.setState({
        userStories: updatedData,
        apiCallStatus: apiCallStatusList.success,
      })
    } else {
      this.setState({apiCallStatus: apiCallStatusList.failure})
    }
  }

  renderUserStories = () => {
    const {userStories} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    }

    return (
      <ul className="slick-container">
        <Slider {...settings}>
          {userStories.map(item => (
            <div className="slick-item" key={item.userId}>
              <img
                src={item.storyUrl}
                alt="user story"
                className="story-image"
              />
              <p className="story-user-name">{item.username}</p>
            </div>
          ))}
        </Slider>
      </ul>
    )
  }

  switchViews = () => {
    const {apiCallStatus} = this.state

    switch (apiCallStatus) {
      case apiCallStatusList.inProgress:
        return <LoadingView />
      case apiCallStatusList.success:
        return this.renderUserStories()
      case apiCallStatusList.failure:
        return <FailureView retryFunction={this.getUserStories} />
      default:
        return null
    }
  }

  render() {
    return <div className="main-container">{this.switchViews()}</div>
  }
}

export default UserStories
