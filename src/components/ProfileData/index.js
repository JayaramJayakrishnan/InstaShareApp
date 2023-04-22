import './index.css'

const ProfileData = props => {
  const {profileData, ProfilePicAltValue} = props
  const {
    followersCount,
    followingCount,
    postsCount,
    profilePic,
    userBio,
    userId,
    username,
  } = profileData

  return (
    <div className="user-profile-details-container">
      <img
        src={profilePic}
        alt={ProfilePicAltValue}
        className="user-profile-pic"
      />
      <div className="sm-user-profile-details-container">
        <h1 className="user-profile-username">{username}</h1>
        <img
          src={profilePic}
          alt="user profile"
          className="sm-user-profile-pic"
        />
        <ul className="user-profile-counts-container">
          <li>
            <p className="user-profile-counts-text">
              <span className="user-profile-counts-num">{postsCount} </span>
              posts
            </p>
          </li>
          <li>
            <p className="user-profile-counts-text">
              <span className="user-profile-counts-num">{followersCount} </span>
              followers
            </p>
          </li>
          <li>
            <p className="user-profile-counts-text">
              <span className="user-profile-counts-num">{followingCount} </span>
              following
            </p>
          </li>
        </ul>
        <p className="user-profile-user-id">{userId}</p>
        <p className="user-profile-bio">{userBio}</p>
      </div>
    </div>
  )
}

export default ProfileData
