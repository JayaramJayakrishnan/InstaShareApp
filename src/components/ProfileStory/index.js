import './index.css'

const ProfileStory = props => {
  const {storyDetails, storyAltValue} = props
  const {image} = storyDetails

  return (
    <li className="profile-story-container">
      <img src={image} alt={storyAltValue} className="profile-story-pic" />
    </li>
  )
}

export default ProfileStory
