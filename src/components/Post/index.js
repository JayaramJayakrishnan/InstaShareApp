import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import './index.css'

class Post extends Component {
  state = {likeStatus: false, likesCount: ''}

  componentDidMount() {
    const {postData} = this.props
    const {likesCount} = postData
    this.setState({likesCount})
  }

  onClickLikeButton = () => {
    this.setState(prevState => {
      if (prevState.likeStatus === true) {
        return {
          likeStatus: !prevState.likeStatus,
          likesCount: prevState.likesCount - 1,
        }
      }
      return {
        likeStatus: !prevState.likeStatus,
        likesCount: prevState.likesCount + 1,
      }
    }, this.postLikeStatus)
  }

  postLikeStatus = async () => {
    const {likeStatus} = this.state
    const {postData} = this.props
    const {postId} = postData
    const jwtToken = Cookies.get('jwt_token')
    const requestBody = {
      like_status: likeStatus,
    }
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(requestBody),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {likesCount} = this.state
    const {postData} = this.props
    const {
      comments,
      createdAt,
      postDetails,
      profilePic,
      userId,
      username,
    } = postData

    const {caption, imageUrl} = postDetails

    const {likeStatus} = this.state

    return (
      <li className="post-container">
        <div className="post-username-container">
          <div className="post-profile-pic-container">
            <div className="post-profile-pic-bg">
              <img
                src={profilePic}
                alt="post author profile"
                className="post-profile-pic"
              />
            </div>
          </div>
          <Link to={`/users/${userId}`} className="post-username">
            {username}
          </Link>
        </div>
        <img src={imageUrl} alt="post" className="post-image" />
        <div className="post-details-container">
          <div className="post-icons-container">
            {likeStatus && (
              <button
                type="button"
                className="post-icon-button"
                onClick={this.onClickLikeButton}
                data-testid="unLikeIcon"
              >
                <FcLike className="post-icon" />
              </button>
            )}
            {!likeStatus && (
              <button
                type="button"
                className="post-icon-button"
                onClick={this.onClickLikeButton}
                data-testid="likeIcon"
              >
                <BsHeart className="post-icon" />
              </button>
            )}

            <button type="button" className="post-icon-button">
              <FaRegComment className="post-icon" />
            </button>
            <button type="button" className="post-icon-button">
              <BiShareAlt className="post-icon" />
            </button>
          </div>
          <p className="post-likes-count">{likesCount} likes</p>
          <p className="post-caption">{caption}</p>
          <ul className="post-comments-container">
            {comments.map(item => (
              <li key={item.userId}>
                <p className="post-comment">
                  <span className="post-comment-user">{item.username} </span>
                  {item.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="post-created-time">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default Post
