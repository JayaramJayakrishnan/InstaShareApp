import './index.css'

const FailureView = props => {
  const {retryFunction} = props

  const onClickRetryButton = () => {
    retryFunction()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/drm4jcovm/image/upload/v1682143295/alert-triangle_ensikt.png"
        alt="failure view"
        className="alert-triangle-image"
      />
      <p className="failure-view-text">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="failure-view-retry-button"
        onClick={onClickRetryButton}
      >
        Try again
      </button>
    </div>
  )
}

export default FailureView
