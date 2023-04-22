import './index.css'

const ProfilePost = props => {
  const {postDetails, postAltValue} = props
  const {image} = postDetails

  return (
    <li className="profile-post-list-item">
      <img src={image} alt={postAltValue} className="profile-post-image" />
    </li>
  )
}

export default ProfilePost
