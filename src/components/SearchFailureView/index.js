import InstaShareContext from '../../context/instaShareContext'

import './index.css'

const SearchFailureView = props => (
  <InstaShareContext.Consumer>
    {value => {
      const {searchInput} = value
      const {retrySearch} = props

      const onClickRetry = () => {
        retrySearch(searchInput)
      }

      return (
        <div className="search-failure-view-container">
          <img
            src="https://res.cloudinary.com/drm4jcovm/image/upload/v1681836904/Group_7522_v0b1nz.png"
            alt="failure view"
            className="search-failure-view-image"
          />
          <p className="search-failure-view-text">
            Something went wrong. Please try again
          </p>
          <button
            type="button"
            onClick={onClickRetry}
            className="search-failure-view-retry-button"
          >
            Try again
          </button>
        </div>
      )
    }}
  </InstaShareContext.Consumer>
)

export default SearchFailureView
