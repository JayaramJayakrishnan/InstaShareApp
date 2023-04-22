import './index.css'

const NotFound = props => {
  const onClickButton = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-bg">
      <img
        src="https://res.cloudinary.com/drm4jcovm/image/upload/v1680590454/Layer_2_pzwtch.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found
      </p>
      <p className="not-found-text">Please go back to the home page.</p>
      <button
        type="button"
        className="home-page-button"
        onClick={onClickButton}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound
